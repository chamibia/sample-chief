"use client";

import React from "react";
import { useCart } from "@/components/CartProvider";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Full viewport background for cart page
const CartBg = React.memo(function CartBg() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[-1] bg-[#202020] w-screen h-screen"
      style={{ minHeight: '100dvh', minWidth: '100vw' }}
    />
  );
});

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, goToCheckout, loading } = useCart();

  // Memoize cart items for performance
  const memoizedCartItems = React.useMemo(() => (
    cart.items.map((item) => (
      <div
        key={item.id}
        className="bg-black/20 rounded-2xl p-6 border border-gray-800/50"
      >
        <div className="flex items-center space-x-4">
          {/* Product Image */}
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
                No Image
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-sans font-medium text-lg text-white mb-2">
              {item.title}
            </h3>
            <p className="font-sans font-bold text-xl text-white">
              <span className="currency-symbol">$</span>
              {item.price} {item.currencyCode}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 border border-gray-600 rounded flex items-center justify-center hover:border-gray-500 transition-colors bg-black/20"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="font-sans font-light text-lg w-8 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 border border-gray-600 rounded flex items-center justify-center hover:border-gray-500 transition-colors bg-black/20"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-400 hover:text-red-300 transition-colors p-2"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    ))
  ), [cart.items, removeFromCart, updateQuantity]);

  if (cart.items.length === 0) {
    return (
      <>
        <CartBg />
        <div className="min-h-screen text-white">
          <div className="flex-1 w-full px-5 md:px-9">
            <div className="mb-8">
              <Link
                href="/shop"
                className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Shop
              </Link>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="text-center py-20">
                <h1 className="font-ruder font-light text-4xl md:text-5xl mb-6 tracking-wider text-white">
                  Your Cart
                </h1>
                <p className="text-gray-400 mb-8">Your cart is empty</p>
                <Link
                  href="/shop"
                  className="bg-white text-[#202020] px-8 py-4 rounded-lg font-sans font-medium hover:bg-gray-100 transition-colors duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <CartBg />
      <div className="min-h-screen text-white">
        <div className="flex-1 w-full px-5 md:px-9">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <div className="mb-8">
              <Link
                href="/shop"
                className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Shop
              </Link>
            </div>
            <h1 className="font-ruder font-light text-4xl md:text-5xl mb-8 tracking-wider text-white">
              Your Cart
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {memoizedCartItems}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-black/20 rounded-2xl p-6 border border-gray-800/50 sticky top-24">
                  <h2 className="font-ruder font-light text-2xl mb-6 text-white">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span>Items ({cart.totalQuantity})</span>
                      <span>
                        <span className="currency-symbol">$</span>
                        {cart.totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex justify-between font-sans font-bold text-xl text-white">
                        <span>Total</span>
                        <span>
                          <span className="currency-symbol">$</span>
                          {cart.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={goToCheckout}
                    disabled={loading || cart.items.length === 0}
                    className="w-full bg-white text-[#202020] px-8 py-4 rounded-lg font-sans font-medium text-lg hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Processing..." : "Proceed to Checkout"}
                  </button>

                  <Link
                    href="/shop"
                    className="block w-full text-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-sans font-medium text-lg hover:bg-white hover:text-[#202020] transition-all duration-300 mt-4"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}