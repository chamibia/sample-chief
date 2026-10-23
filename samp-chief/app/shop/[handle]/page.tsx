import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProduct } from "@/lib/shopifyUtils";

import ProductAddToCart from "./ProductAddToCart";

type PageProps = {
  params: Promise<{ handle: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  const hasImages = product.images?.edges && product.images.edges.length > 0;
  const mainImage = hasImages ? product.images.edges[0].node : null;
  const hasVariants =
    product.variants?.edges && product.variants.edges.length > 0;
  const variants = hasVariants
    ? product.variants.edges.map((edge) => edge.node)
    : [];

  return (
    <div className="min-h-screen bg-white text-gray-800">
  <div className="flex-1 w-full px-5 md:px-9">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/shop"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Images */}
            <div className="space-y-6">
              {hasImages && mainImage ? (
                <div className="aspect-square relative overflow-hidden rounded-2xl bg-gray-100 border border-gray-200">
                  <Image
                    src={mainImage.url}
                    alt={mainImage.altText || product.title}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gray-100 border border-gray-200 rounded-2xl flex items-center justify-center">
                  <span className="font-sans font-light text-gray-500 text-lg">
                    No Image Available
                  </span>
                </div>
              )}

              {/* Thumbnail Images */}
              {hasImages &&
                product.images?.edges &&
                product.images.edges.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {product.images.edges.slice(1, 5).map((edge, index) => (
                      <div
                        key={index}
                        className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 border border-gray-200"
                      >
                        <Image
                          src={edge.node.url}
                          alt={edge.node.altText || product.title}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="font-ruder font-light leading-relaxed text-4xl md:text-5xl mb-6 tracking-wider text-gray-800">
                  {product.title}
                </h1>
              </div>

              {product.description && (
                <div className="space-y-4">
                  <h3 className="font-sans font-light text-xl text-gray-800">
                    Description
                  </h3>
                  <div
                    className="font-sans font-light leading-relaxed text-gray-600 [&>p]:mb-4 last:[&>p]:mb-0 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
                  />
                </div>
              )}

              {hasVariants && variants.length > 1 && (
                <div className="space-y-4">
                  <h3 className="font-sans font-light text-xl text-gray-800">
                    Options
                  </h3>
                </div>
              )}

              {/* Add to Cart Component (price + stock shown here, tied to the selected variant) */}
              <ProductAddToCart product={product} variants={variants} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
