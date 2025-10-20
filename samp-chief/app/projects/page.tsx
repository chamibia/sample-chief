"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { events } from '@/data/events';

const ProjectImageWithOverlay = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Image
      src={src}
      alt={alt}
      fill
  className="object-cover object-center rounded-lg"
      placeholder="blur"
      blurDataURL="data:image/svg+xml,%3Csvg width='16' height='16' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='16' height='16' fill='%23e5e7eb'/%3E%3C/svg%3E"
      priority
      quality={85}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};

const ProjectsPage = () => {

  // Calculate max row needed for grid-rows-N
  // This ensures the grid has enough rows for all cards based on their rowStart and rowSpan
  const maxRow = events.reduce((max, event) => {
    const rowStart = event.rowStart ? parseInt(event.rowStart.replace('row-start-', ''), 10) : 1;
    const rowSpan = event.gridSpan ? parseInt(event.gridSpan.replace('row-span-', '').split(' ')[0], 10) : 1;
    return Math.max(max, rowStart + rowSpan - 1);
  }, 1);
  const gridRowsClass = `grid-rows-${maxRow}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile: first card full width, second and third side-by-side, rest stacked */}
      <div className="block md:hidden w-full p-4">
        {/* First card full width */}
        {events[0] && (
          <Link key={events[0].slug} href={`/projects/${events[0].slug}`} className="block bg-transparent rounded-lg overflow-hidden border-0 transition-shadow duration-300 cursor-pointer w-full h-[18rem] relative mb-6">
            <div className="relative w-full h-full">
              <ProjectImageWithOverlay src={events[0].projectcard} alt={events[0].title} />
              <div className="absolute inset-0 w-full h-full z-20 flex flex-col items-start justify-start p-4">
                <h1 className="font-ruder font-medium text-white leading-tight text-2xl md:text-3xl pl-2">{events[0].title}</h1>
              </div>
            </div>
          </Link>
        )}
        {/* Second and third cards side-by-side */}
        <div className="grid grid-cols-2 gap-4 mb-6">
            {events.slice(1, 3).map((event) => (
            <Link key={event.slug} href={`/projects/${event.slug}`} className="bg-transparent rounded-lg overflow-hidden border-0 transition-shadow duration-300 cursor-pointer w-full h-[18rem] relative">
              <div className="relative w-full h-full">
                <ProjectImageWithOverlay src={event.projectcard} alt={event.title} />
                <div className="absolute inset-0 w-full h-full z-20 flex flex-col items-start justify-start p-4">
                  <h1 className="font-ruder font-medium text-white leading-tight text-2xl md:text-3xl pl-2">{event.title}</h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* Remaining cards stacked */}
        {events.slice(3).map((event) => (
          <Link key={event.slug} href={`/projects/${event.slug}`} className="block bg-transparent rounded-lg overflow-hidden border-0 transition-shadow duration-300 cursor-pointer w-full h-[18rem] relative mb-6">
            <div className="relative w-full h-full">
              <ProjectImageWithOverlay src={event.projectcard} alt={event.title} />
              <div className="absolute inset-0 w-full h-full z-20 flex flex-col items-start justify-start p-4">
                <h1 className="font-ruder font-medium text-white leading-tight text-2xl md:text-3xl pl-2">{event.title}</h1>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop: custom grid */}
      <div className={`hidden md:grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${gridRowsClass} fixed-row-height gap-4 p-8 mx-auto`}>
        {events.map((event) => (
          <Link
            key={event.slug}
            href={`/projects/${event.slug}`}
            className={`bg-transparent rounded-lg overflow-hidden border-0 transition-shadow duration-300 cursor-pointer h-full w-full relative block group ${event.gridSpan ? event.gridSpan : ''} ${event.colStart ? event.colStart : ''} ${event.rowStart ? event.rowStart : ''}`}
          >
            <div className="relative w-full h-full">
              <ProjectImageWithOverlay src={event.projectcard} alt={event.title} />
              {/* Hover overlay fills card */}
              <div className="absolute inset-0 w-full h-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col items-start justify-start p-4 h-full">
                <h1 className="font-ruder font-medium text-white leading-tight text-3xl md:text-4xl pl-3">
                  {event.title}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;