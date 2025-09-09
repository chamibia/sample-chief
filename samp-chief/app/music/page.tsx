"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselProgressBar } from "@/components/ui/carousel-progress-bar";

export default function MusicPage() {
  const playlists = [
    {
      id: 1,
      image: "/assets/amapiano.avif",
      link: "https://open.spotify.com/playlist/6WsIf9FtJQ3xX7ksYXHznq",
      title: "Amapiano Anthems",
      subtitle:
        "Log drums. Soul. Street heat. The biggest Amapiano tracks, all here",
    },
    {
      id: 2,
      image: "/assets/guitar.webp",
      link: "https://open.spotify.com/playlist/7KlCMmUFJVdGfhZolbst3n",
      title: "Strings of Africa",
      subtitle:
        "Timeless riffs and rhythms — African guitar classics from coast to coast",
    },
    {
      id: 3,
      image: "/assets/divas.jpg",
      link: "https://open.spotify.com/playlist/4tpdZBRLlf8jZcO0y1gUuD",
      title: "Disco Divas",
      subtitle: "Dancefloor magic from the queens of African disco and funk",
    },
    {
      id: 4,
      image: "/assets/kwaito.jpg",
      link: "https://open.spotify.com/playlist/7chMRFAkUlghZhq5yuQ88j",
      title: "Kwaito Klassics",
      subtitle:
        "Trompies, Alaska, Brothers of Peace and more - Kwaito’s golden era lives here",
    },
    {
      id: 5,
      image: "/assets/retro.jpeg",
      link: "https://open.spotify.com/playlist/5xJldtAX9Ss9iNvZlHhQOl",
      title: "Global Retro SA Pop",
      subtitle:
        "Neon nights and township vibes. Feel the nostalgia of SA bubblegum pop",
    },
    {
      id: 6,
      image: "/assets/wassolou.jpg",
      link: "https://open.spotify.com/playlist/6PZXfm7wG56T6s4tnvllBL",
      title: "Women of Wassoulou",
      subtitle:
        "Powerful voices and ancient rhythms from West Africa’s Wassoulou women",
    },
    {
      id: 7,
      image: "/assets/connecting.png",
      link: "https://open.spotify.com/playlist/6PZXfm7wG56T6s4tnvllBL",
      title: "Connecting Continents",
      subtitle: "A musical journey curated by Sample Chief x Holt Renfrew.",
    },
    {
      id: 8,
      image: "/assets/feeling-flute.jpg",
      link: "https://open.spotify.com/playlist/3mrVbtIitb4TtYFQz9MBJq?si=X4Thj_JATkK5px3en1w3WQ",
      title: "Feeling Flute-y?",
      subtitle: "The finest of African flute sounds",
    },
    {
      id: 9,
      image: "/assets/07-tracks.jpg",
      link: "https://open.spotify.com/playlist/3LeTfzqHKdRHO34MPIgJgF",
      title: "‘07 Naija",
      subtitle:
        "15 years later, these 2007 Naija hits have stood the test of time",
    },
    {
      id: 10,
      image: "/assets/village-boogie.png",
      link: "https://open.spotify.com/playlist/4g3AqxygO3j4HwSkhXtLfP",
      title: "Village Boogie! 🪩",
      subtitle:
        "African funk and disco tracks for the soul, named after our flagship event",
    },
    {
      id: 11,
      image: "/assets/fela.jpeg",
      link: "https://open.spotify.com/playlist/2pvfeJ0kEyEkV7tfKfvU0f",
      title: "The Fela Effect",
      subtitle: "Fela’s classics and the tracks they inspired",
    },
    {
      id: 12,
      image: "/assets/explore-more.jpg",
      link: "https://open.spotify.com/user/x3zc0sdr8mdvs4b7uzqxqdnnf/playlists",
      title: "Explore More",
      subtitle: "Check out all our playlists",
    },
  ];

  const mixes = [
    {
      id: 1,
      image: "/assets/haruna.png",
      link: "https://soundcloud.com/samplechief/sample-chief-selekta-w-haruna?si=25a8dbd70e2b4fe4858efd43d2b72e22&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
      title: "Haruna on Sample Chief Radio",
      subtitle: "",
    },
    {
      id: 2,
      image: "/assets/village-b.PNG",
      link: "https://soundcloud.com/samplechief/village-boogie-5-toronto?si=4d643c310415427aa4ea562e588ba79a&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
      title: "Village Boogie May 2024 mix",
      subtitle: "",
    },
    {
      id: 3,
      image: "/assets/michelle.PNG",
      link: "https://soundcloud.com/samplechief/sample-chief-radio-w-michelle-on-n10as?si=6422569a33b94db187c403816497dbe1&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
      title: "Michelle on Sample Chief Radio",
      subtitle: "",
    },
    {
      id: 4,
      image: "/assets/ore.jpg",
      link: "https://soundcloud.com/samplechief/highlife-and-sunshine-show-w-ore?si=6bec083352ae431bb1398776526758d1&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
      title: "Nigerian Disco Mix with Orè (NTS Radio)",
      subtitle: "",
    },
    {
      id: 5,
      image: "/assets/fro.png",
      link: "https://soundcloud.com/samplechief/sample-chief-radio-on-balamii-w-kisa-tryb?si=f414964736a445ff997e942e9243dcd6&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
      title: "Afro-Grooves with Kisa (NTS Radio)",
      subtitle: "",
    },
    {
      id: 6,
      image: "/assets/martinses.png",
      link: "https://soundcloud.com/samplechief/radio-ep-5-w-martinses-razaqeltoro-on-n10as?si=00ba9a37a79c4a44959cb889e54829b4&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
      title: "Martinses & Razaq El Toro on Sample Chief Radio",
      subtitle: "",
    },
    {
      id: 7,
      image: "/assets/symposium.jpg",
      link: "https://soundcloud.com/samplechief/sunday-symposium-panel-talk-at-the-standard-london?si=2a0d98bf09a54a6bb1c544cd7f80c13a&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
      title: "Sunday Symposium Panel Talk",
      subtitle: "",
    },
    {
      id: 8,
      image: "/assets/kazeem.jpg",
      link: "https://soundcloud.com/samplechief/samplechief-radio-w-kazeemkuteyi-milesfreedom-on-n10as?si=02a154bcc68148b99fc2d2a58ed9cbdf&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
      title: "Kazeem Kuteyi x Miles Freedom on Sample Chief Radio",
      subtitle: "",
    },
    {
      id: 9,
      image: "/assets/explore.png",
      link: "https://soundcloud.com/samplechief",
      title: "Explore More",
      subtitle: "Check out all our mixes",
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  interface CarouselItem {
    id: number;
    image: string;
    link: string;
    title: string;
    subtitle: string;
  }

  interface CarouselSectionProps {
    title: string;
    items: CarouselItem[];
    seeAllLink: string;
    delay?: number;
  }

  const CarouselSection = ({
    title,
    items,
    seeAllLink,
    delay = 0,
  }: CarouselSectionProps) => (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      className="mb-12"
    >
      <div className="flex items-end justify-between mb-6">
        <h2 className="font-ruder leading-relaxed text-3xl md:text-4xl text-[#202020] tracking-wider">
          {title}
        </h2>
        <Link
          href={seeAllLink}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans font-light leading-relaxed text-base text-[#07693A] hover:underline transition-all duration-300 inline-flex items-center pb-[2px]"
          style={{ gap: '5px' }}
        >
          See all
          <ExternalLink className="w-4 h-4 inline-block align-text-bottom" aria-label="Opens external link" />
        </Link>
      </div>

      <Carousel className="w-full" opts={{ slidesToScroll: 2 }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className="pl-2 md:pl-4 basis-1/2 md:basis-1/3"
            >
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl overflow-hidden"
              >
                <Card className="bg-transparent border-0 cursor-pointer">
                  <CardContent className="p-0">
                    <div className="aspect-square relative">
                      <img
                        src={item.image}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-neutral-700/30 group-hover:opacity-0 transition-opacity duration-500 z-10" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-20" />

                      <div className="absolute top-4 left-4 z-30">
                        <h3 className="font-sans text-white text-lg">
                          {item.title}
                        </h3>
                      </div>
                      {/* External link icon top right on hover */}
                      <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink className="w-5 h-5 text-white" aria-label="Opens external link" />
                      </div>
                      <div className="absolute bottom-4 left-4 z-30">
                        <p className="font-sans text-white text-sm pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="flex md:hidden bg-white border-2 border-gray-300 text-gray-700 hover:bg-[#2E8B57] hover:border-[#2E8B57] hover:text-white transition-all duration-300 -left-2 top-1/2 -translate-y-1/2 h-8 w-8" />
        <CarouselNext className="flex md:hidden bg-white border-2 border-gray-300 text-gray-700 hover:bg-[#2E8B57] hover:border-[#2E8B57] hover:text-white transition-all duration-300 -right-2 top-1/2 -translate-y-1/2 h-8 w-8" />
        <CarouselPrevious className="hidden md:flex bg-white border-2 border-gray-300 text-gray-700 hover:bg-[#2E8B57] hover:border-[#2E8B57] hover:text-white transition-all duration-300 -left-6 top-1/2 -translate-y-1/2" />
        <CarouselNext className="hidden md:flex bg-white border-2 border-gray-300 text-gray-700 hover:bg-[#2E8B57] hover:border-[#2E8B57] hover:text-white transition-all duration-300 -right-6 top-1/2 -translate-y-1/2" />
        {/* Progress bar below carousel */}
        <CarouselProgressBar />
      </Carousel>
    </motion.div>
  );

  return (
    <>
      {/* Header and intro */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-ruder font-medium text-4xl md:text-5xl lg:text-6xl text-left mb-6 leading-tight tracking-wider text-[#202020]">
          From Our Ears to Yours
        </h1>
        <p className="font-sans font-light text-lg md:text-xl lg:text-2xl text-left max-w-2xl leading-loose tracking-wider mb-10">
          Enjoy our selection of playlists and mixes, curated for every mood
        </p>
      </motion.div>

      {/* Add space above Playlists section */}
      <div className="mb-2" />

      <CarouselSection
        title="Playlists"
        items={playlists}
        seeAllLink="https://open.spotify.com/user/x3zc0sdr8mdvs4b7uzqxqdnnf/playlists"
        delay={0.2}
      />

      <CarouselSection
        title="Mixes"
        items={mixes}
        seeAllLink="https://soundcloud.com/samplechief"
        delay={0.4}
      />
      {/* Fixed bottom spacing for mobile */}
      <div
        className="pb-24 md:pb-16"
        style={{ paddingBottom: "calc(6rem + env(safe-area-inset-bottom))" }}
      />
    </>
  );
}
