"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, ExternalLink, Music } from 'lucide-react';

const eventData = [
  {
    id: 1,
    title: "Village Boogie",
    description: "Standard Time welcomes the return of Sample Chief! The highly anticipated Village Boogie! makes its Toronto return on May 11th! Inspired by the diverse dance music genres from the Motherland (groovy Afrodisco rhythms of the 80s, to heavy-heat GQOM and Amapiano basslines), Sample Chief invites you on an eclectic and immersive sonic expedition into African Dance Music.",
    startDate: "2025-05-17",
    endDate: "2025-05-17",
    time: "9PM - LATE",
    venue: "Standard Time",
    address: "165 Geary Ave Toronto, ON M6H 2B8, Canada",
    imageUrl: "/assets/may_17.jpg", 
    ticketLink: "https://ra.co/events/2150643",
    lineup: ["Adeola", "Mangabele", "Duppy Grlz (MTL)", "Spin Towers", "Teray"]
  },
];

export default function Events() {
  const totalEvents = eventData.length;
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short' as const, 
      day: 'numeric' as const 
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options).toUpperCase();
  };
  
  const formatMonth = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  };
  
  const formatDay = (dateString: string) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
        <div className="relative mb-16">
          <h1 className="text-8xl font-bold brush-title">Events</h1>
        </div>
        
        <div className="mb-12 flex items-center">
          <div className="event-counter">
            <span className="text-xl font-medium">Total Events</span>
            <span className="event-number">{totalEvents}</span>
          </div>
        </div>
        
        <div className="space-y-24">
          {eventData.map((event) => (
            <div key={event.id} className="event-card">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-2">
                  <div className="date-display">
                    <div className="month">{formatMonth(event.startDate)}</div>
                    <div className="day">{formatDay(event.startDate)}</div>
                    <div className="time">{event.time}</div>
                  </div>
                </div>
                
                <div className="md:col-span-4">
                  <div className="image-container">
                    <Image
                      src={event.imageUrl} 
                      alt={event.title}
                      width={500}
                      height={500}
                      className="event-image"
                    />
                  </div>
                </div>
                  <div className="md:col-span-6">
                  <div className="event-details">
                    <h2 className="event-title">{event.title}</h2>
                    
                    <div className="venue-info">
                      <div className="flex items-center">
                        <Calendar className="icon" />
                        <span>{formatDate(event.startDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="icon" />
                        <span>{event.venue}, {event.address}</span>
                      </div>
                    </div>
                    
                    <p className="event-description">{event.description}</p>
                    
                    {event.lineup && event.lineup.length > 0 && (
                      <div className="lineup">
                        <div className="flex items-center gap-2 mb-2">
                          <Music className="h-5 w-5 text-[#006636]" />
                          <span className="font-medium">LINEUP</span>
                        </div>
                        <div className="lineup-grid">
                          {event.lineup.map((artist, index) => (
                            <div key={index} className="artist-tag">{artist}</div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Link 
                      href={event.ticketLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ticket-button"
                    >
                      <span>Get Tickets</span>
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* SVG Filter for brush effects */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="brush-texture" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence baseFrequency="0.01" numOctaves="3" seed="1" />
          <feDisplacementMap in="SourceGraphic" scale="10" />
        </filter>
      </svg>
      
      {/* CSS for custom styling */}
      <style jsx global>{`
        /* Import brush font */
        @import url('https://fonts.cdnfonts.com/css/magic-brush');
        
        /* Brushstroke title */
        .brush-title {
          font-family: 'Magic Brush', sans-serif;
          color: #176B2F;
          text-align: right;
          line-height: 0.9;
          position: relative;
          z-index: 1;
        }
        
        /* Event counter styling */
        .event-counter {
          display: flex;
          align-items: center;
          gap: 12px;
          color:  #D72638;
          font-weight: 500;
        }
        
        .event-number {
          background-color: #D72638;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: bold;
        }
        
        /* Event card styling */
        .event-card {
          position: relative;
          padding: 2rem;
          border-radius: 12px;
          background-color: #FFFFFF;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        /* Date display */
        .date-display {
          background-color: #F4C430;
          color: white;
          border-radius: 8px;
          padding: 1.5rem 1rem;
          text-align: center;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .month {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        
        .day {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
        }
        
        .time {
          margin-top: 1rem;
          font-size: 0.9rem;
          opacity: 0.8;
        }
        
        /* Image container */
        .image-container {
          border-radius: 8px;
          overflow: hidden;
          aspect-ratio: 1;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .event-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .image-container:hover .event-image {
          transform: scale(1.05);
        }
        
        /* Event details */
        .event-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #1A1A1A;
          margin-bottom: 1rem;
          font-family: 'Magic Brush', sans-serif;
        }
        
        .venue-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          color: #D72638;
        }
        
        .venue-info .icon {
          width: 18px;
          height: 18px;
          margin-right: 8px;
        }
        
        .event-description {
          color: #4A4A4A;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        /* Lineup section */
        .lineup {
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .lineup-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 0.5rem;
        }
        
        .artist-tag {
          background-color: #F9F9F9;
          border: 1px solid #EEEEEE;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.9rem;
          color: #006636;
        }
        
        /* Ticket button */
        .ticket-button {
          display: inline-flex;
          align-items: center;
          background-color: #006636;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 600;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }
        
        .ticket-button:hover {
          background-color: #005129;
          transform: translateY(-2px);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .brush-title {
            text-align: center;
            font-size: 4rem;
          }
          
          .date-display {
            margin-bottom: 1rem;
          }
          
          .event-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
}