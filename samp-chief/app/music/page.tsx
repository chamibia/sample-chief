"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function MusicPage() {
  const playlists = [
    {
      id: 1,
      image: '/assets/amapiano.avif',
      link: 'https://open.spotify.com/playlist/6WsIf9FtJQ3xX7ksYXHznq',
      title: 'Amapiano Anthems',
      subtitle: 'Log drums. Soul. Street heat. The biggest Amapiano tracks, all here'
    },
    {
      id: 2,
      image: '/assets/guitar.webp',
      link: 'https://open.spotify.com/playlist/7KlCMmUFJVdGfhZolbst3n',
      title: 'Strings of Africa',
      subtitle: 'Timeless riffs and rhythms — African guitar classics from coast to coast'
    },
    {
      id: 3,
      image: '/assets/divas.jpg',
      link: 'https://open.spotify.com/playlist/4tpdZBRLlf8jZcO0y1gUuD',
      title: 'Disco Divas',
      subtitle: 'Dancefloor magic from the queens of African disco and funk'
    },
    {
      id: 4,
      image: '/assets/kwaito.jpg',
      link: 'https://open.spotify.com/playlist/7chMRFAkUlghZhq5yuQ88j',
      title: 'Kwaito Klassics',
      subtitle: 'Trompies, Alaska, Brothers of Peace and more - Kwaito’s golden era lives here'
    },
    {
      id: 5,
      image: '/assets/retro.jpeg',
      link: 'https://open.spotify.com/playlist/5xJldtAX9Ss9iNvZlHhQOl',
      title: 'Global Retro SA Pop',
      subtitle: 'Neon nights and township vibes. Feel the nostalgia of SA bubblegum pop'
    },
    {
      id: 6,
      image: '/assets/wassolou.jpg',
      link: 'https://open.spotify.com/playlist/6PZXfm7wG56T6s4tnvllBL',
      title: 'Women of Wassoulou',
      subtitle: 'Powerful voices and ancient rhythms from Mali and Senegal’s Wassoulou women'
    },
    {
      id: 7,
      image: '/assets/connecting.png',
      link: 'https://open.spotify.com/playlist/6PZXfm7wG56T6s4tnvllBL',
      title: 'Connecting Continents',
      subtitle: 'Past to present, Africa to world . A musical journey curated by Sample Chief x Holt Renfrew.'
    },
    {
      id: 8,
      image: '/assets/wassolou.jpg',
      link: 'https://open.spotify.com/playlist/3mrVbtIitb4TtYFQz9MBJq?si=X4Thj_JATkK5px3en1w3WQ',
      title: 'Feeling Flute-y?',
      subtitle: 'The finest of African flute sounds'
    },
    {
      id: 9,
      image: '/assets/wassolou.jpg',
      link: 'https://open.spotify.com/playlist/3LeTfzqHKdRHO34MPIgJgF',
      title: '‘07 Naija',
      subtitle: '15 years later, these 2007 Naija hits stood the test of time'
    },
     {
      id: 10,
      image: '/assets/village.PNG',
      link: 'https://open.spotify.com/playlist/4g3AqxygO3j4HwSkhXtLfP',
      title: 'Village Boogie! 🪩',
      subtitle: 'African funk and disco tracks for the soul, named after our flagship event'
    },
    {
      id: 11,
      image: '/assets/fela.jpeg',
      link: 'https://open.spotify.com/playlist/2pvfeJ0kEyEkV7tfKfvU0f',
      title: 'The Fela Effect',
      subtitle: 'Fela’s classics and the tracks they inspired'
    },
     {
      id: 12,
      image: '/assets/fela.jpeg',
      link: 'https://open.spotify.com/user/x3zc0sdr8mdvs4b7uzqxqdnnf/playlists',
      title: 'Explore More',
      subtitle: 'Check out all our playlists'
    },
  ];

  const mixes = [
    { id: 1, image: '/assets/four-people.png', link: 'https://on.soundcloud.com/WYrFVHX5eW8u3JNURR', title: 'Live at Pianos', subtitle: 'NYC' },
    { id: 2, image: '/assets/no-signal.png', link: 'https://on.soundcloud.com/H91AkEKJPwyjWAIZHB', title: 'No Signal', subtitle: 'Radio' },
    { id: 3, image: '/assets/two-animation.png', link: 'https://on.soundcloud.com/QFYTemWrIBJcHFmcWR', title: 'Everyday People', subtitle: 'Live Set' },
    { id: 4, image: '/assets/two-guys.png', link: 'https://on.soundcloud.com/EAYjbpsE9pIAcO9cp8', title: 'The Lot Radio', subtitle: 'Live Set' },
    { id: 5, image: '/assets/two-people.png', link: 'https://on.soundcloud.com/G2DNi8ASzp7Dj25Qfj', title: 'NTS Radio', subtitle: 'Live Set' },
    { id: 6, image: '/assets/yellow-top.png', link: 'https://on.soundcloud.com/FXPqh37GyDFvqSH5hb', title: 'The Getaway', subtitle: 'Live Set' },
    { id: 7, image: '/assets/home9.webp', link: '/mix/7', title: 'Boiler Room', subtitle: 'London' },
    { id: 8, image: '/assets/home10.webp', link: '/mix/8', title: 'Soho Radio', subtitle: 'London' },
    { id: 9, image: '/assets/london_june_19.jpeg', link: '/mix/9', title: 'Recess', subtitle: 'Live Set' }
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

  const CarouselSection = ({ title, items, seeAllLink, delay = 0 }: CarouselSectionProps) => (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-radikal font-light leading-relaxed text-3xl md:text-4xl text-gray-700 tracking-wider">
          {title}
        </h2>
        <Link
          href={seeAllLink}
          className="font-radikal font-light leading-relaxed text-base text-[#2E8B57] hover:underline transition-all duration-300"
        >
          See all
        </Link>
      </div>

      <Carousel className="w-full" opts={{ slidesToScroll: 3 }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item) => (
<CarouselItem key={item.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3">
              <Link href={item.link} className="group block rounded-2xl overflow-hidden">
                <Card className="bg-transparent border-0 cursor-pointer">
                  <CardContent className="p-0">
                   <div className="aspect-square relative">
  <img
    src={item.image}
    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
  />
    <div className="absolute inset-0 bg-neutral-700/30 group-hover:opacity-0 transition-opacity duration-500 z-10" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20" />

  <div className="absolute top-4 left-4 z-30">
    <h3 className="font-radikal font-bold text-white text-lg">{item.title}</h3>
  </div>
  <div className="absolute bottom-4 left-4 z-30">
    <p className="font-radikal font-light text-white text-sm">{item.subtitle}</p>
  </div>
</div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-white border-2 border-gray-300 text-gray-700 hover:bg-[#2E8B57] hover:border-[#2E8B57] hover:text-white transition-all duration-300 -left-6 top-1/2 -translate-y-1/2" />
        <CarouselNext className="bg-white border-2 border-gray-300 text-gray-700 hover:bg-[#2E8B57] hover:border-[#2E8B57] hover:text-white transition-all duration-300 -right-6 top-1/2 -translate-y-1/2" />
      </Carousel>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 w-full px-5 md:px-9 text-gray-800 pt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="font-radikal font-light leading-relaxed text-4xl md:text-5xl mb-6 tracking-wider text-gray-700">
              Discover Music
            </h1>
            <p className="font-radikal font-light mb-8 leading-relaxed text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto">
              From curated playlists to exclusive mixes, explore sounds that move cultures and connect communities across the globe.
            </p>
          </motion.div>

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
        </div>
      </div>

      {/* Fixed bottom spacing for mobile */}
      <div className="pb-24 md:pb-16"
        style={{ paddingBottom: "calc(6rem + env(safe-area-inset-bottom))" }} />
    </div>
  )
}
