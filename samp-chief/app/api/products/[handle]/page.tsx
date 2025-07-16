// app/shop/[handle]/page.tsx
import Image from 'next/image';

interface ProductVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantityAvailable: number;
}

interface Product {
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
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
}

async function getProduct(handle: string): Promise<Product | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/products/${handle}`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      return null;
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductPage({ 
  params 
}: { 
  params: { handle: string } 
}) {
  const product = await getProduct(params.handle);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const mainImage = product.images.edges[0]?.node;
  const variants = product.variants.edges.map(edge => edge.node);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              {mainImage ? (
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <Image
                    src={mainImage.url}
                    alt={mainImage.altText || product.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
              
              {/* Additional Images */}
              {product.images.edges.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.edges.slice(1).map((image, index) => (
                    <div key={index} className="aspect-square relative overflow-hidden rounded-md">
                      <Image
                        src={image.node.url}
                        alt={image.node.altText || product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
                {product.description && (
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                )}
              </div>

              {/* Variants */}
              {variants.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Options:</h3>
                  <div className="space-y-3">
                    {variants.map((variant) => (
                      <div key={variant.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                        <div>
                          <span className="font-medium text-gray-900">{variant.title}</span>
                          <span className="text-sm text-gray-500 ml-2">
                            ({variant.quantityAvailable} available)
                          </span>
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          ${variant.price.amount} {variant.price.currencyCode}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}