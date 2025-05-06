"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Instagram, XTwitter, Tiktok, Linkedin } from "../icons";
import SoundCloudPlayer from "./SoundCloudPlayer";
import { cn } from "@/lib/utils";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isEvent = pathname === "/events";
  const isNewsletter = pathname === "/newsletter";

  return (
    <footer
      className={cn(
        isHome
          ? "inset-x-0 top-0 z-30 bg-transparent text-white/75"
          : isAbout || isEvent || isNewsletter
          ? "bg-black opacity-80 text-white"
          : "bg-white text-black",
        // mobile: py-1; md+: py-2
        "py-1 md:py-2"
      )}
    >
     <div className="flex items-end justify-center md:justify-between w-full px-4 pt-4 md:pt-6 pb-4">
      <div className="w-1/3 hidden md:block pl-0">
          <SoundCloudPlayer
            url="https://soundcloud.com/samplechief/sample-chief-selekta-w-haruna?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
            visual={false}
            height={100}
            color="#176B2F"
            hideRelated={true}
          />
        </div>
        <div className="flex items-center space-x-6 self-center">
          <Link href="https://www.instagram.com/samplechief/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="h-6 w-6" />
          </Link>
          <Link href="https://x.com/SampleChief" target="_blank" rel="noopener noreferrer" aria-label="X">
            <XTwitter className="h-6 w-6" />
          </Link>
          <Link href="https://www.linkedin.com/company/sample-chief" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link href="https://www.tiktok.com/@samplechief" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <Tiktok className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
