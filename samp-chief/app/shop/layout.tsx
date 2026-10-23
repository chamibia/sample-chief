import { Metadata } from "next";
import * as React from "react";

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
  // Cart context comes from the root layout (app/layout.tsx), which wraps
  // the whole app including the Navbar — do not add another CartProvider
  // here. A second instance would give shop pages their own isolated cart
  // state, disconnected from the one the Navbar's cart badge reads from.
  return <SpecialPageLayout>{children}</SpecialPageLayout>;
}
