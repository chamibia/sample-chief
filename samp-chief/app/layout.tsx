// app/layout.tsx (Server Component)
import { Metadata, Viewport } from "next";
import "../styles/globals.css";
import Navbar from "../src/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SubscribePopup from "@/components/SubscribePopup";
import ClientLayout from "./ClientLayout"; // New client component

export const metadata: Metadata = {
  title: "Sample Chief",
  description: "Sample Chief",
  keywords: ["music", "industry", "sample chief", "production"],
  authors: [{ name: "Sample Chief Team" }],
  creator: "Sample Chief",
  publisher: "Sample Chief",
  icons: {
    icon: "/assets/favicon.ico",
  },
  openGraph: {
    title: "Sample Chief",
    description: "Sample Chief",
    url: "https://samplechief.com",
    siteName: "Sample Chief",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sample Chief",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sample Chief",
    description: "Sample Chief",
    images: ["/assets/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // Add this for safe area support
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="antialiased font-sans">
        <ClientLayout>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <SubscribePopup />
        </ClientLayout>
      </body>
    </html>
  );
}