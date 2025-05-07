import { Viewport } from "next";
import "../styles/globals.css";
import Navbar from "../src/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollWrapper from "@/components/layout/ScrollWrapper";
import localFont from 'next/font/local'
import clsx from "clsx";

export const radikalHeavy = localFont({
  src: [{ path: "./fonts/RadikalTrial-Black.otf", weight: "400", style: "normal" }],
  variable: "--font-radikal-heavy",
  display: "swap",
});

export const radikalLight = localFont({
  src: [{ path: "./fonts/RadikalTrial-light.otf", weight: "200", style: "normal" }],
  variable: "--font-radikal-light",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={radikalHeavy.variable}
    >
      <head />
      <body className={`antialiased bg-gray-50 ${radikalHeavy.className}`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow overflow-auto">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}