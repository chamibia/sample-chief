import { cache } from 'react';

import { Product } from '@/types/shop';

// Shared GraphQL query for product data
export const GET_PRODUCT_QUERY = `
  query getProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
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

// Shared function to fetch product data. Wrapped in React's cache() so
// multiple calls for the same handle within one request (e.g. layout.tsx's
// generateMetadata and page.tsx both needing the same product) are deduped
// into a single network request instead of fetching twice.
export const getProduct = cache(async (handle: string): Promise<Product | null> => {
  try {
    const { GraphQLClient, gql } = await import("graphql-request");

    const client = new GraphQLClient(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`,
      {
        headers: {
          "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
        },
      }
    );

    const data: any = await client.request(gql`${GET_PRODUCT_QUERY}`, { handle });

    return data?.productByHandle || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
});
