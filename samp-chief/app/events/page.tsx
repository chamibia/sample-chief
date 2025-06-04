"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, CalendarPlus } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

const eventData = [
  {
    id: 1,
    title: "Village Boogie",
    description:
      "Standard Time welcomes the return of Sample Chief and the highly anticipated Village Boogie! on May 11 in Toronto. Inspired by diverse dance genres from the Motherland—from groovy 80s Afrodisco to heavy GQOM and Amapiano—Sample Chief leads an immersive sonic expedition in African dance music.",
    startDate: "2025-05-17",
    endDate: "2025-05-17",
    time: "9PM - LATE",
    venue: "Standard Time",
    address: "165 Geary Ave Toronto, Canada",
    imageUrl: "/assets/may_17.jpg",
    ticketLink: "https://ra.co/events/2150643",
  },
  {
    id: 2, 
    title: "Sample Chief Social: Vinyl Night",
    description: "Join us at The Little Jerry (418 College Street) on Friday June 6th. Please note: Due to limited venue capacity, an RSVP does not guarantee entry",
    startDate: "2025-06-06",
    endDate: "2025-06-07",
    time: "9pm - LATE",
    venue: "The Little Jerry, 418 College Street, Toronto, Canada",
    imageUrl: "/assets/social-vinyl-night.jpg",
    ticketLink: "https://docs.google.com/forms/d/e/1FAIpQLSfzD1A6wJYXnRrFXAT0DgOVkJwbexESCO5cV1uupaeYnSAcGg/viewform",
  },
  {
    id: 3,
    title: "Sample Chief Socal",
    description: "Join us at Sweeties, The Standard on Thursday June 19th. Please note: Due to limited venue capacity, an RSVP does not guarantee entry",
    startDate: "2025-06-19",
    endDate: "2025-06-20",
    time: "9pm - LATE",
    venue: "Sweeties, 10th Floor, 10 Argyle St, London WC1H 8EG, United Kingdom",
    imageUrl: "/assets/social-vinyl-night.jpg",
    ticketLink: "https://docs.google.com/forms/d/e/1FAIpQLScEnyFLRuDOPs7vZxZiEJ9fG1EUjc9nNaDBwW5kt5Cx48UGew/viewform?usp=header",
  }
]

export default function Events() {
  const [showBanner, setShowBanner] = useState(true)
  const totalEvents = eventData.length;

  useEffect(() => {
    const onScroll = () => setShowBanner(window.scrollY < 100)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const formatDate = (dateString: string) =>
    new Date(dateString)
      .toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const generateCalendarLink = (event: typeof eventData[0]) => {
    const startDate = new Date(`${event.startDate}T21:00:00`)
    const endDate = new Date(`${event.endDate}T23:59:00`)

    const formatDateForGoogle = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const params = {
      action: 'TEMPLATE',
      text: encodeURIComponent(event.title),
      dates: `${formatDateForGoogle(startDate)}/${formatDateForGoogle(endDate)}`,
      details: encodeURIComponent(event.description),
      location: encodeURIComponent(`${event.venue}, ${event.address}`),
    };

    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return `https://calendar.google.com/calendar/render?${queryString}`;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className={`overflow-hidden bg-[#ffdd80] rounded-b-2xl transition-all duration-300 ${showBanner ? 'h-auto' : 'h-0'}`}>
        <div className="w-full mx-auto py-8 px-4 md:py-14 md:px-6">
        </div>
      </div>
      
      <div className="flex-1 w-full px-5 md:px-9 text-gray-800">
        <div>
          {eventData.slice().reverse().map((event) => (
            <motion.div
              key={event.id}
              className="text-2xl md:text-[1.5rem] leading-[1.2] mb-8 pt-10 md:pt-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-6 items-stretch">
                <motion.div
                  className="md:col-span-4 mb-6 md:mb-0"
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.7, delay: 0.2 },
                    },
                    hover: { scale: 1.03, transition: { duration: 0.3 } },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                >
                  
                  <div className="h-full overflow-hidden rounded-lg">
                    <Link
                      href={event.ticketLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        width={400}
                        height={200}
                        loading="lazy"
                        className="event-image object-cover transition-all duration-500"
                      />
                    </Link>
                  </div>
                </motion.div>
                <div className="md:col-span-7 flex flex-col">
                  <div className="space-y-6">
                    <motion.h1 className="font-radikal text-2xl mt-8 md:text-4xl lg:text-4xl md:mb-10"
                      variants={{
                        hidden: { opacity: 0, y: -20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.5, delay: 0.1 },
                        },
                      }}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    > 
                      {event.title} 
                    </motion.h1>
                    
                    <motion.div
                      className="space-y-4 text-lg md:text-xl"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.5, delay: 0.4 },
                        },
                      }}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center">
                        <Calendar className="h-6 w-6 mr-3 text-gray-600" />
                        <span className="font-radikal font-normal">{formatDate(event.startDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-6 w-6 mr-3 text-gray-600" />
                        <span className="font-radikal">
                          {event.venue}, {event.address}
                        </span>
                      </div>
                    </motion.div>
                    <motion.p
                      className="mb-8 font-radikal font-light leading-relaxed text-base md:text-lg lg:text-xl text-gray-700"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.5, delay: 0.4 },
                        },
                      }}
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
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <Link
                          href={event.ticketLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-radikal inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 border-2 rounded-full text-base md:text-lg text-black hover:bg-[#2E8B57] hover:text-white transition-all duration-200 min-w-[120px] md:min-w-[140px]"
                        >
                          Tickets
                        </Link>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <Link
                          href={generateCalendarLink(event)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-radikal inline-flex items-center justify-center px-4 py-3 md:px-6 md:py-4 rounded-lg text-sm md:text-base text-gray-600 hover:text-gray-800 transition-all duration-200"
                        >
                          <CalendarPlus className="h-4 w-4 mr-2" />
                          Add to Calendar
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
            <div className="pb-24 md:pb-16" 
           style={{ paddingBottom: "calc(6rem + env(safe-area-inset-bottom))" }} />
    </div>
  )
}