// app/layout.tsx (Server Component)
import { Metadata, Viewport } from "next";
import "../styles/globals.css";
import Navbar from "../src/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SubscribePopup from "@/components/SubscribePopup";
import ClientLayout from "./ClientLayout";

// ✅ add this
import { CartProvider } from "@/components/CartProvider";

export const metadata: Metadata = {
  /* ...unchanged... */
};
export const viewport: Viewport = {
  /* ...unchanged... */
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload AlteHaasGrotesk fonts */}
        <link
          rel="preload"
          href="/fonts/AlteHaasGroteskRegular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/AlteHaasGroteskBold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />

        {/* Preload RuderPlakatLL font */}
        <link
          rel="preload"
          href="/fonts/RuderPlakatLL-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />

        {/* Preload key Radikal fonts */}
        <link
          rel="preload"
          href="/app/fonts/RadikalTrial-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/app/fonts/RadikalTrial-Bold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/app/fonts/RadikalTrial-Light.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/app/fonts/RadikalTrial-Medium.otf"
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
            <Footer />
            <SubscribePopup />
          </ClientLayout>
        </CartProvider>
      </body>
    </html>
  );
}
