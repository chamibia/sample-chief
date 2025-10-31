import Image from "next/image";
import { Metadata } from "next";

import LazyVideoHero from "../src/components/LazyVideoHero";
import LazyClientAudioManager from "../src/components/LazyClientAudioManager";
import Link from "next/link";
import Footer from "../src/components/layout/Footer";


export const metadata: Metadata = {
  title: "Sample Chief | Global Music Culture Agency",
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
    title: "Sample Chief | Global Music Culture Agency",
    description:
      "Sample Chief is a global community celebrating African music culture through immersive experiences, events, and digital content.",
    url: "https://samplechief.com",
    siteName: "Sample Chief",
    images: [
      {
  url: "/assets/logos/og-image.png",
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
    title: "Sample Chief | Global Music Culture Agency",
    description:
      "Sample Chief is a global community celebrating African music culture through immersive experiences, events, and digital content.",
  images: ["/assets/logos/og-image.png"],
  },
};



export default function Home() {
  return (
  <LazyClientAudioManager>
      {/* Mobile flex column layout for sticky footer */}
      <div className="flex flex-col min-h-screen sm:block w-full">
        <section className="relative w-full h-[100vh]">
          <LazyVideoHero />
        </section>

        <section className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[70vh]">
            <div className="relative bg-gray-100">
              <Image
                src="/assets/images/home1.webp"
                alt="Sample Chief girls"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                loading="lazy"
                className="object-cover object-center"
              />
            </div>

            <div className="relative bg-gray-100">
              <Image
                src="/assets/images/holts.webp"
                alt="Holt Renfrew store front"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                loading="lazy"
                className="object-cover object-center"
              />
            </div>

            <div className="relative bg-gray-100">
              <Image
                src="/assets/images/home9.webp"
                alt="Sample Chief talk"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                loading="lazy"
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>

        <section className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 h-[90vh]">
            <div className="relative bg-gray-100">
              <Image
                src="/assets/images/home8.webp"
                alt="Sami on decks"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                loading="lazy"
                className="object-cover object-center"
              />
            </div>

            <div className="relative bg-gray-100">
              <video
                src="/assets/videos/sample2.MP4"
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
              src="/assets/projects/holt-renfrew/9.jpg" 
              alt="Holts Renfrew event"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16">
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
                              d="M 60,60 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                            />
                          </defs>
                          <text
                            className="fill-white font-bold tracking-wider"
                            style={{ fontSize: '10px' }}
                            dominantBaseline="middle"
                          >
                            <textPath href="#circle-path" startOffset="0%">
                              LEARN MORE • LEARN MORE • LEARN MORE • 
                            </textPath>
                          </text>
                        </svg>
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg z-20 transition-transform duration-300 ">
                        <Link href="/about" scroll={true}>
                          <Image
                            src="/assets/logos/round-logo-white.png"
                            alt="Sample Chief Logo"
                            width={56}
                            height={56}
                            className="w-10 h-10 md:w-14 md:h-14 transition-transform duration-300 hover:scale-110 cursor-pointer"
                            priority
                          />
                        </Link>                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Sticky footer only on mobile, floating above content */}
          <div className="block sm:hidden absolute left-0 bottom-0 w-full z-30 pointer-events-auto">
            <Footer />
          </div>
        </section>

      </div>
    </LazyClientAudioManager>
  );
}