'use client';
import Link from 'next/link';

export default function AboutLink() {
  return (
    <Link href="/about" scroll={true} passHref legacyBehavior>
      <img 
        src="/assets/logo-white.png" 
        alt="Sample Chief Logo"
        className="w-12 h-12 md:w-16 md:h-16 transition-transform duration-300 hover:scale-110 cursor-pointer"
      />
    </Link>
  );
}