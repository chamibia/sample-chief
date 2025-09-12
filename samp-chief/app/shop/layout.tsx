import { Metadata } from "next";
import * as React from "react";
import { CartProvider } from "@/components/CartProvider";
import SpecialPageLayout from "../../src/components/layout/SpecialPageLayout";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop exclusive Sample Chief merchandise and products.",
  openGraph: {
    title: "Sample Chief Shop",
    description: "Shop exclusive Sample Chief merchandise and products.",
    images: [
      {
        url: "/assets/logos/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sample Chief Shop",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sample Chief Shop",
    description: "Shop exclusive Sample Chief merchandise and products.",
    images: ["/assets/logos/og-image.png"],
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  // If rendering the cart page, skip this layout
  // Next.js app directory will use the closest layout, so cart/layout.tsx will override this for /shop/cart
  return (
    <CartProvider>
      <SpecialPageLayout>{children}</SpecialPageLayout>
    </CartProvider>
  );
}
