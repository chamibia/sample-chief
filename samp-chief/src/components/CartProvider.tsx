"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { updateCartTotals, validateItemAvailability } from '@/lib/cartUtils';
import { Cart, CartItem } from '@/types/shop';

type Ctx = {
  cart: Cart;
  loading: boolean;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  goToCheckout: () => Promise<void>;
};

const CartContext = createContext<Ctx | null>(null);

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be used within <CartProvider>");
  return c;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Guards against the exact bug this was just fixed for: a nested
  // <CartProvider> (in some layout further down the tree) would otherwise
  // silently create a second, disconnected cart state — e.g. the nav bar's
  // badge reading one instance while "Add to Cart" updates another. If a
  // provider already exists above us, don't create a second one.
  const existing = useContext(CartContext);

  const [cart, setCart] = useState<Cart>({
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  });
  const [loading, setLoading] = useState(false);

  // Load the saved cart on mount so the nav bar's cart badge is accurate
  // on every page, not just while browsing /shop.
  useEffect(() => {
    if (existing) return;
    const savedCart = localStorage.getItem("sample-chief-cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Error parsing saved cart:", error);
        localStorage.removeItem("sample-chief-cart");
      }
    }
  }, [existing]);

  // Save cart to localStorage whenever it changes, debounced so a burst of
  // quantity changes (e.g. holding +/-) collapses into one write instead of
  // one synchronous JSON.stringify + localStorage.setItem per change.
  useEffect(() => {
    if (existing) return;
    const timeout = setTimeout(() => {
      localStorage.setItem("sample-chief-cart", JSON.stringify(cart));
    }, 300);
    return () => clearTimeout(timeout);
  }, [cart, existing]);

  // Already inside a provider — pass children through unchanged instead of
  // shadowing it with a second, disconnected cart.
  if (existing) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "<CartProvider> was mounted inside another <CartProvider>. The nested one is a no-op — remove it."
      );
    }
    return <>{children}</>;
  }

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        // Check if adding more would exceed available quantity
        const newQuantity = existingItem.quantity + 1;
        if (
          item.quantityAvailable !== undefined &&
          newQuantity > item.quantityAvailable
        ) {
          alert(`Sorry, only ${item.quantityAvailable} items available.`);
          return prevCart;
        }

        const updatedItems = prevCart.items.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        );

        return updateCartTotals(updatedItems);
      } else {
        // Validate item availability
        const validation = validateItemAvailability({ ...item, quantity: 1 });
        if (!validation.isValid) {
          alert(validation.message);
          return prevCart;
        }

        const newItem = { ...item, quantity: 1 };
        const updatedItems = [...prevCart.items, newItem];

        return updateCartTotals(updatedItems);
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item.id !== id);
      return updateCartTotals(updatedItems);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prevCart) => {
      const item = prevCart.items.find((item) => item.id === id);
      if (!item) return prevCart;

      // Check if new quantity exceeds available quantity
      if (
        item.quantityAvailable !== undefined &&
        quantity > item.quantityAvailable
      ) {
        alert(`Sorry, only ${item.quantityAvailable} items available.`);
        return prevCart;
      }

      const updatedItems = prevCart.items.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      );

      return {
        items: updatedItems,
        totalQuantity: updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        ),
        totalPrice: updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };
    });
  };

  const clearCart = () => {
    setCart({ items: [], totalQuantity: 0, totalPrice: 0 });
  };

  const goToCheckout = async () => {
    if (cart.items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending checkout request with items:", cart.items);

      const response = await fetch("/api/cart/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();
      console.log("Cart creation API response:", data);

      if (!response.ok) {
        throw new Error(
          data.error || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      if (data.cart?.checkoutUrl) {
        console.log("Redirecting to checkout URL:", data.cart.checkoutUrl);
        window.location.href = data.cart.checkoutUrl;
      } else {
        console.error("No checkout URL in response:", data);
        throw new Error("No checkout URL received from server");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert(
        `Failed to proceed to checkout: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        goToCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
