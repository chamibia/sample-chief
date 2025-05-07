"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from "react";
import { radikalLight } from ".././layout";
import clsx from "clsx";

export default function About() {
  const [showBanner, setShowBanner] = useState(true);

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
        delayChildren: 0.5 
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
    <div>
      <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: showBanner ? 1 : 0,
        height: showBanner ? "auto" : "0px",
      }}
      transition={{ duration: 0.3 }}
      style={{
        background: "linear-gradient(to right, #ff6139 0%, #ff7e5f 50%, #ff9a85 100%)",
        borderBottom: "3px solid black",
        borderBottomLeftRadius: "1.5rem",
        borderBottomRightRadius: "1.5rem"
      }}
      className="overflow-hidden"
    >
      <div className="w-full mx-auto py-8 px-4 md:py-14 md:px-6">
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
            ABOUT
          </h2>
        </div>
      </div>
    </motion.div>
      <div className="w-full lg:w-4/5 mx-auto px-4 md:px-6 text-gray-800 pt-20 md:pt-40">       
       <motion.div
          className="text-2xl md:text-[5rem] leading-[1.2] mb-4 md:mb-8"
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

        <motion.div
          className="text-[1rem] md:text-[1.5rem] leading-[1.3] mt-4"
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
        
        <motion.div
          className="text-[1rem] md:text-[1.5rem] leading-[1.3] mt-8"
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
      md:flex-row
      items-center justify-center 
      space-y-6 md:space-y-0 md:space-x-16  
      py-6 w-full
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
<div className="pb-30 md:pb-30"></div>
    </div>
  );
}