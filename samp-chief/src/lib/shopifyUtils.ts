import { Product } from '@/types/shop';

// Shared GraphQL query for product data
export const GET_PRODUCT_QUERY = `
  query getProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      images(first: 10) {
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

// Shared function to fetch product data
export async function getProduct(handle: string): Promise<Product | null> {
  try {
    const { GraphQLClient, gql } = await import("graphql-request");
    
    const client = new GraphQLClient(process.env.SHOPIFY_STORE_DOMAIN!, {
      headers: {
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
    });

    const data: any = await client.request(GET_PRODUCT_QUERY, { handle });
    
    return data?.productByHandle || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}