
import * as React from "react";
import { CartProvider } from "@/components/CartProvider";
import SpecialPageLayout from "../../src/components/layout/SpecialPageLayout";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  // If rendering the cart page, skip this layout
  // Next.js app directory will use the closest layout, so cart/layout.tsx will override this for /shop/cart
  return (
    <CartProvider>
      <SpecialPageLayout>{children}</SpecialPageLayout>
    </CartProvider>
  );
}
