import { client } from "@/lib/shopify";
import { NextResponse } from "next/server";

const CREATE_CHECKOUT = /* GraphQL */ `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
        totalPriceV2 {
          amount
          currencyCode
        }
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // Format items for Shopify checkout
    const lineItems = items.map(
      (item: { variantId: string; quantity: number }) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      })
    );

    const response = await client.request(CREATE_CHECKOUT, {
      variables: {
        input: {
          lineItems,
        },
      },
    });

    const { checkoutCreate } = response.data;

    if (checkoutCreate.checkoutUserErrors.length > 0) {
      console.error("Checkout errors:", checkoutCreate.checkoutUserErrors);
      return NextResponse.json(
        {
          error: "Failed to create checkout",
          details: checkoutCreate.checkoutUserErrors,
        },
        { status: 400 }
      );
    }

    const checkout = checkoutCreate.checkout;

    return NextResponse.json({
      checkoutId: checkout.id,
      checkoutUrl: checkout.webUrl,
      totalPrice: checkout.totalPriceV2,
    });
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
