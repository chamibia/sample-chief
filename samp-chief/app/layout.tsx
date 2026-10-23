// app/layout.tsx (Server Component)
import "../styles/globals.css";

import { Analytics } from '@vercel/analytics/react';
import { Metadata, Viewport } from "next";

import { CartProvider } from "@/components/CartProvider";
import CookieConsent from "@/components/CookieConsent";
import FooterVisibilityWrapper from "@/components/layout/FooterVisibilityWrapper";
import Navbar from "@/components/layout/Navbar";
import SubscribePopup from "@/components/SubscribePopup";

import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.samplechief.com/"),
  title: {
    default: "Sample Chief",
    template: "%s | Sample Chief",
  },
  description: "Global Music Culture Agency",
  icons: {
    icon: "/assets/logos/favicon-white.svg",
    shortcut: "/assets/logos/favicon-white.svg",
    apple: "/assets/logos/favicon-white.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Font preloads for LCP optimization */}
        <link
          rel="preload"
          href="/assets/fonts/AlteHaasGroteskRegular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/RuderPlakatLL-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased font-sans">
        {/* Cart context available everywhere */}
        <CartProvider>
          <ClientLayout>
            {/* `relative` scopes a containing block to just the nav (not the
                whole app, unlike an earlier attempt at this fix) — fixes the
                home page's `position: absolute` nav resolving its width
                against the viewport (can include the scrollbar track, and
                caused a visible shift versus every other page's `sticky`
                nav, which resolves against the document's actual rendered
                width) without affecting other absolutely-positioned
                elements elsewhere in the app, e.g. the home page's footer,
                which must stay anchored to the viewport to keep floating
                over the hero correctly. */}
            <div className="relative">
              <Navbar />
            </div>
            <main className="flex-1">{children}</main>
            {/* Hide Footer on mobile if on home page, show otherwise */}
            <FooterVisibilityWrapper />
          </ClientLayout>
        </CartProvider>
        
        <SubscribePopup />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}