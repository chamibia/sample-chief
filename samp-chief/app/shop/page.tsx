// app/shop/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { GraphQLClient, gql } from 'graphql-request'

// 1) Set up your Shopify GraphQL client
const shopify = new GraphQLClient(
  `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`,
  {
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      'Content-Type': 'application/json',
    },
    // Use Next.js's built-in fetch so ISR works:
    fetch: fetch as any,
  }
)

// 2) Define your products query
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
              node { url altText }
            }
          }
          priceRange {
            minVariantPrice { amount currencyCode }
          }
        }
      }
    }
  }
`

// 3) Server component: fetch & render
export default async function ShopPage() {
  let edges: Array<{ node: any }> = []

  try {
    // ISR every 60s
    const { products } = await shopify.request<{ products: any }>(
      GET_PRODUCTS,
      { first: 20 }
    )
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
    <div className="min-h-screen flex flex-col pt-20">
      <div className="flex-1 w-full px-5 md:px-9 text-gray-800">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-light mb-4">Shop</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Discover our curated collection of merchandise that celebrate African sounds and stories.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {edges.map(({ node }) => {
              const img = node.images.edges[0]?.node
              return (
                <Link
                  key={node.id}
                  href={`/shop/${node.handle}`}
                  className="group block rounded-2xl overflow-hidden bg-transparent"
                >
                  <div className="relative aspect-square">
                    {img ? (
                      <>
                        <Image
                          src={img.url}
                          alt={img.altText || node.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-neutral-700/30 group-hover:opacity-0 transition-opacity duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}

                    {/* Title & Price */}
                    <div className="absolute inset-x-4 top-4 z-10">
                      <h3 className="text-white font-bold text-lg">{node.title}</h3>
                    </div>
                    <div className="absolute inset-x-4 bottom-4 z-10 flex items-end justify-between">
                      <span className="text-white font-bold text-lg">
                        ${node.priceRange.minVariantPrice.amount}{' '}
                        {node.priceRange.minVariantPrice.currencyCode}
                      </span>
                      <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-[#2E8B57] px-3 py-1 rounded-lg text-white text-sm">
                        View Details
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      {/* Safe‐area spacer */}
      <div
        className="pb-24 md:pb-16"
        style={{ paddingBottom: 'calc(6rem + env(safe-area-inset-bottom))' }}
      />
    </div>
  )
}

// 4) ISR metadata (optional)
export const revalidate = 60
