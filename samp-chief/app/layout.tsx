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
        {/* Sets a denied-by-default consent state before any tracking script
            runs, so GA4 can load immediately and send anonymized pings for
            visitors who haven't accepted cookies yet (Advanced Consent Mode). */}
        <script
          id="ga-consent-default"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', { analytics_storage: 'denied' });
            `,
          }}
        />
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
            {/* Scopes a containing block to just the nav, so it doesn't
                also affect the home page footer's absolute positioning. */}
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