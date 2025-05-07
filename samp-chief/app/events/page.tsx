"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { radikalLight } from ".././layout";
import clsx from "clsx";

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
    ticketLink: "https://ra.co/events/2150643"
  },
];

export default function Events() {
  const [showBanner, setShowBanner] = useState(true);
  const totalEvents = eventData.length;
  
  useEffect(() => {
    const onScroll = () => {
      setShowBanner(window.scrollY < 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  const formatDate = (dateString: string) => {
    const options = { 
      month: 'short', 
      day: 'numeric' 
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US').toUpperCase();
  };
  
  const formatMonth = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  };
  
  const formatDay = (dateString: string) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  const eventCardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.7, delay: 0.2 }
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 }
    }
  };
  
  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, delay: 0.4 }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-white">
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: showBanner ? 1 : 0,
        height: showBanner ? "auto" : "0px",
      }}
      transition={{ duration: 0.3 }}
      style={{
        background: "linear-gradient(to right, #ffdd80 0%, #ffe599 50%, #ffecb3 100%)",
        borderBottom: "3px solid black",
        borderBottomLeftRadius: "1.5rem",
        borderBottomRightRadius: "1.5rem"
      }}
      className="overflow-hidden"
    >
      <div className="w-full lg:w-4/5 mx-auto py-8 px-4 md:py-14 md:px-6">
        <div className='pb-2'>
          <h2
            className={clsx(
              radikalLight.className,   
              "leading-none text-[3rem] md:text-[6rem] text-gray-800"
            )}
            style={{
              textShadow: "2px 2px 0px rgba(255,255,255,0.5)"
            }}
          >
            EVENTS
          </h2>
        </div>
      </div>
    </motion.div>
      <div className="w-full lg:w-4/5 mx-auto px-4 md:px-6 text-gray-800 pt-20 md:pt-40">
         <div className="space-y-24">
          {eventData.map((event) => (
            <motion.div 
              key={event.id} 
              className="text-2xl md:text-[1.5rem] leading-[1.2] mb-4 md:mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={eventCardVariants}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <motion.div 
                  className="md:col-span-5"
                  variants={imageVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                >
                  <div className="h-full overflow-hidden rounded-lg">
                    <Image
                      src={event.imageUrl} 
                      alt={event.title}
                      width={400}
                      height={200}
                      className="event-image object-cover transition-all duration-500"
                    />
                  </div>
                </motion.div>
                
                <div className="md:col-span-7">
                  <div className="event-details space-y-6">
                    <motion.h2 
                      className="event-title text-5xl"
                      variants={titleVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {event.title}
                    </motion.h2>
                    
                    <motion.div 
                      className="venue-info space-y-3"
                      variants={textVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center">
                        <Calendar className="icon h-5 w-5 mr-2 text-gray-600" />
                        <span>{formatDate(event.startDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="icon h-5 w-5 mr-2 text-gray-600" />
                        <span>{event.venue}, {event.address}</span>
                      </div>
                    </motion.div>
                    
                    <motion.p 
                      className="event-description text-lg leading-relaxed text-gray-800 max-w-full"
                      variants={textVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {event.description}
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Link 
                        href={event.ticketLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center justify-center px-8 py-3 border-2 border-black rounded-full text-black hover:bg-[#2E8B57] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                      > 
                        Tickets
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="pb-30 md:pb-30"></div>
      </div>
    </div>
  );
}