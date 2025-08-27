import { NextResponse } from "next/server";

const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const API_VERSION = "2025-01";

const CREATE_CART = /* GraphQL */ `
  mutation CreateCart(
    $lines: [CartLineInput!]
    $buyerIdentity: CartBuyerIdentityInput
  ) {
    cartCreate(input: { lines: $lines, buyerIdentity: $buyerIdentity }) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
        lines(first: 250) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

export async function POST(request: Request) {
  try {
    const { items, buyerIdentity } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // Format items for Cart API
    const lines = items.map(
      (item: { variantId: string; quantity: number }) => ({
        quantity: item.quantity,
        merchandiseId: item.variantId,
      })
    );

    const response = await fetch(
      `https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
        },
        body: JSON.stringify({
          query: CREATE_CART,
          variables: {
            lines,
            buyerIdentity: buyerIdentity || undefined,
          },
        }),
      }
    );

    const json = await response.json();

    if (json.errors?.length) {
      return NextResponse.json(
        {
          error: "GraphQL errors",
          details: json.errors.map((e: any) => e.message).join(" | "),
        },
        { status: 400 }
      );
    }

    const userErrors = json.data?.cartCreate?.userErrors;
    if (userErrors?.length) {
      return NextResponse.json(
        {
          error: "Cart creation failed",
          details: userErrors.map((e: any) => e.message).join(" | "),
        },
        { status: 400 }
      );
    }

    const cart = json.data?.cartCreate?.cart;
    if (!cart) {
      return NextResponse.json(
        { error: "Failed to create cart" },
        { status: 500 }
      );
    }

    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Cart creation error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}


