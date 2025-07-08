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
      image: '/assets/womens_samples.jpg',
      link: '/playlist/',
      title: 'Motherland Magic',
      subtitle: 'Women in sound'
    },
    {
      id: 2,
      image: '/assets/guitar-music.webp',
      link: '/playlist/',
      title: 'At The Funktion',
      subtitle: 'Sounds of the diaspora'
    },
    {
      id: 3,
      image: '/assets/kwaito.jpg',
      link: 'playlist',
      title: 'Desert Blues',
      subtitle: 'Malian guitar'
    },
    {
      id: 4,
      image: '/assets/makossa.jpg',
      link: 'playlists',
      title: 'Amapiano Anthems',
      subtitle: 'Sounds of South Africa'
    },
    {
      id: 5,
      image: '/assets/uncle-waffles.avif',
      link: 'playlists',
      title: 'Global Grooves',
      subtitle: 'Internationally known'
    },
    {
      id: 6,
      image: '/assets/wassolou.jpg',
      link: 'playlists',
      title: 'Wassoulou',
      subtitle: 'Sounds of Wassoulou'
    }
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
            <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-1/3">
              <Link href={item.link} className="group block rounded-2xl overflow-hidden">
                <Card className="bg-transparent border-0 cursor-pointer">
                  <CardContent className="p-0">
                    <div className="aspect-square relative">
                      <img
                        src={item.image}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <h3 className="font-radikal font-bold text-white text-lg">{item.title}</h3>
                      </div>
                      <div className="absolute bottom-4 left-4">
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
            seeAllLink="https://open.spotify.com/user/x3zc0sdr8mdvs4b7uzqxqdnnf?si=64880b5504514516"
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
  );
}
