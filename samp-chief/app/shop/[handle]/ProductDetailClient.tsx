"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

import type { Product, ProductVariant } from "@/types/shop";

import ProductAddToCart from "./ProductAddToCart";

type ProductDetailClientProps = {
  product: Product;
  variants: ProductVariant[];
};

function variantMatchesSelection(
  variant: ProductVariant,
  selection: Record<string, string>
) {
  return (variant.selectedOptions || []).every(
    (opt) => selection[opt.name] === opt.value
  );
}

export default function ProductDetailClient({
  product,
  variants,
}: ProductDetailClientProps) {
  const options = product.options?.filter((o) => o.values.length > 1) || [];

  const [selection, setSelection] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    variants[0]?.selectedOptions?.forEach((opt) => {
      initial[opt.name] = opt.value;
    });
    return initial;
  });

  const selectedVariant = useMemo(() => {
    return (
      variants.find((v) => variantMatchesSelection(v, selection)) ||
      variants[0] ||
      null
    );
  }, [variants, selection]);

  // Lets the shopper click a thumbnail to preview it as the main photo.
  // Reset whenever the variant changes so picking a new color/size still
  // jumps back to that variant's own photo rather than keeping a stale
  // manually-picked thumbnail.
  const [manualImage, setManualImage] = useState<{ url: string; altText: string } | null>(null);
  const previousVariantId = useRef(selectedVariant?.id);
  if (selectedVariant?.id !== previousVariantId.current) {
    previousVariantId.current = selectedVariant?.id;
    if (manualImage) setManualImage(null);
  }

  // Color sold-out status is global (struck through only if every size of
  // that color is unavailable); every other option (e.g. Size) is sold out
  // only relative to the currently-selected color, so switching color
  // re-evaluates which sizes are greyed out for it.
  function isValueSoldOut(optionName: string, value: string) {
    const isColorOption = optionName.toLowerCase() === "color";
    return !variants.some((v) => {
      const matchesThisValue = v.selectedOptions?.find(
        (o) => o.name === optionName
      )?.value === value;
      if (!matchesThisValue) return false;
      if (isColorOption) return v.quantityAvailable > 0;
      const matchesOtherSelections = (v.selectedOptions || []).every(
        (o) => o.name === optionName || selection[o.name] === o.value
      );
      return matchesOtherSelections && v.quantityAvailable > 0;
    });
  }

  const hasImages = product.images?.edges && product.images.edges.length > 0;
  const fallbackImage = hasImages ? product.images.edges[0].node : null;
  const mainImage = manualImage || selectedVariant?.image || fallbackImage;

  function formatPrice(amount: string) {
    return Number(amount).toFixed(2);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      {/* Product Images */}
      <div className="space-y-6">
        {mainImage ? (
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

        {/* Thumbnail Images — click to preview as the main photo */}
        {hasImages &&
          product.images.edges.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.edges.map(({ node }, index) => {
                const isActive = mainImage?.url === node.url;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setManualImage(node)}
                    aria-label={`View ${node.altText || product.title} image ${index + 1}`}
                    aria-pressed={isActive}
                    className={`aspect-square relative overflow-hidden rounded-lg bg-gray-100 border-2 transition-colors ${
                      isActive
                        ? "border-gray-800"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={node.url}
                      alt={node.altText || product.title}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </button>
                );
              })}
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

        {/* Price (tied to the selected variant, not always the first one) */}
        {selectedVariant && (
          <div>
            <span className="font-sans font-bold text-3xl text-gray-800">
              <span className="currency-symbol">$</span>
              {formatPrice(selectedVariant.price.amount)}{' '}
              <span className="text-gray-500 text-lg">
                {selectedVariant.price.currencyCode}
              </span>
            </span>
          </div>
        )}

        {/* Variant Options: color swatches + size pills */}
        {options.map((option) => {
          const isColor = option.name.toLowerCase() === "color";
          const selectedValue = selection[option.name];

          return (
            <div key={option.name} className="space-y-3">
              <h3 className="font-sans font-light text-base text-gray-800">
                {option.name}
                {isColor && selectedValue ? `: ${selectedValue}` : ""}
              </h3>

              {isColor ? (
                <div className="flex items-center gap-3">
                  {option.values.map((value) => {
                    const isSelected = selectedValue === value;
                    const soldOut = isValueSoldOut(option.name, value);
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setSelection((prev) => ({ ...prev, [option.name]: value }))
                        }
                        aria-label={soldOut ? `${value} (sold out)` : value}
                        aria-pressed={isSelected}
                        title={soldOut ? `${value} (sold out)` : value}
                        className={`relative w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                          isSelected
                            ? "border-gray-800 ring-2 ring-offset-2 ring-gray-800"
                            : "border-gray-300 hover:border-gray-500"
                        }`}
                        style={{ backgroundColor: value }}
                      >
                        {soldOut && (
                          <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                            <span className="absolute top-1/2 left-1/2 w-[140%] h-[1.5px] bg-gray-500 -translate-x-1/2 -translate-y-1/2 rotate-45" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  {option.values.map((value) => {
                    const isSelected = selectedValue === value;
                    const soldOut = isValueSoldOut(option.name, value);
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setSelection((prev) => ({ ...prev, [option.name]: value }))
                        }
                        aria-pressed={isSelected}
                        title={soldOut ? `${value} (sold out)` : value}
                        className={`min-w-[48px] px-4 py-2 rounded-full border font-sans text-sm transition-all duration-200 ${
                          soldOut
                            ? "bg-gray-100 border-gray-200 text-gray-400"
                            : isSelected
                            ? "bg-gray-800 border-gray-800 text-white"
                            : "bg-white border-gray-300 text-gray-800 hover:border-gray-500"
                        }`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Add to Cart Component (quantity + cart button + stock) */}
        <ProductAddToCart
          product={product}
          selectedVariant={selectedVariant}
          mainImageUrl={mainImage?.url}
        />
      </div>
    </div>
  );
}
