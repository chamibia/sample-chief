import { Metadata, Viewport } from "next";
import "../styles/globals.css";
import Navbar from "../src/components/layout/Navbar";
import ScrollWrapper from "@/components/layout/ScrollWrapper";

export const metadata: Metadata = {
  title: "Sample Chief",
  description: "Sample Chief website",
  openGraph: {
    title: "Sample Chief",
    description:
      "A platform dedicated to unearthing African sounds in contemporary music",
    images: ["/assets/sample_chief.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head />
      <body className="flex flex-col h-screen overflow-hidden">
        <Navbar />

        {/* scrollable content area */}
        <ScrollWrapper>
          {children}
        </ScrollWrapper>
      </body>
    </html>
  );
}
