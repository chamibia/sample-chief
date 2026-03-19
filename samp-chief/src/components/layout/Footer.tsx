import Link from "next/link";
import Image from "next/image";
import { 
  FaInstagram, 
  FaLinkedinIn, 
  FaSoundcloud, 
  FaSpotify, 
  FaTiktok, 
  FaTwitter, 
  FaYoutube} from "react-icons/fa";
import { SiSubstack } from "react-icons/si";

import { cn } from "@/lib/utils";

export default function Footer({ pathname }: { pathname: string }) {
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
      <div className="flex flex-col md:relative justify-center items-center w-full px-4 pt-6 md:pt-2 pb-2 min-h-[80px]">
        <div className="order-1 md:absolute md:left-0 md:pl-8 font-ruder font-medium text-sm text-center md:text-left flex flex-col lg:flex-row items-center lg:items-center space-y-2 lg:space-y-0 lg:space-x-4">
          <Image
            src={pathname.startsWith('/projects/') || (pathname.startsWith('/shop/') && pathname !== '/shop/cart') ? "/assets/logos/L_OC_BI_RGB.png" : "/assets/logos/L_OC_BI_RGB_KO.png"}
            alt="Ontario Creates"
            width={120}
            height={33}
            className="h-8 w-auto"
            style={{ width: 'auto', height: 'auto' }}
          />
          <span>
            Supported by Ontario Creates
          </span>
        </div>
        <div className="order-2 flex items-center justify-center space-x-6 md:mx-auto">
          <Link
            href="https://www.instagram.com/samplechief/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transform transition-all duration-300 hover:scale-125 hover:text-[#E1306C] hover:opacity-100"
          >
            <FaInstagram size={24} />
          </Link>
          <Link
            href="https://x.com/SampleChief"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (formerly Twitter)"
            className="transform transition-all duration-300 hover:scale-125 hover:text-[#1DA1F2] hover:opacity-100"
          >
            <FaTwitter size={24} />
          </Link>
          <Link
            href="https://www.linkedin.com/company/sample-chief"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transform transition-all duration-300 hover:scale-125 hover:text-[#0077B5] hover:opacity-100"
          >
            <FaLinkedinIn size={24} />
          </Link>
          <Link
            href="https://www.tiktok.com/@samplechief"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="transform transition-all duration-300 hover:scale-125 hover:text-[#FF0050] hover:opacity-100"
          >
            <FaTiktok size={24} />
          </Link>
          <Link
            href="https://soundcloud.com/samplechief"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SoundCloud"
            className="transform transition-all duration-300 hover:scale-125 hover:text-[#FF5500] hover:opacity-100"
          >
            <FaSoundcloud size={24} />
          </Link>
          <Link
            href="https://www.youtube.com/channel/UC2HjhV9Dv-_n1PXGw2P4SXg?app=desktop"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="transform transition-all duration-300 hover:scale-125 hover:text-[#FF0000] hover:opacity-100"
          >
            <FaYoutube size={24} />
          </Link>
          <Link
            href="https://open.spotify.com/user/x3zc0sdr8mdvs4b7uzqxqdnnf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spotify"
            className="transform transition-all duration-300 hover:scale-125 hover:text-[#1DB954] hover:opacity-100"
          >
            <FaSpotify size={24} />
          </Link>
          <Link
            href="https://samplechief.substack.com/?utm_campaign=profile_chips"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Substack"
            className="transform transition-all duration-300 hover:scale-125 hover:text-[#FF6719] hover:opacity-100"
          >
            <SiSubstack size={24} />
          </Link>
        </div>

      </div>
    </footer>
  );
}
