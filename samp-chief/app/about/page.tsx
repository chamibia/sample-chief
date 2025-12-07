"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const partners = [
  { id: 1, logo: "/assets/brands/ace.png", name: "Ace" },
  { id: 2, logo: "/assets/brands/holts.png", name: "Holts" },
  { id: 3, logo: "/assets/brands/okay.png", name: "Okay" },
  { id: 4, logo: "/assets/brands/sony.png", name: "Sony" },
  { id: 5, logo: "/assets/brands/standard.jpg", name: "Standard" },
  { id: 6, logo: "/assets/brands/sway.png", name: "Sway" },
  { id: 7, logo: "/assets/brands/universal_logo.svg", name: "Universal" },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
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
      <div className={`font-ruder font-light text-[2rem] md:text-[3.5rem] lg:text-[4rem] pb-6 md:pb-8 transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="font-ruder font-medium text-[#202020] leading-tight text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]">
          SAMPLE CHIEF is more than an agency<br />
          <span className="block mt-2">We are a global movement dedicated to celebrating African music and culture</span>
        </div>
      </div>

      <div className={`transform transition-all duration-700 ease-out delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {headline.map((p, idx) => (
          <p
            key={idx}
            className="font-sans font-light mb-8 text-[#202020] text-lg md:text-xl lg:text-2xl leading-loose tracking-wider"
          >
            {p}
          </p>
        ))}
      </div>

      <div className={`transform transition-all duration-700 ease-out delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {paragraphs.map((p, idx) => (
          <p
            key={idx}
            className="font-sans font-light mb-8 text-[#202020] text-lg md:text-xl lg:text-2xl leading-loose tracking-wider"
          >
            {p}
          </p>
        ))}
        
        {/* Projects and Contact Buttons */}
        <div className="flex flex-col md:flex-row justify-center md:justify-start mt-20 gap-4 md:gap-6">
          <Link
            href="/projects"
            className="font-sans font-light leading-relaxed text-base bg-transparent border-2 border-gray-800 hover:bg-[#202020] hover:border-[#202020] hover:text-white rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center px-6 py-3 text-[#202020]"
            style={{ minWidth: '180px' }}
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="font-sans font-light leading-relaxed text-base bg-transparent border-2 border-gray-800 hover:bg-[#202020] hover:border-[#202020] hover:text-white rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center px-6 py-3 text-[#202020]"
            style={{ minWidth: '180px' }}
          >
            Collab With Us
          </Link>
        </div>
      </div>

      {/* Logo section */}
      <div className={`mt-16 transform transition-all duration-700 ease-out delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-16 py-6 w-full">
          {partners.map((p, idx) => (
            <div
              key={p.id}
              className={`flex-shrink-0 flex items-center justify-center hover:scale-110 transition-all duration-300 ease-out hover:-translate-y-1 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: `${600 + idx * 100}ms` }}
            >
              <Image
                src={p.logo}
                alt={`${p.name} logo`}
                width={120}
                height={80}
                className="max-h-16 max-w-[120px] object-contain transition-all duration-300"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fixed bottom spacing for mobile */}
      <div
        className="pb-24 md:pb-16"
        style={{ paddingBottom: "calc(6rem + env(safe-area-inset-bottom))" }}
      />
    </>
  );
}