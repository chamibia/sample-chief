"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SiInstagram,
  SiX,
  SiLinkedin,
  SiTiktok,
  SiSoundcloud,
  SiYoutube,
  SiSpotify,
} from "react-icons/si";
import { cn } from "@/lib/utils";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isEvent = pathname === "/events";
  const isNewsletter = pathname === "/contact";

  return (
    <footer
      className={cn(
        isHome
          ? "absolute inset-x-0 bottom-0 z-30 bg-transparent text-white/75"
          : isAbout || isEvent || isNewsletter
            ? "bg-black text-white"
            : "bg-white text-black",
        "px-2 py-0 md:py-0"
      )}
    >
      <div className="flex flex-col md:relative items-center justify-center w-full px-4 pt-4 pb-2">
        <div className="flex items-center space-x-6">
          <Link
            href="https://www.instagram.com/samplechief/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transform transition-all duration-300 hover:scale-125 hover:text-[#E1306C] hover:opacity-100"
          >
            <SiInstagram className="h-6 w-6" />
          </Link>
          <Link
            href="https://x.com/SampleChief"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (formerly Twitter)"
            className="transform transition-all duration-300 hover:scale-125 hover:text-[#1DA1F2] hover:opacity-100"
          >
            <SiX className="h-6 w-6" />
          </Link>
          <Link
            href="https://www.linkedin.com/company/sample-chief"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transform transition-all duration-300 hover:scale-125 hover:text-[#0077B5] hover:opacity-100"
          >
            <SiLinkedin className="h-6 w-6" />
          </Link>
          <Link
            href="https://www.tiktok.com/@samplechief"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="transform transition-all duration-300 hover:scale-125 hover:text-[#FF0050] hover:opacity-100"
          >
            <SiTiktok className="h-6 w-6" />
          </Link>
          <Link
            href="https://soundcloud.com/samplechief"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SoundCloud"
            className="transform transition-all duration-300 hover:scale-125 hover:text-[#FF5500] hover:opacity-100"
          >
            <SiSoundcloud className="h-6 w-6" />
          </Link>
          <Link
            href="https://www.youtube.com/channel/UC2HjhV9Dv-_n1PXGw2P4SXg?app=desktop"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="transform transition-all duration-300 hover:scale-125 hover:text-[#FF0000] hover:opacity-100"
          >
            <SiYoutube className="h-6 w-6" />
          </Link>
          <Link
            href="https://open.spotify.com/user/x3zc0sdr8mdvs4b7uzqxqdnnf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spotify"
            className="transform transition-all duration-300 hover:scale-125 hover:text-[#1DB954] hover:opacity-100">
            <SiSpotify className="h-6 w-6" />
          </Link>
        </div>
        <div className="font-radikal font-bold mt-4 md:mt-0 md:absolute md:right-4 text-xs">
          Supported by Ontario Creates
        </div>
      </div>
    </footer>
  );
}
