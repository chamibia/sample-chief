import { NextResponse } from "next/server";

const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const API_VERSION = "2025-01"; // Using a stable API version

const CREATE_CART = /* GraphQL */ `
  mutation CreateCart(
    $lines: [CartLineInput!]
    $buyerIdentity: CartBuyerIdentityInput
  ) {
    cartCreate(input: { lines: $lines, buyerIdentity: $buyerIdentity }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

const TEST_QUERY = /* GraphQL */ `
  query {
    shop {
      name
      primaryDomain {
        url
      }
    }
  }
`;

export async function POST(request: Request) {
  try {
    // Check environment variables
    if (!SHOP_DOMAIN || !STOREFRONT_TOKEN) {
      console.error("Missing Shopify environment variables");
      return NextResponse.json(
        { error: "Shopify configuration error" },
        { status: 500 }
      );
    }

    console.log("Shopify config:", {
      domain: SHOP_DOMAIN,
      token: STOREFRONT_TOKEN.substring(0, 10) + "...",
      apiVersion: API_VERSION,
    });

    const { items } = await request.json();
    console.log("Checkout API called with items:", items);

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // Format items for Cart API - IMPORTANT: use merchandiseId (variant GID), not variantId
    const lines = items.map(
      (item: { variantId: string; quantity: number }) => ({
        quantity: item.quantity,
        merchandiseId: item.variantId, // This is the variant GID
      })
    );

    console.log("Formatted cart lines:", lines);

    // Create cart using Cart API
    try {
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
              buyerIdentity: undefined, // Optional: can add email later if needed
            },
          }),
        }
      );

      const json = await response.json();
      console.log("Shopify Cart API response:", JSON.stringify(json, null, 2));

      // Check for GraphQL errors
      if (json.errors?.length) {
        console.error("GraphQL errors:", json.errors);
        return NextResponse.json(
          {
            error: "GraphQL errors",
            details: json.errors.map((e: any) => e.message).join(" | "),
          },
          { status: 400 }
        );
      }

      // Check for user errors
      const userErrors = json.data?.cartCreate?.userErrors;
      if (userErrors?.length) {
        console.error("Cart user errors:", userErrors);
        return NextResponse.json(
          {
            error: "Cart creation failed",
            details: userErrors.map((e: any) => e.message).join(" | "),
          },
          { status: 400 }
        );
      }

      const cart = json.data?.cartCreate?.cart;
      console.log("Cart created:", cart);

      if (!cart || !cart.checkoutUrl) {
        console.error("No cart or checkoutUrl in response:", cart);
        return NextResponse.json(
          {
            error: "Failed to create cart - no checkout URL received",
            cart: cart,
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        cartId: cart.id,
        checkoutUrl: cart.checkoutUrl,
      });
    } catch (shopifyError) {
      console.error("Shopify API error details:", {
        message:
          shopifyError instanceof Error
            ? shopifyError.message
            : "Unknown error",
        stack: shopifyError instanceof Error ? shopifyError.stack : undefined,
        error: shopifyError,
      });

      return NextResponse.json(
        {
          error: "Shopify API error",
          details:
            shopifyError instanceof Error
              ? shopifyError.message
              : "Unknown Shopify error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Checkout API error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
