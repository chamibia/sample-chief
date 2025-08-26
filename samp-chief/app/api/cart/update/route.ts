import { NextResponse } from "next/server";

const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const API_VERSION = "2025-01";

const UPDATE_CART_LINES = /* GraphQL */ `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
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

const ADD_CART_LINES = /* GraphQL */ `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
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
    const { cartId, action, lines } = await request.json();

    if (!cartId) {
      return NextResponse.json({ error: "Cart ID required" }, { status: 400 });
    }

    let mutation = "";
    let variables: any = { cartId };

    if (action === "update") {
      mutation = UPDATE_CART_LINES;
      variables.lines = lines;
    } else if (action === "add") {
      mutation = ADD_CART_LINES;
      variables.lines = lines.map((item: any) => ({
        quantity: item.quantity,
        merchandiseId: item.variantId,
      }));
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const response = await fetch(
      `https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
        },
        body: JSON.stringify({
          query: mutation,
          variables,
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

    const userErrors =
      json.data?.cartLinesUpdate?.userErrors ||
      json.data?.cartLinesAdd?.userErrors;
    if (userErrors?.length) {
      return NextResponse.json(
        {
          error: "Cart update failed",
          details: userErrors.map((e: any) => e.message).join(" | "),
        },
        { status: 400 }
      );
    }

    const cart =
      json.data?.cartLinesUpdate?.cart || json.data?.cartLinesAdd?.cart;
    if (!cart) {
      return NextResponse.json(
        { error: "Failed to update cart" },
        { status: 500 }
      );
    }

    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Cart update error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
