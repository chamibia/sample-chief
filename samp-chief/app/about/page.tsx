"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const logoContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  },
};

const logoItem = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const partners = [
  { id: 1, logo: "/assets/ace.png", name: "Ace" },
  { id: 2, logo: "/assets/holts.png", name: "Holts" },
  { id: 3, logo: "/assets/okay.png", name: "Okay" },
  { id: 4, logo: "/assets/sony.png", name: "Sony" },
  { id: 5, logo: "/assets/standard.jpg", name: "Standard" },
  { id: 6, logo: "/assets/sway.png", name: "Sway" },
  { id: 7, logo: "/assets/universal_logo.svg", name: "Universal" },
]

export default function About() {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowBanner(window.scrollY < 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const headline = "SAMPLE CHIEF is a global community that celebrates African music culture.";
  const paragraphs = [
    "From Toronto to Montreal, London to Lagos — our rhythm is global and on the move.",
    "We're on a mission to spark music discovery through immersive, unexpected, and genre-bending experiences — both digital and live. We create moments where sound tells a story.",
    "We bridge brands and bold youth audiences — those who crave beats, connection, and something beyond the algorithm"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div
       className={`overflow-hidden bg-[#ff6139] rounded-b-2xl transition-all duration-300 ${
        showBanner ? "h-auto" : "h-0"
      }`}
      >
        <div className="w-full mx-auto py-8 px-4 md:py-14 md:px-6" />
      </div>

      <div className="flex-1 w-full px-5 md:px-9 text-gray-800 pt-20">
        <motion.div
          className="font-radikal font-normal text-[1.8rem] md:text-[3.0rem] leading-[1.2] mb-4 md:mb-8 pb-4 md:pb-12 lg:w-4/5"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
        >
          <span className="font-radikal font-bold italic text-gray-700">
            SAMPLE CHIEF
          </span>{" "}
          <span className="font-radikal font-light text-gray-700 leading-relaxed">
            is a global community that celebrates African music culture.
          </span>
        </motion.div>
        <motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  {paragraphs.map((p, idx) => (
    <motion.p
      key={idx}
      variants={sectionVariants}
      className="font-radikal font-light mb-8 leading-relaxed text-base md:text-lg lg:text-xl text-gray-700"
    >
      {p}
    </motion.p>
  ))}
</motion.div>
      </div>
      <div className="mt-16 px-6">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-16 py-6 w-full"
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
                alt={`${p.name} logo`}
                width={120}
                height={80}
                className="max-h-16 max-w-[120px] object-contain hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Fixed bottom spacing for mobile */}
      <div className="pb-24 md:pb-16" 
           style={{ paddingBottom: "calc(6rem + env(safe-area-inset-bottom))" }} />
    </div>
  )
}