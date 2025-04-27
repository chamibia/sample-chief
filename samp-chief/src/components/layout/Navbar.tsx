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

  return (
    <header
      className={cn(
        isHome
          ? "fixed inset-x-0 top-0 z-30 bg-transparent text-white/75"
          : "sticky bg-white text-black",
        "py-3"
      )}
    >
      <div className="relative mx-auto px-6">

        {/* mobile menu button */}
        <button
          className={cn(
            "md:hidden absolute left-4 top-1/2 transform -translate-y-1/2 p-2",
            isHome ? "text-white/75" : "text-black"
          )}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen
            ? <X className="h-6 w-6" />
            : <Menu className="h-6 w-6" />}
        </button>

        {/* logo */}
        <Link href="/" className="flex justify-center">
          <Image
            src={crown}
            alt="Sample Chief Logo"
            width={70}
            height={100}
            className={cn(isHome ? "opacity-75" : "opacity-100")}
          />
        </Link>

        {/* desktop nav on the left */}
        <nav className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 space-x-8 font-haas">
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
                        isHome
                          ? "text-white/75 hover:text-white"
                          : "text-black hover:text-gray-700"
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
      </div>

      {/* mobile dropdown */}
      {isMenuOpen && (
        <div
          className={cn(
            "md:hidden py-4",
            isHome ? "bg-transparent" : "bg-white"
          )}
        >
          <nav className="flex flex-col items-center space-y-2 font-haas">
            {["ABOUT", "EVENTS", "CONTACT"].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase()}`}
                className={cn(
                  "block w-full py-2 px-4 text-center uppercase text-lg",
                  "transition-colors duration-150 ease-out hover:text-gray-500",
                  isHome ? "text-white/75 hover:text-white" : "text-black"
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