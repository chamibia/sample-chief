"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import crown from '../../../public/assets/crown.webp';
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isEvents = pathname === "/events";

  // Shared positioning + z-index
  const basePosition = "sticky inset-x-0 top-0 z-30 py-3";

  // Determine header background + text
  const headerClasses = cn(
    basePosition,
    isHome
      ? "bg-transparent text-white/75"
      : isAbout
      ? "bg-[#ff6139] text-gray-800"
      : isEvents
      ? "bg-[#ffdd80] text-gray-800"
      : "bg-white text-gray-800"
  );

  // Determine mobile dropdown background
  const mobileBg = isHome
    ? "bg-black/80 backdrop-blur-sm"
    : isAbout
    ? "bg-[#ff6139]"
    : isEvents
    ? "bg-[#ffdd80]"
    : "bg-white";

  return (
    <header className={headerClasses}>
      <div className="relative mx-auto px-6">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden absolute left-4 top-1/2 transform -translate-y-1/2 p-2"
          onClick={() => setIsMenuOpen((o) => !o)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src={crown}
              alt="Sample Chief Logo"
              width={70}
              height={100}
              className={cn(isHome ? "opacity-75" : "opacity-100")}
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex absolute right-6 top-1/2 transform -translate-y-1/2 font-haas">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
              {["ABOUT", "EVENTS", "NEWSLETTER"].map((label) => {
                const path = `/${label.toLowerCase()}`;
                const isActive = pathname === path;
                return (
                  <NavigationMenuItem key={label}>
                    <Link href={path} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "text-lg transition-transform duration-200 ease-out transform hover:scale-105",
                          isHome
                            ? "text-white/75 hover:text-white"
                            : "text-gray-800 hover:text-gray-700",
                          isActive && "font-medium"
                        )}
                      >
                        {label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className={cn("md:hidden py-4", mobileBg)}>
          <nav className="flex flex-col items-center space-y-2 font-haas">
            {["ABOUT", "EVENTS", "NEWSLETTER"].map((label) => {
              const path = `/${label.toLowerCase()}`;
              const isActive = pathname === path;
              return (
                <Link
                  key={label}
                  href={path}
                  className={cn(
                    "block w-full py-2 px-4 text-center uppercase text-lg transition-colors duration-150 ease-out",
                    isHome
                      ? "text-white/75 hover:text-white"
                      : "text-gray-800 hover:text-gray-900",
                    isActive && "font-medium"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}