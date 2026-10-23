import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProduct } from "@/lib/shopifyUtils";

import ProductDetailClient from "./ProductDetailClient";

type PageProps = {
  params: Promise<{ handle: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  const variants = product.variants?.edges?.map((edge) => edge.node) ?? [];

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

          <ProductDetailClient product={product} variants={variants} />
        </div>
      </div>
    </div>
  );
}
