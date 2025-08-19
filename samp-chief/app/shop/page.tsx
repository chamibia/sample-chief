import { GraphQLClient, gql } from 'graphql-request'
import ProductCard from './productCard'

const shopify = new GraphQLClient(
  `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`,
  {
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      'Content-Type': 'application/json',
    },
    fetch: fetch as any,
  }
)

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
            edges { node { url altText } }
          }
          priceRange { minVariantPrice { amount currencyCode } }
        }
      }
    }
  }
`

export default async function ShopPage() {
  let edges: Array<{ node: any }> = []
  try {
    const { products } = await shopify.request<{ products: any }>(GET_PRODUCTS, { first: 20 })
    edges = products.edges
  } catch (err: any) {
    console.error('ShopPage Shopify error:', err)
    return (
      <div className="py-20 text-center">
        <p className="text-red-600 mb-4">Failed to load products.</p>
        <pre className="text-sm text-gray-500">{err.message}</pre>
      </div>
    )
  }

  if (edges.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-2xl font-light">No products available</h3>
        <p className="mt-2 text-gray-600">Check back soon for new arrivals!</p>
      </div>
    )
  }
  return (
    <div className="min-h-screen flex flex-col pt-20 bg-white text-black">
      <div className="flex-1 w-full px-5 md:px-9">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-radikal font-light leading-relaxed text-4xl md:text-5xl mb-6 tracking-wider text-gray-700">
              Shop
            </h1>
            <p className="font-radikal font-light mb-8 leading-relaxed text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto">
              Discover our curated collection of merchandise that celebrate African sounds and stories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 pb-8">
            {edges.map(({ node }) => (
              <ProductCard key={node.id} node={node} />
            ))}
          </div>
        </div>
      </div>

      <div
        className="pb-24 md:pb-16"
        style={{ paddingBottom: 'calc(6rem + env(safe-area-inset-bottom))' }}
      />
    </div>
  )
}