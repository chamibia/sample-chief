"use client";

import Link from "next/link";
import Image from 'next/image';
import { Instagram, XTwitter, Tiktok, Linkedin } from "../icons";
import crown from '../../../public/assets/crown.webp';

export default function Footer() {
  return (
    <footer className="w-full bg-[#000000] z-10">
      <div className="mx-auto flex flex-col sm:flex-row max-w-screen-xl items-center justify-between px-4 py-3">
        <Link href="/" className="mb-4 sm:mb-0">
          <Image
            src={crown}
            alt="Sample Chief Logo"
            width={120}
            height={40}
            className="object-contain p-2"
          />
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            href="https://www.instagram.com/samplechief/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="h-6 w-6 text-[#176B2F]"/>
          </Link>
          <Link
            href="https://x.com/SampleChief"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            <XTwitter className="h-6 w-6 text-[#176B2F]" />
          </Link>
          <Link
            href="https://www.linkedin.com/company/sample-chief"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6 text-[#176B2F]" />
          </Link>
          <Link
            href="https://www.tiktok.com/@samplechief"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <Tiktok className="h-6 w-6 text-[#176B2F]" />
          </Link>
        </div>
      </div>
    </footer>
  );
}