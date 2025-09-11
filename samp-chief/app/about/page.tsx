"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const logoContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
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
];


export default function About() {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowBanner(window.scrollY < 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  
  const headline = [
    "From Toronto to London to Montreal, our mission is to promote music discovery and knowledge. We do this by creating interactive experiences for a global audience, through immersive media and unforgettable events. Our purpose is to educate and entertain.",
  ];
  const paragraphs = [
    "At the heart of it, we bridge brands and audiences that seek captivating experiences beyond the algorithm.",
  ];

  return (
    <>
      {/* Header, paragraph, button */}
      <motion.div
        className="font-ruder font-light text-[2rem] md:text-[3.5rem] lg:text-[4rem] pb-6 md:pb-8"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
      >
        <div className="font-ruder font-medium text-[#202020] leading-tight text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]">
          SAMPLE CHIEF is more than an agency<br />
          <span className="block mt-2">We are a global movement dedicated to celebrating African music and culture</span>
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {headline.map((p, idx) => (
          <motion.p
            key={idx}
            variants={sectionVariants}
            className="font-sans font-light mb-8 text-[#202020] text-lg md:text-xl lg:text-2xl leading-loose tracking-wider"
          >
            {p}
          </motion.p>
        ))}
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
            className="font-sans font-light mb-8 text-[#202020] text-lg md:text-xl lg:text-2xl leading-loose tracking-wider"
          >
            {p}
          </motion.p>
        ))}
        {/* Contact Button */}
        <motion.div
          variants={sectionVariants}
          className="flex justify-center md:justify-start mt-20"
        >
          <Link
            href="/contact"
            className="font-sans font-light leading-relaxed text-base bg-transparent border-2 border-gray-800 hover:bg-[#202020] hover:border-[#202020] hover:text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center px-6 py-3 text-[#202020]"
          >
            Collab With Us
          </Link>
        </motion.div>
      </motion.div>

      {/* Logo section */}
      <div className="mt-16">
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
      <div
        className="pb-24 md:pb-16"
        style={{ paddingBottom: "calc(6rem + env(safe-area-inset-bottom))" }}
      />
    </>
  );
}
