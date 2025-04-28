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
  
  return (
    <header
    className={cn(
      isHome
        ? "fixed inset-x-0 top-0 z-30 bg-transparent text-white/75"
        : isAbout
          ? "sticky inset-x-0 top-0 z-30 bg-[#ff6139] text-gray-800"
          : "sticky inset-x-0 top-0 z-30 bg-white text-gray-800",
      "py-3"
    )}
    >
      <div className="relative mx-auto px-6">
          <button
          className={cn(
            "md:hidden absolute left-4 top-1/2 transform -translate-y-1/2 p-2",
            isHome ? "text-white/75" : "text-gray-800"
          )}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen
            ? <X className="h-6 w-6" />
            : <Menu className="h-6 w-6" />}
        </button>
                <Link href="/" className="flex justify-center md:justify-center">
          <Image
            src={crown}
            alt="Sample Chief Logo"
            width={70}
            height={100}
            className={cn(isHome ? "opacity-75" : "opacity-100")}
          />
        </Link>
        
        {isAbout ? (
          <div className="hidden md:flex absolute w-full top-1/2 transform -translate-y-1/2 font-haas">
            <div className="absolute right-4">
              <NavigationMenu>
                <NavigationMenuList className="flex space-x-4">
                  {["ABOUT", "EVENTS", "CONTACT"].map((label) => (
                    <NavigationMenuItem key={label}>
                      <Link href={`/${label.toLowerCase()}`} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "text-lg",
                            "transition-transform duration-200 ease-out transform hover:scale-105",
                            "text-gray-800 hover:text-gray-700",
                            label === "ABOUT" && "font-medium"
                          )}
                        >
                          {label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        ) : (
          <nav className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 space-x-8 font-haas">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-4">
                {["CONTACT", "EVENTS", "ABOUT"].map((label) => (
                  <NavigationMenuItem key={label}>
                    <Link href={`/${label.toLowerCase()}`} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "text-lg",
                          "transition-transform duration-200 ease-out transform hover:scale-105",
                          isHome
                            ? "text-white/75 hover:text-white"
                            : "text-gray-800 hover:text-gray-700"
                        )}
                      >
                        {label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        )}
      </div>
      
      {/* mobile dropdown */}
      {isMenuOpen && (
        <div
          className={cn(
            "md:hidden py-4",
            isHome 
              ? "bg-black/80 backdrop-blur-sm" 
              : isAbout 
                ? "bg-[#ff6139]" 
                : "bg-white"
          )}
        >
          <nav className="flex flex-col items-center space-y-2 font-haas">
            {["ABOUT", "EVENTS", "CONTACT"].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase()}`}
                className={cn(
                  "block w-full py-2 px-4 text-center uppercase text-lg",
                  "transition-colors duration-150 ease-out",
                  isHome 
                    ? "text-white/75 hover:text-white" 
                    : isAbout
                      ? "text-gray-800 hover:text-gray-900" 
                      : "text-black hover:text-gray-700",
                  isAbout && label === "ABOUT" && "font-medium"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}