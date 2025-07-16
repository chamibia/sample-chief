// app/api/products/[handle]/route.ts
import { client } from '@/lib/shopify';
import { NextResponse } from 'next/server';

type ProductVariant = {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  quantityAvailable: number;
};

type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  variants: { edges: Array<{ node: ProductVariant }> };
};

type ProductResponse = {
  productByHandle: Product | null;
};

const GET_PRODUCT = /* GraphQL */ `
  query getProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      images(first: 5) {
        edges { node { url altText } }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price { amount currencyCode }
            quantityAvailable
          }
        }
      }
    }
  }
`;

interface RouteParams {
  params: Promise<{ handle: string }> | { handle: string };
}

export async function GET(
  _req: Request,
  context: RouteParams
) {
  try {
    // Handle both Promise and non-Promise params for Next.js compatibility
    const params = await Promise.resolve(context.params);
    const { handle } = params;

    if (!handle || typeof handle !== 'string') {
      return NextResponse.json(
        { error: 'Invalid product handle' }, 
        { status: 400 }
      );
    }

    const response = await client.request<ProductResponse>(GET_PRODUCT, {
      variables: { handle }
    });

    // Check if response and data exist
    if (!response?.data?.productByHandle) {
      return NextResponse.json(
        { error: 'Product not found' }, 
        { status: 404 }
      );
    }

    const product = response.data.productByHandle;
    
    return NextResponse.json(product);

  } catch (error) {
    console.error('Shopify API error:', error);
    
    // Return a more specific error message based on the error type
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to fetch product', details: error.message }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
