"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const eventData = [
  {
    id: 1,
    title: "Village Boogie",
    description: "Standard Time welcomes the return of Sample Chief!                                   The highly anticipated “Village Boogie!” makes its Toronto return on May 11th! Inspired by the diverse dance music genres from the Motherland (groovy Afrodisco rhythms of the 80s, to heavy-heat GQOM and Amapiano basslines), Sample Chief invites you on an eclectic and immersive sonic expedition into African Dance Music.",
    startDate: "2025-05-17",
    endDate: "2025-05-18",
    venue: "Standard Time",
    address: "165 Geary Ave Toronto, ON M6H 2B8, Canada",
    imageUrl: "/assets/may_17.jpg", 
    ticketLink: "https://ra.co/events/2150643"
  },
];

export default function Events() {
  // Calculate total events
  const totalEvents = eventData.length;
  
  // Function to format date
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options).toUpperCase();
  };

  return (
    <div className="min-h-screen text-black pb-16">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-8xl font-bold tracking-tight mb-16 text-black text-right" style={{ fontWeight: 400, lineHeight: '0.9' }}>
          Events
        </h1>
        
        {/* Total events count */}
        <div className="mb-12 flex items-center">
          <span className="text-2xl text-[#F4C430]">Total Events → </span>
          <span className="text-2xl ml-3 text-[#F4C430]">{totalEvents}</span>
        </div>
        
        {/* Events List */}
        <div className="space-y-16">
          {eventData.map((event) => (
            <Link 
              href={event.ticketLink} 
              target="_blank" 
              rel="noopener noreferrer"
              key={event.id}
              className="block group"
            >
              <div className="grid md:grid-cols-12 gap-6">
                {/* Date Info */}
                <div className="md:col-span-2">
                  <div className="space-y-1">
                    <p className="text-sm uppercase opacity-70 text-[#F4C430]">STARTS ON</p>
                    <p className="font-medium text-[#F4C430]">{formatDate(event.startDate)}</p>
                    
                    {event.startDate !== event.endDate && (
                      <>
                        <p className="text-sm uppercase opacity-70 mt-4 text-[#F4C430]">END ON</p>
                        <p className="font-medium text-[#F4C430]">{formatDate(event.endDate)}</p>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Event Image */}
                <div className="md:col-span-4">
                  <div className="aspect-square overflow-hidden bg-black">
                  <Image
                    src={event.imageUrl} 
                alt={event.title}
                 width={500}
                 height={500}
                className="w-full h-full object-fill transition-transform duration-400 group-hover:scale-105"
                    />
                  </div>
                </div>
                
                {/* Event Details */}
                <div className="md:col-span-4">
                  <h2 className="text-2xl font-bold mb-3 text-[#C8102E]">{event.title}</h2>
                  <p className="text-black/80 mb-4">
                    {event.description}
                  </p>
                </div>
                
                {/* Venue Info */}
                <div className="md:col-span-2">
                  <div className="space-y-1">
                    <p className="font-medium">{event.venue}</p>
                    <p className="text-black/80">{event.address}</p>
                    <p className="mt-4">Regular rates apply</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}