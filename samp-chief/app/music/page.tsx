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
} from "@/components/ui/carousel"

export default function Music() {
  // Sample data for playlists
  const playlists = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    title: `Curated Playlist ${i + 1}`,
    artist: `Various Artists`,
    image: `https://picsum.photos/200/200?random=${i + 1}`,
    link: `/playlist/${i + 1}`
  }));

  // Sample data for mixes
  const mixes = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    title: `DJ Mix ${i + 1}`,
    artist: `DJ Collection`,
    image: `https://picsum.photos/200/200?random=${i + 10}`,
    link: `/mix/${i + 1}`
  }));

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
    title: string;
    artist: string;
    image: string;
    link: string;
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
      
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item) => (
            <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
              <Link href={item.link} className="group">
                <Card className="bg-transparent border-0 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-0">
                    <div className="aspect-square relative mb-3 overflow-hidden rounded-lg">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-radikal font-normal leading-relaxed text-sm text-gray-700 truncate">
                        {item.title}
                      </p>
                      <p className="font-radikal font-light leading-relaxed text-xs text-gray-500 truncate">
                        {item.artist}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-white border-2 border-gray-300 text-gray-700 hover:bg-[#2E8B57] hover:border-[#2E8B57] hover:text-white transition-all duration-300 -left-6" />
        <CarouselNext className="bg-white border-2 border-gray-300 text-gray-700 hover:bg-[#2E8B57] hover:border-[#2E8B57] hover:text-white transition-all duration-300 -right-6" />
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
            seeAllLink="/playlists"
            delay={0.2}
          />
          
          <CarouselSection
            title="Mixes"
            items={mixes}
            seeAllLink="/mixes"
            delay={0.4}
          />
        </div>
      </div>
      
      <div className="pb-24 md:pb-16" 
           style={{ paddingBottom: "calc(6rem + env(safe-area-inset-bottom))" }} />
    </div>
  );
}
