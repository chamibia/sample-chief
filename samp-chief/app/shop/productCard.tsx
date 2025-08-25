"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useCart } from "@/components/CartProvider";

export default function ProductCard({ node }: { node: any }) {
  const img = node.images?.edges?.[0]?.node;
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart } = useCart();

  const subtitle = useMemo(() => {
    if (!node?.description) return "";
    const first = node.description.split(/[\.\n]/)[0]?.trim();
    return first?.length ? first : "";
  }, [node?.description]);

  const handleQuickAddToCart = async () => {
    const variant = node.variants?.edges?.[0]?.node;
    if (!variant?.id) return;
    setAddingToCart(true);
    try {
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
    } catch (err) {
      console.error("Failed to add to cart:", err);
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="relative flex flex-col">
      {/* Image with hover zoom */}
      <div className="relative mb-6 group">
        <Link
          href={`/shop/${node.handle}`}
          className="block w-full"
          aria-label={node.title}
        >
          <div className="relative mx-auto w-[82%] aspect-square overflow-hidden">
            {img ? (
              <Image
                src={img.url}
                alt={img.altText || node.title}
                fill
                className="object-contain transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                sizes="(min-width:1280px) 18vw, (min-width:1024px) 24vw, (min-width:640px) 40vw, 80vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Info block BELOW image */}
      <div className="px-2">
        <h3 className="font-radikal text-[15px] leading-6 tracking-[0.06em] uppercase text-black">
          {node.title} <span className="align-middle">●</span>
        </h3>
        {subtitle ? (
          <p className="mt-1 italic text-[15px] leading-6 text-black/80">
            {subtitle}
          </p>
        ) : null}

        {/* Price + BUY button in same row */}
        {node.priceRange?.minVariantPrice && (
          <div className="mt-3 flex items-center justify-between">
            <p className="text-[15px] font-radikal text-[#202020]">
              ${node.priceRange.minVariantPrice.amount}
            </p>
            <button
              onClick={handleQuickAddToCart}
              disabled={addingToCart || !node.variants?.edges?.[0]?.node?.id}
              className="inline-flex items-center gap-1 rounded-none border border-black px-4 py-2 text-[12px] font-radikal uppercase tracking-[0.1em] text-black transition-colors
                         hover:bg-black hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {addingToCart ? "…" : "Buy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
