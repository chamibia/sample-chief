import { GraphQLClient, gql } from "graphql-request";
import ProductCard from "./productCard";

const shopify = new GraphQLClient(
  `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`,
  {
    headers: {
      "X-Shopify-Storefront-Access-Token":
        process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      "Content-Type": "application/json",
    },
    fetch: fetch as any,
  }
);

const GET_PRODUCTS = gql`
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
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
    }
  }
`;

export default async function ShopPage() {
  let edges: Array<{ node: any }> = [];
  try {
    const { products } = await shopify.request<{ products: any }>(
      GET_PRODUCTS,
      { first: 20 }
    );
    edges = products.edges;
  } catch (err: any) {
    console.error("ShopPage Shopify error:", err);
    return (
      <div className="min-h-screen text-gray-800">
        <div className="flex-1 w-full px-5 md:px-9 pt-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="font-ruder font-light leading-relaxed text-4xl md:text-5xl mb-6 tracking-wider text-[#202020]">
                Shop Our Collection
              </h1>
              <p className="font-sans font-light mb-8 leading-relaxed text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                Merchandise for the Movement. Enjoy our curated collections
              </p>
            </div>

            <div className="py-20 text-center">
              <p className="text-red-600 mb-4">Failed to load products.</p>
              <pre className="text-sm text-gray-500 bg-gray-100 p-4 rounded-lg max-w-2xl mx-auto overflow-auto">
                {err.message}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (edges.length === 0) {
    return (
      <div className="min-h-screen text-gray-800">
        <div className="flex-1 w-full px-5 md:px-9 pt-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="font-ruder font-light leading-relaxed text-4xl md:text-5xl mb-6 tracking-wider text-gray-800">
                Shop
              </h1>
              <p className="font-sans font-light mb-8 leading-relaxed text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                Merchandise for the Movement. Enjoy our curated collections
              </p>
            </div>

            <div className="py-20 text-center">
              <h3 className="text-2xl font-light text-gray-800">
                No products available
              </h3>
              <p className="mt-2 text-gray-600">
                Check back soon for new arrivals!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-800">
      <div className="flex-1 w-full px-5 md:px-9 pt-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="font-ruder font-light leading-relaxed text-5xl md:text-6xl mb-8 tracking-wider text-[#202020]">
              Shop
            </h1>
            <p className="font-sans font-light mb-12 leading-relaxed text-lg md:text-xl lg:text-2xl text-[#202020] max-w-3xl mx-auto">
              Merchandise for the Movement. Enjoy our curated collections
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 xl:gap-16 pb-24">
            {edges.map(({ node }) => (
              <ProductCard key={node.id} node={node} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
