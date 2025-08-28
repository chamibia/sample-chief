import Image from "next/image";
import { Metadata } from "next";

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
    <div className="relative w-full">
      <section className="relative w-full h-[100vh]">
        <video
          src="/videos/sample.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
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
          <Image
            src="/assets/home10.webp"
            alt="Holts Renfrew event"
            fill
            loading="lazy"
            className="object-cover object-center"
          />
        </div>
      </section>
    </div>
  );
}
