"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export default function ProductCard({ node }: { node: any }) {
  const img = node.images.edges[0]?.node;
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart } = useCart();

  const handleQuickAddToCart = async () => {
    if (!node.variants?.edges?.[0]?.node?.id) return;

    setAddingToCart(true);
    try {
      const variant = node.variants.edges[0].node;
      addToCart({
        id: variant.id,
        variantId: variant.id,
        title: node.title,
        price: parseFloat(variant.price.amount),
        currencyCode: variant.price.currencyCode,
        productHandle: node.handle,
        image: img?.url,
        quantityAvailable: variant.quantityAvailable,
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/shop/${node.handle}`} className="block w-full h-full">
          {img ? (
            <Image
              src={img.url}
              alt={img.altText || node.title}
              width={800}
              height={800}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-50 flex items-center justify-center">
              <div className="text-gray-400 text-sm">No Image</div>
            </div>
          )}
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-radikal font-medium text-sm text-gray-800 mb-2 line-clamp-2 group-hover:text-gray-600 transition-colors">
          {node.title}
        </h3>

        {/* Price */}
        {node.priceRange?.minVariantPrice && (
          <div className="flex items-center justify-between mb-3">
            <p className="font-radikal font-bold text-lg text-gray-800">
              ${node.priceRange.minVariantPrice.amount}
            </p>
          </div>
        )}

        {/* Buy Button */}
        <button
          onClick={handleQuickAddToCart}
          disabled={addingToCart || !node.variants?.edges?.[0]?.node?.id}
          className="text-gray-600 hover:text-gray-800 font-radikal font-medium text-sm transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {addingToCart ? "Adding..." : "Buy"}
        </button>
      </div>
    </div>
  );
}
