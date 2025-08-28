import { Metadata } from "next";

type ProductVariant = {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantityAvailable: number;
};

type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
};

type LayoutProps = {
  params: Promise<{ handle: string }>;
  children: React.ReactNode;
};

async function getProduct(handle: string): Promise<Product | null> {
  const { GraphQLClient, gql } = await import("graphql-request");

  const client = new GraphQLClient(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
    }
  );

  const GET_PRODUCT = gql`
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

  try {
    const response = (await client.request(GET_PRODUCT, { handle })) as {
      product: Product;
    };
    return response.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.title,
    description: product.description || `Shop ${product.title}`,
  };
}

export default function ProductLayout({ children }: LayoutProps) {
  return children;
}
