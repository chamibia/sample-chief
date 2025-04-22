"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function About() {
  // Your actual partner logos
  const partners = [
    { id: 1, name: "Ace Hotel", logo: "/assets/ace.png" },
    { id: 2, name: "Holt Renfrew", logo: "/assets/holts.png" },
    { id: 3, name: "Okay Africa", logo: "/assets/okay.png" },
    { id: 4, name: "Sony Music", logo: "/assets/sony.png" },
    { id: 5, name: "The Standard", logo: "/assets/standard.jpg" },
    { id: 6, name: "Sway Way", logo: "/assets/sway.png" },
    { id: 7, name: "Universal", logo: "/assets/universal.png" },
  ];

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="min-h-screen relative">    
      {/* Content overlay */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-8xl font-bold tracking-tight mb-16 text-black text-right" style={{ fontWeight: 400, lineHeight: '0.9' }}>
            About
          </h1>
          
          {/* Optional subtitle or count indicator similar to "Total Events" */}
          <div className="mb-12 flex items-center">
            <span className="text-2xl text-[#C8102E] opacity-70">Our Story → </span>
          </div>
          
          {/* About Content */}
          <div className="space-y-12">
            <div className="grid md:grid-cols-12 gap-6">
              {/* Left column - could be for dates in events, could be for categories or sections in about */}
              <div className="md:col-span-2">
                <div className="space-y-1">
                  <p className="text-sm uppercase text-[#C8102E] opacity-70">WHO WE ARE</p>
                </div>
              </div>
              
              {/* Middle column - for content, similar to the image and details in events */}
              <div className="md:col-span-8">
                <p className="text-lg mb-6 text-center">
                  Sample Chief is a global community that celebrates African music culture. We're based in London, Toronto, Montreal and Lagos (Nigeria).
                </p>
                <p className="text-lg mb-6 text-center">
                  Our mission is to promote music discovery by creating interactive experiences for a global audience, through media and events.
                </p>
                <p className="text-lg text-center">
                  We connect brands to a vibrant youth audience that is interested in digital content and music experiences.
                </p>
              </div>
              
              {/* Right column - could be for additional info, similar to venue in events */}
              <div className="md:col-span-2">
                <div className="space-y-1">
                  <p className="text-sm uppercase text-[#C8102E] opacity-70">ESTABLISHED</p>
                  <p className="font-medium text-[#C8102E]">2020</p>
                </div>
              </div>
            </div>
          </div>
              <div className="mt-20 pt-12">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Collaborations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-20 mx-auto max-w-5xl">
              {partners.map((partner) => (
                <motion.div
                  key={partner.id}
                  className="flex items-center justify-center p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex items-center justify-center h-20 w-full">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-h-full max-w-full object-contain"
                      style={{ filter: 'none' }} 
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}