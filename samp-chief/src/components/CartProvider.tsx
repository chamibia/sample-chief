"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  id: string;
  variantId: string;
  title: string;
  price: number;
  currencyCode: string;
  productHandle: string;
  image?: string;
  quantity: number;
  quantityAvailable?: number;
};

type Cart = {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
};

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
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  });
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
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
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sample-chief-cart", JSON.stringify(cart));
  }, [cart]);

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
      } else {
        // Check if we can add even 1 item
        if (
          item.quantityAvailable !== undefined &&
          item.quantityAvailable <= 0
        ) {
          alert(`Sorry, this item is out of stock.`);
          return prevCart;
        }

        const newItem = { ...item, quantity: 1 };
        const updatedItems = [...prevCart.items, newItem];

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
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item.id !== id);
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

      const response = await fetch("/api/checkout", {
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
      console.log("Checkout API response:", data);

      if (!response.ok) {
        throw new Error(
          data.error || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      if (data.checkoutUrl) {
        console.log("Redirecting to checkout URL:", data.checkoutUrl);
        window.location.href = data.checkoutUrl;
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
