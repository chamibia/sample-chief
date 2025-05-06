import { Metadata, Viewport } from "next";
import "../styles/globals.css";
import Navbar from "../src/components/layout/Navbar";
import ScrollWrapper from "@/components/layout/ScrollWrapper";
import localFont from 'next/font/local'
import clsx from "clsx";


const radikal = localFont({
src: [
  {
  path: './fonts/RadikalTrial-Black.otf',
  weight: '400',
  style: 'normal'
  }
],
variable: '--font-myfont',
display: 'swap',
})

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
    <html
    lang="en"
    // merge the CSS‐variable class with any other html‐level classes
    className={clsx(radikal.variable, 'antialiased bg-gray-50')}
  >
    <head />
    <body
      // apply the actual font‐family plus your existing flex layout
      className={clsx(radikal.className, 'flex flex-col h-screen overflow-hidden')}
    >
      <Navbar />
      <ScrollWrapper>{children}</ScrollWrapper>
    </body>
  </html>
)
}
