"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import logo from "../../../public/assets/logo.png"
import { Menu, X } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isHome = pathname === "/"
  const isAbout = pathname === "/about"
  const isEvents = pathname === "/events"
  const isMusic = pathname === "/music"
  const isContact = pathname === "/contact"

  const backgroundColor = isHome
    ? "bg-transparent"
    : isAbout
      ? "bg-[#ff6139]"
      : isEvents
        ? "bg-[#ffdd80]"
        : isContact
          ? "bg-[#dcf7cf]"
          : isMusic
            ? "bg-[#dcf7cf]"
            : "bg-white";

  const textColor = isHome && !isScrolled ? "text-white" : "text-gray-800";

  const headerClasses = `
    sticky top-0 z-50 transition-all duration-300 ease-in-out 
    ${backgroundColor} ${textColor} 
    ${isScrolled ? "py-2 shadow-sm" : isHome ? "py-4" : "py-6 md:py-8"} 
    rounded-b-2xl
  `;

  const links = ["ABOUT", "EVENTS", "MUSIC", "CONTACT"];

  return (
  <header className={headerClasses}>
    <div className="relative flex items-center justify-center mx-auto px-6">
      {/* Mobile menu toggle */}
      <button
        className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 p-2"
        onClick={() => setIsMenuOpen((o) => !o)}
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Logo */}
      <Link href="/" className="transition-transform hover:scale-105 hover:-rotate-12">
        <Image
          src={logo}
          alt="Sample Chief Logo"
          width={isScrolled ? 120 : 160}
          height={isScrolled ? 120 : 160}
          className="transition-all duration-300 ease-in-out"
        />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6">
            {links.map((label) => {
              const path = `/${label.toLowerCase()}`;
              const isActive = pathname === path;

              return (
                <NavigationMenuItem key={label}>
                  <Link href={path} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} font-radikal font-bold text-[1rem] transition-all duration-200 ease-out transform hover:scale-105 ${
                        isHome && !isScrolled ? "text-white" : isActive ? "text-white" : "text-gray-800"
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

      {/* Mobile nav dropdown - positioned absolutely within header */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 z-50">
          <nav className="flex flex-col items-center space-y-3 px-6 py-3">
            {links.map((label) => {
              const path = `/${label.toLowerCase()}`;
              const isActive = pathname === path;

              return (
                <Link
                  key={label}
                  href={path}
                  className="block w-full text-center font-radikal font-bold text-base uppercase py-2 px-4 transition duration-150 rounded text-white hover:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  </header>
);
}
