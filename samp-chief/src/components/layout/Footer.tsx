"use client";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Dynamically import react-icons on the client only to avoid server-side
// vendor-chunk references in dev (prevents server trying to require
// ./vendor-chunks/react-icons.js).
const SiInstagram = dynamic(() => import("react-icons/si").then((m) => m.SiInstagram), { ssr: false });
const SiX = dynamic(() => import("react-icons/si").then((m) => m.SiX), { ssr: false });
const SiLinkedin = dynamic(() => import("react-icons/si").then((m) => m.SiLinkedin), { ssr: false });
const SiTiktok = dynamic(() => import("react-icons/si").then((m) => m.SiTiktok), { ssr: false });
const SiSoundcloud = dynamic(() => import("react-icons/si").then((m) => m.SiSoundcloud), { ssr: false });
const SiYoutube = dynamic(() => import("react-icons/si").then((m) => m.SiYoutube), { ssr: false });
const SiSpotify = dynamic(() => import("react-icons/si").then((m) => m.SiSpotify), { ssr: false });

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isEvent = pathname === "/events";
  const isMusic = pathname === "/music";
  const isNewsletter = pathname === "/contact";
  const isShop = pathname === "/shop";
  const isProjects = pathname === "/projects";

  return (
    <footer
      className={cn(
        isHome
          ? "relative mt-auto w-full bg-transparent text-white/75 sm:absolute sm:inset-x-0 sm:bottom-0 sm:z-30"
          : isAbout || isEvent || isMusic || isNewsletter || isShop || isProjects
          ? "bg-black text-white"
          : "bg-white text-black",
          // Add consistent padding and safe area support for mobile
          "px-2 py-4 md:py-6 pb-safe border-none border-t-0 shadow-none rounded-none !border-0"
      )}
      style={{
        // Ensure footer is always visible on mobile
        paddingBottom: isHome
          ? undefined
          : "calc(1rem + env(safe-area-inset-bottom))",
      }}
    >
      <div className="flex flex-col md:relative items-center w-full px-4 pt-4 pb-2">
        <div className="order-2 md:order-1 font-ruder font-bold mt-4 md:mt-0 text-sm mb-2 md:mb-0 text-center md:text-left md:absolute md:left-0 md:pl-8">
          Supported by Ontario Creates
        </div>
        <div className="order-1 md:order-2 flex items-center justify-center space-x-6 md:mx-auto">
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
            className="transform transition-all duration-300 hover:scale-125 hover:text-[#1DB954] hover:opacity-100"
          >
            <SiSpotify className="h-6 w-6" />
          </Link>
        </div>

      </div>
    </footer>
  );
}
