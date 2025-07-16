import Image from 'next/image';
import { notFound } from 'next/navigation';

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

async function getProduct(handle: string): Promise<Product | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/products/${handle}`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

interface PageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  // Await the params Promise
  const { handle } = await params;
  
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  // Safe access with fallbacks to prevent undefined errors
  const mainImage = product.images?.edges?.[0]?.node;
  const variants = product.variants?.edges?.map(edge => edge.node) || [];
  const hasImages = product.images?.edges && product.images.edges.length > 0;
  const hasVariants = variants.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 w-full px-5 md:px-9 text-gray-800 pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {hasImages && mainImage ? (
                <div className="aspect-square relative overflow-hidden rounded-2xl">
                  <Image
                    src={mainImage.url}
                    alt={mainImage.altText || product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gray-200 rounded-2xl flex items-center justify-center">
                  <span className="font-radikal font-light text-gray-500 text-lg">
                    No Image Available
                  </span>
                </div>
              )}

              {/* Additional Images */}
              {hasImages && product.images.edges.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.edges.slice(1, 5).map((edge, index) => (
                    <div key={index} className="aspect-square relative overflow-hidden rounded-lg">
                      <Image
                        src={edge.node.url}
                        alt={edge.node.altText || `${product.title} ${index + 2}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="font-radikal font-light leading-relaxed text-3xl md:text-4xl mb-4 tracking-wider text-gray-700">
                  {product.title}
                </h1>
                
                {hasVariants && (
                  <div className="mb-6">
                    <span className="font-radikal font-bold text-2xl text-gray-700">
                      ${variants[0].price.amount} {variants[0].price.currencyCode}
                    </span>
                  </div>
                )}
              </div>

              {product.description && (
                <div className="space-y-4">
                  <h3 className="font-radikal font-light text-xl text-gray-700">
                    Description
                  </h3>
                  <p className="font-radikal font-light leading-relaxed text-base text-gray-700">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Variants */}
              {hasVariants && variants.length > 1 && (
                <div className="space-y-4">
                  <h3 className="font-radikal font-light text-xl text-gray-700">
                    Options
                  </h3>
                  <div className="space-y-2">
                    {variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-[#2E8B57] transition-colors"
                      >
                        <span className="font-radikal font-light text-gray-700">
                          {variant.title}
                        </span>
                        <span className="font-radikal font-bold text-gray-700">
                          ${variant.price.amount} {variant.price.currencyCode}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <div className="pt-6">
                <button className="w-full bg-[#2E8B57] text-white px-8 py-4 rounded-2xl font-radikal font-light text-lg hover:bg-[#2E8B57]/90 transition-all duration-300 transform hover:scale-[1.02]">
                  Add to Cart
                </button>
              </div>

              {/* Stock Info */}
              {hasVariants && variants[0].quantityAvailable !== undefined && (
                <div className="text-center">
                  <span className="font-radikal font-light text-sm text-gray-600">
                    {variants[0].quantityAvailable > 0 
                      ? `${variants[0].quantityAvailable} in stock`
                      : 'Out of stock'
                    }
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom spacing for mobile */}
      <div className="pb-24 md:pb-16"
        style={{ paddingBottom: "calc(6rem + env(safe-area-inset-bottom))" }} />
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: product.title,
    description: product.description || `Shop ${product.title}`,
  };
}