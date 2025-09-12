"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";

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

type ProductAddToCartProps = {
  product: Product;
  variants: ProductVariant[];
};

export default function ProductAddToCart({
  product,
  variants,
}: ProductAddToCartProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    variants.length > 0 ? variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (!selectedVariant || addingToCart) return;

    setAddingToCart(true);
    try {
      const mainImage = product?.images?.edges?.[0]?.node;
      addToCart({
        id: selectedVariant.id,
        variantId: selectedVariant.id,
        title: product?.title || "",
        price: parseFloat(selectedVariant.price.amount),
        currencyCode: selectedVariant.price.currencyCode,
        productHandle: product?.handle || "",
        image: mainImage?.url,
        quantityAvailable: selectedVariant.quantityAvailable,
      });
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <>
      {/* Variant Selection */}
      {variants.length > 1 && (
        <div className="space-y-4">
          <div className="space-y-3">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`w-full flex items-center justify-between p-4 border rounded-lg transition-all duration-300 ${selectedVariant?.id === variant.id
                    ? "border-gray-800 bg-gray-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
              >
                <span className="font-sans font-light text-gray-800">
                  {variant.title}
                </span>
                <span className="font-sans font-bold text-gray-800">
                  <span className="currency-symbol">$</span>
                  {variant.price.amount} {variant.price.currencyCode}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="space-y-4">
        <h3 className="font-sans font-light text-xl text-gray-800">
          Quantity
        </h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors bg-white"
          >
            <Minus className="h-5 w-5" />
          </button>
          <span className="font-sans font-light text-xl w-16 text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors bg-white"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="space-y-4">
        <button
          onClick={handleAddToCart}
          disabled={!selectedVariant || addingToCart}
          className="w-full bg-gray-800 text-white px-8 py-4 rounded-lg font-sans font-medium text-lg hover:bg-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>{addingToCart ? "Adding to Cart..." : "Add to Cart"}</span>
        </button>

        <Link
          href="/shop/cart"
          className="block w-full text-center bg-transparent border-2 border-gray-800 text-gray-800 px-8 py-4 rounded-lg font-sans font-medium text-lg hover:bg-gray-800 hover:text-white transition-all duration-300"
        >
          View Cart
        </Link>
      </div>

      {/* Add to Cart Notification */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-white text-gray-800 p-4 rounded-lg shadow-lg z-50 border border-gray-200">
          <p className=" font-medium">
            Added {quantity} {quantity === 1 ? "item" : "items"} to cart!
          </p>
          <button
            onClick={() => setShowNotification(false)}
            className="mt-2 text-sm underline text-gray-600"
          >
            Dismiss
          </button>
        </div>
      )}
    </>
  );
}
