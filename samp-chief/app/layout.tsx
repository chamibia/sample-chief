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

        {/* Preload key Radikal fonts */}
        {/* <link
          rel="preload"
          href="/assets/fonts/RadikalTrial-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/RadikalTrial-Bold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/RadikalTrial-Light.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/RadikalTrial-Medium.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        /> */}
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