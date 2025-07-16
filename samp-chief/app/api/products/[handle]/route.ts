import { client } from '../../../../src/lib/shopify';
import { NextResponse } from 'next/server';

const GET_PRODUCT = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            quantityAvailable
          }
        }
      }
    }
  }
`;

export async function GET(
  request: Request,
  { params }: { params: { handle: string } }
) {
  const { handle } = params;

  try {
    const response = await client.request(GET_PRODUCT, {
      variables: { handle }
    });
    
    if (!response.data.product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(response.data.product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}