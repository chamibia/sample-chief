"use client";

import { CartProvider } from "@/components/CartProvider";

// Always provide cart context for Navbar, but only load heavy cart logic for shop pages
export default function LazyCartProvider({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}