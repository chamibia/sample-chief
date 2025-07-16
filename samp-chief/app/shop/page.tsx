import Image from 'next/image';
import Link from 'next/link';

interface Product {
  node: {
    id: string;
    title: string;
    handle: string;
    description: string;
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
  };
}

async function getProducts() {
  try {
    // Use absolute URL for server-side fetching
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/products`, {
      next: { revalidate: 60 }
    });
        
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
        
    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ShopPage() {
  const products: Product[] = await getProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 w-full px-5 md:px-9 text-gray-800 pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-radikal font-light leading-relaxed text-4xl md:text-5xl mb-6 tracking-wider text-gray-700">
              Shop
            </h1>
            <p className="font-radikal font-light mb-8 leading-relaxed text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto">
              Discover our curated collection of merchandise that celebrate African sounds and stories.
            </p>
          </div>

          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => {
                const { node } = product;
                const mainImage = node.images?.edges?.[0]?.node;
                             
                return (
                  <div key={node.id}>
                    <Link
                      href={`/shop/${node.handle}`}
                      className="group block rounded-2xl overflow-hidden bg-transparent"
                    >
                      <div className="bg-transparent border-0 cursor-pointer">
                        <div className="p-0">
                          <div className="aspect-square relative">
                            {mainImage ? (
                              <>
                                <Image
                                  src={mainImage.url}
                                  alt={mainImage.altText || node.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-neutral-700/30 group-hover:opacity-0 transition-opacity duration-500 z-10" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-20" />
                              </>
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-2xl">
                                <span className="font-radikal font-light text-gray-500">No Image</span>
                              </div>
                            )}

                            <div className="absolute top-4 left-4 z-30">
                              <h3 className="font-radikal font-bold text-white text-lg leading-tight">
                                {node.title}
                              </h3>
                            </div>

                            <div className="absolute bottom-4 left-4 right-4 z-30">
                              <div className="flex items-end justify-between">
                                <div>
                                  {node.description && (
                                    <p className="font-radikal font-light text-white text-sm mb-2 line-clamp-2">
                                      {node.description}
                                    </p>
                                  )}
                                  <span className="font-radikal font-bold text-white text-lg">
                                    ${node.priceRange.minVariantPrice.amount} {node.priceRange.minVariantPrice.currencyCode}
                                  </span>
                                </div>
                                <div className="bg-[#2E8B57] text-white px-3 py-1 rounded-lg font-radikal font-light text-sm hover:bg-[#2E8B57]/90 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                                  View Details
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {products.length === 0 && (
              <div className="text-center py-16">
                <h3 className="font-radikal font-light text-2xl text-gray-700 mb-4">
                  No products available
                </h3>
                <p className="font-radikal font-light text-base text-gray-700">
                  Check back soon for new arrivals
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed bottom spacing for mobile */}
      <div className="pb-24 md:pb-16"
        style={{ paddingBottom: "calc(6rem + env(safe-area-inset-bottom))" }} />
    </div>
  );
}