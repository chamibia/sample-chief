"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from "react";

export default function About() {
  const [showBanner, setShowBanner] = useState(true);

  // Split the text into headline and paragraphs
  const headline = "Sample Chief is a global community that celebrates African music culture.";
  const paragraph1 = "We're based in London, Toronto, Montreal and Lagos (Nigeria). Our mission is to promote music discovery by creating interactive experiences for a global audience, through media and events. We connect brands to a vibrant youth audience that is interested in digital content and music experiences.";
  const paragraph2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere.";

  useEffect(() => {
    const onScroll = () => {
      setShowBanner(window.scrollY < 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const partners = [
    { id: 1, logo: "/assets/ace.png" },
    { id: 2, logo: "/assets/holts.png" },
    { id: 3, logo: "/assets/okay.png" },
    { id: 4, logo: "/assets/sony.png" },
    { id: 5, logo: "/assets/standard.jpg" },
    { id: 6, logo: "/assets/sway.png" },
    { id: 7, logo: "/assets/universal.png" },
  ];

  // For word animation:
  const textContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.03 } },
  };
  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  const paragraphContainer = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: 0.02,
        delayChildren: 0.5 // Delay paragraph animation until after headline
      } 
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }
  
  const logoContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  }
  
  const logoItem = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <div className="min-h-screen bg-[#ff6139] font-serif">
      {/* ABOUT Banner */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: showBanner ? 1 : 0,
          height: showBanner ? "auto" : "0px",
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden bg-[#ff6139] font-jost rounded-b-3xl"
      >
        <div className="w-full lg:w-4/5 mx-auto py-14 px-6">
          <div className='pb-10'>
            <h2 className="uppercase font-light leading-none text-[3rem] md:text-[6rem] text-gray-800">
              ABOUT
            </h2>
          </div>
        </div>
      </motion.div>

      <div className="w-full lg:w-4/5 mx-auto px-6 text-gray-800">
        {/* Headline - larger text */}
        <motion.div
          className="text-[1.5rem] md:text-[3rem] leading-[1.1] mb-8"
          variants={textContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {headline.split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* First paragraph */}
        <motion.div
          className="text-[1rem] md:text-[1.75rem] leading-[1.3] mt-4"
          variants={paragraphContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {paragraph1.split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
        
        {/* Second paragraph - Lorem ipsum */}
        <motion.div
          className="text-[1rem] md:text-[1.75rem] leading-[1.3] mt-8"
          variants={paragraphContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {paragraph2.split(" ").map((word, i) => (
            <motion.span
              key={i + 1000} 
              variants={wordVariants}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <div className="mt-16 px-6">
        <motion.div
          className="
            flex flex-col            
            md:flex-row md:flex-nowrap  
            items-center justify-center 
            space-y-6 md:space-y-0 md:space-x-16  
            py-6 overflow-x-auto
          "
          variants={logoContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {partners.map((p) => (
            <motion.div
              key={p.id}
              variants={logoItem}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <Image
                src={p.logo}
                alt=""
                width={120}
                height={80}
                className="max-h-16 max-w-[120px] object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="pb-30 md:pb-45"></div>
    </div>
  );
}