// app/layout.tsx (Server Component)
import { Metadata, Viewport } from "next";
import "../styles/globals.css";

import Navbar from "../src/components/layout/Navbar";
import FooterVisibilityWrapper from "@/components/layout/FooterVisibilityWrapper";
import LazySubscribePopup from "@/components/LazySubscribePopup";
import ClientLayout from "./ClientLayout";

import { CartProvider } from "@/components/CartProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.samplechief.com/"),
  title: {
    default: "Sample Chief",
    template: "%s | Sample Chief",
  },
  description: "Sample Chief - Merchandise for the Movement",
  icons: {
    icon: "/assets/logos/favicon-white.svg",
    shortcut: "/assets/logos/favicon-white.svg",
    apple: "/assets/logos/favicon-white.svg",
  },
};
export const viewport: Viewport = {
  /* ...unchanged... */
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Use a client-side check for pathname to conditionally hide Footer on home page mobile
  // This must be a Client Component for usePathname, so wrap Footer in a client-only check
  return (
    <html lang="en">
      <head>
        {/* Preload AlteHaasGrotesk fonts */}
        <link
          rel="preload"
          href="/assets/fonts/AlteHaasGroteskRegular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/AlteHaasGroteskBold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />

        {/* Preload RuderPlakatLL font */}
        <link
          rel="preload"
          href="/assets/fonts/RuderPlakatLL-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased font-sans">
        {/* ✅ Cart context available everywhere */}
        <CartProvider>
          <ClientLayout>
            <Navbar />
            <main className="flex-1">{children}</main>
            {/* Hide Footer on mobile if on home page, show otherwise */}
            <FooterVisibilityWrapper />
            <LazySubscribePopup />
          </ClientLayout>
        </CartProvider>
      </body>
    </html>
  );
}

