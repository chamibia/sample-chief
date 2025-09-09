import Image from "next/image";
import { Metadata } from "next";

import { CartProvider } from "../src/components/CartProvider";

import Navbar from "../src/components/layout/Navbar";
import Footer from "../src/components/layout/Footer";
import VideoHeroSection from "../src/components/VideoHeroSection";
import AboutLink from "../src/components/AboutLink";
import ClientAudioManager from "../src/components/ClientAudioManager";


export const metadata: Metadata = {
  title: "Sample Chief | African Music Culture",
  description:
    "Sample Chief is a global community celebrating African music culture through immersive experiences, events, and digital content.",
  keywords: [
    "Sample Chief",
    "African music",
    "music culture",
    "events",
    "global community",
  ],
  openGraph: {
    title: "Sample Chief | African Music Culture",
    description:
      "Sample Chief is a global community celebrating African music culture through immersive experiences, events, and digital content.",
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
    title: "Sample Chief | African Music Culture",
    description:
      "Sample Chief is a global community celebrating African music culture through immersive experiences, events, and digital content.",
    images: ["/assets/og-image.png"],
  },
};



export default function Home() {
  return (
    <CartProvider>
      <ClientAudioManager>
        <Navbar />
        <div className="relative w-full">
          <section className="relative w-full h-[100vh]">
            <VideoHeroSection />
          </section>

          <section className="w-full">
            <div className="grid grid-cols-3 auto-rows-[70vh]">
              <div className="relative bg-gray-100">
                <Image
                  src="/assets/home1.webp"
                  alt="Sample Chief girls"
                  fill
                  loading="lazy"
                  className="object-cover object-center"
                />
              </div>

              <div className="relative bg-gray-100">
                <Image
                  src="/assets/holts.webp"
                  alt="Holt Renfrew store front"
                  fill
                  loading="lazy"
                  className="object-cover object-center"
                />
              </div>

              <div className="relative bg-gray-100">
                <Image
                  src="/assets/home9.webp"
                  alt="Sample Chief talk"
                  fill
                  loading="lazy"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </section>

          <section className="w-full">
            <div className="grid grid-cols-2 h-[90vh]">
              <div className="relative bg-gray-100">
                <Image
                  src="/assets/home8.webp"
                  alt="Sami on decks"
                  fill
                  loading="lazy"
                  className="object-cover object-center"
                />
              </div>

              <div className="relative bg-gray-100">
                <video
                  src="/videos/sample2.MP4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          <section className="relative w-full">
            <div className="relative bg-gray-100 min-h-[100vh]">
              <img 
                src="/assets/home10.webp" 
                alt="Holts Renfrew event"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
                <div className="absolute left-0 right-0 p-8 md:p-16 flex flex-col" style={{ top: 'calc(60%)', transform: 'translateY(-50%)' }}>
                  <div className="max-w-4xl mx-auto text-center text-white flex flex-col items-center">
                    <div className="mb-8">
                      <h2 className="text-2xl font-regular text-white leading-tight max-w-2xl mx-auto">
                        Celebrating music culture through experiences that go beyond the algorithm
                      </h2>
                    </div>
                    <div className="flex justify-center">
                      <div className="relative w-28 h-28 md:w-32 md:h-32 cursor-pointer group">
                        <div 
                          className="absolute inset-0 animate-spin " 
                          style={{ animationDuration: '50s' }}
                        >
                          <svg className="w-full h-full" viewBox="0 0 120 120">
                            <defs>
                              <path
                                id="circle-path"
                                d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                              />
                            </defs>
                            <text className="fill-white font-bold tracking-wider" style={{ fontSize: '10px' }} textLength="280" lengthAdjust="spacing">
                              <textPath href="#circle-path" startOffset="0%">
                                LEARN MORE • LEARN MORE • LEARN MORE • 
                              </textPath>
                            </text>
                          </svg>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg z-20 transition-transform duration-300 ">
                          <AboutLink />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </ClientAudioManager>
    </CartProvider>
  );
}