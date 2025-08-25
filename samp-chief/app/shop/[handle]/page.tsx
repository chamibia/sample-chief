import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ProductAddToCart from "./ProductAddToCart";

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

type PageProps = {
  params: Promise<{ handle: string }>;
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
      <div className="flex-1 w-full px-5 md:px-9 pt-20">
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
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gray-100 border border-gray-200 rounded-2xl flex items-center justify-center">
                  <span className="font-radikal font-light text-gray-500 text-lg">
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
                        />
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="font-radikal font-light leading-relaxed text-4xl md:text-5xl mb-6 tracking-wider text-gray-800">
                  {product.title}
                </h1>

                {hasVariants && (
                  <div className="mb-8">
                    <span className="font-radikal font-bold text-3xl text-gray-800">
                      ${variants[0].price.amount}{" "}
                      <span className="text-gray-500 text-lg">
                        {variants[0].price.currencyCode}
                      </span>
                    </span>
                  </div>
                )}
              </div>

              {product.description && (
                <div className="space-y-4">
                  <h3 className="font-radikal font-light text-xl text-gray-800">
                    Description
                  </h3>
                  <p className="font-radikal font-light leading-relaxed text-gray-600">
                    {product.description}
                  </p>
                </div>
              )}

              {hasVariants && variants.length > 1 && (
                <div className="space-y-4">
                  <h3 className="font-radikal font-light text-xl text-gray-800">
                    Options
                  </h3>
                  <div className="space-y-3">
                    {variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-white"
                      >
                        <span className="font-radikal font-light text-gray-800">
                          {variant.title}
                        </span>
                        <span className="font-radikal font-bold text-gray-800">
                          ${variant.price.amount} {variant.price.currencyCode}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart Component */}
              <ProductAddToCart product={product} variants={variants} />

              {/* Stock Info */}
              {hasVariants && variants[0].quantityAvailable !== undefined && (
                <div className="text-center">
                  <span className="font-radikal font-light text-sm text-gray-500">
                    {variants[0].quantityAvailable > 0
                      ? `${variants[0].quantityAvailable} in stock`
                      : "Out of stock"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
