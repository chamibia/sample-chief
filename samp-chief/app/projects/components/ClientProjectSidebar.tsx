"use client";

import { useState } from "react";
import Link from "next/link";

import { events } from '@/data/events';

interface ClientProjectSidebarProps {
  onProjectHover?: (slug: string) => void;
  onProjectLeave?: () => void;
}

export default function ClientProjectSidebar({ 
  onProjectHover, 
  onProjectLeave 
}: ClientProjectSidebarProps) {
  return (
    <div className="w-80 bg-white p-6 flex flex-col justify-between shrink-0">
      <div className="flex flex-col min-h-0">
        <h1 className="font-ruder font-medium text-[#202020] text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] mb-8 flex-shrink-0">
          Projects
        </h1>
        
        <div className="space-y-4 overflow-y-auto flex-1 pr-2">
          {events.map((event) => (
            <Link
              key={event.slug}
              href={`/projects/${event.slug}`}
              className="block font-sans font-light text-[#202020] text-lg hover:bg-[#202020] hover:text-white transition-all duration-300 rounded-lg px-4 py-2"
              onMouseEnter={() => {
                onProjectHover?.(event.slug);
              }}
              onMouseLeave={() => {
                onProjectLeave?.();
              }}
            >
              {event.title}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <Link 
          href="/contact" 
          className="font-sans font-light leading-relaxed text-base bg-transparent border-2 border-gray-800 hover:bg-[#202020] hover:border-[#202020] hover:text-white rounded-full transition-all duration-300 hover:scale-105 inline-flex items-center justify-center px-6 py-3 text-[#202020] w-full"
        >
          Collab with Us
        </Link>
      </div>
    </div>
  );
}