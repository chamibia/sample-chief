import { Metadata, Viewport } from 'next'
import "../styles/globals.css"
import Navbar from "../src/components/layout/Navbar"
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Sample Chief",
  description: "Sample Chief website",
  verification: {
    google: "YourVerificationCodeHere",
  },
  openGraph: {
    title: "Sample Chief",
    description: "A platform dedicated to unearthing African sounds in contemporary music",
    images: ["/assets/sample_chief.webp"], 
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
      </head>
      <body className="flex flex-col h-screen overflow-hidden">
        <Navbar/>
        <main className="flex-1 min-h-0 overflow-y-auto">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}