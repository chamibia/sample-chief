"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/components/CartProvider";
import { trackEvent } from "@/lib/analytics";
import { isOutOfStock } from "@/lib/cartUtils";
import type { Product, ProductVariant } from "@/types/shop";

type ProductAddToCartProps = {
  product: Product;
  selectedVariant: ProductVariant | null;
  mainImageUrl?: string;
};

export default function ProductAddToCart({
  product,
  selectedVariant,
  mainImageUrl,
}: ProductAddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useCart();

  const isSoldOut = !selectedVariant || isOutOfStock(selectedVariant.quantityAvailable);

  const handleAddToCart = async () => {
    if (!selectedVariant || isSoldOut || addingToCart) return;

    setAddingToCart(true);
    try {
      addToCart({
        id: selectedVariant.id,
        variantId: selectedVariant.id,
        title: product?.title || "",
        price: parseFloat(selectedVariant.price.amount),
        currencyCode: selectedVariant.price.currencyCode,
        productHandle: product?.handle || "",
        image: selectedVariant.image?.url || mainImageUrl,
        quantityAvailable: selectedVariant.quantityAvailable,
      });
      trackEvent("add_to_cart", {
        currency: selectedVariant.price.currencyCode,
        value: parseFloat(selectedVariant.price.amount) * quantity,
        item_id: selectedVariant.id,
        item_name: product?.title || "",
        quantity,
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
          disabled={isSoldOut || addingToCart}
          className="w-full bg-gray-800 text-white px-8 py-4 rounded-lg font-sans font-medium text-lg hover:bg-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>
            {addingToCart
              ? "Adding to Cart..."
              : isSoldOut
              ? "Sold Out"
              : "Add to Cart"}
          </span>
        </button>

        <Link
          href="/shop/cart"
          className="block w-full text-center bg-transparent border-2 border-gray-800 text-gray-800 px-8 py-4 rounded-lg font-sans font-medium text-lg hover:bg-gray-800 hover:text-white transition-all duration-300"
        >
          View Cart
        </Link>
      </div>

      {/* Stock Info (tied to the selected variant, not always the first one) */}
      {selectedVariant && selectedVariant.quantityAvailable !== undefined && (
        <div className="text-center">
          <span className="font-sans font-light text-base text-gray-500">
            {isSoldOut
              ? "Out of stock"
              : `${selectedVariant.quantityAvailable} in stock`}
          </span>
        </div>
      )}

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
