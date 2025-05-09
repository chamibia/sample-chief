import { Viewport } from "next";
import "../styles/globals.css";
import Navbar from "../src/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import localFont from 'next/font/local'

export const radikalHeavy = localFont({
  src: [{ path: "./fonts/RadikalTrial-Black.otf", weight: "400", style: "normal" }],
  variable: "--font-radikal-heavy",
  display: "swap",
});

export const radikalLight = localFont({
  src: [{ path: "./fonts/RadikalTrial-Light.otf", weight: "200", style: "normal" }],
  variable: "--font-radikal-light",
  display: "swap",
});

export const radikalMedium = localFont({
  src: [{ path: "./fonts/RadikalTrial-Medium.otf", weight: "200", style: "normal" }],
  variable: "--font-radikal-light",
  display: "swap",
});

export const radikalRegular = localFont({
  src: [{ path: "./fonts/RadikalTrial-Regular.otf", weight: "200", style: "normal" }],
  variable: "--font-radikal-light",
  display: "swap",
});


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 2,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={radikalHeavy.variable}
    >
      <head />
      <body className={`antialiased ${radikalHeavy.className}`}>
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