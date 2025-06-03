"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/assets/logo.png";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isEvents = pathname === "/events";
  const isContact = pathname === "/contact";

  const basePosition = "sticky inset-x-0 top-0 z-30 py-3";
  const headerClasses = `${basePosition} ${
    isHome
      ? "bg-transparent text-white/75"
      : isAbout
      ? "bg-[#ff6139] text-gray-800"
      : isEvents
      ? "bg-[#ffdd80] text-gray-800"
      : isContact
      ? "bg-[#dcf7cf] text-gray-800"
      : "bg-white text-gray-800"
  }`;

  const mobileBg = isHome
    ? "bg-transparent"
    : isAbout
    ? "bg-[#ff6139]"
    : isEvents
    ? "bg-[#ffdd80]"
    : isContact
    ? "bg-[#dcf7cf]"
    : "bg-white";

  const links = ["ABOUT", "EVENTS", "CONTACT"];

  return (
    <header className={headerClasses}>
      <div className={`relative mx-auto px-6 ${isHome ? "bg-transparent" : ""}`}>
        <button
          className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 p-2"
          onClick={() => setIsMenuOpen((o) => !o)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src={logo}
              alt="Sample Chief Logo"
              width={200}
              height={200}
              className={`${
                isHome ? "opacity-90" : "opacity-95"
              } transform transition-transform duration-200 ease-out hover:scale-105 hover:-rotate-12`}
            />
          </Link>
        </div>
        <nav className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2">
          <NavigationMenu className={isHome ? "bg-transparent" : ""}>
            <NavigationMenuList
              className={`flex space-x-4 ${isHome ? "bg-transparent" : ""}`}>
              {links.map((label) => {
                const path = `/${label.toLowerCase()}`;
                const isActive = pathname === path;

                return (
                  <NavigationMenuItem key={label}>
                    <Link href={path} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`${
                          navigationMenuTriggerStyle()
                        } font-radikal font-bold text-lg transition-all duration-200 ease-out transform hover:scale-105 ${
                          isHome
                            ? "text-white/75 hover:text-white bg-transparent"
                            : isActive
                            ? "text-white"
                            : "text-gray-800"
                        }`}
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
      {isMenuOpen && (
        <div className={`md:hidden absolute inset-x-0 top-full z-40 py-4 ${mobileBg}`}>
          <nav className="flex flex-col items-center space-y-2 uppercase font-radikal text-lg font-bold">
            {links.map((label) => {
              const path = `/${label.toLowerCase()}`;
              const isActive = pathname === path;

              return (
                <Link
                  key={label}
                  href={path}
                  className={`block w-full py-2 px-4 text-center transition-colors duration-150 ease-out ${
                    isHome ? "text-white/75 hover:text-white" : "text-gray-800 hover:text-gray-600 font-radikal font-bold text-lg"
                  } ${isActive ? "underline" : ""}`}
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
