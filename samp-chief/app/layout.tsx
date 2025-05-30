import { Metadata, Viewport } from "next";
import "../styles/globals.css";
import Navbar from "../src/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SubscribePopup from "@/components/SubscribePopup";
import localFont from 'next/font/local'

export const metadata: Metadata = {
  metadataBase: new URL('https://samplechief.com'),
  title: {
    default: "Sample Chief",
    template: "%s | Sample Chief", 
  },
  description: "Sample Chief is a global community that celebrates African music culture",
  keywords: ["Music", "Culture", "African"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samplechief.com",
    siteName: "Sample Chief",
    title: "Sample Chief",
    description: "Sample Chief is a global community that celebrates African music culture",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Sample Chief",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sample Chief",
    description: "Sample Chief is a global community that celebrates African music culture.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

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
})

export const radikalRegular = localFont({
  src: [{ path: "./fonts/RadikalTrial-Regular.otf", weight: "200", style: "normal" }],
  variable: "--font-radikal-light",
  display: "swap",
})

export const radikalItalic = localFont({
  src: [{ path: "./fonts/RadikalTrial-BoldItalic.otf", weight: "200", style: "normal" }],
  variable: "--font-radikal-light",
  display: "swap",
});


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={radikalHeavy.variable}
    >
      <head />
      <body className={`antialiased ${radikalHeavy.className}`}>
        <div className="flex flex-col h-screen overflow-y-auto">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <SubscribePopup />
        </div>
      </body>
    </html>
  )
}
