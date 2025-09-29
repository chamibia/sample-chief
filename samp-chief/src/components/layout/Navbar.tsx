"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/assets/logos/logo.png";
import whiteLogo from "../../../public/assets/logos/white-logo.png";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isEvents = pathname === "/events";
  const isMusic = pathname === "/music";
  const isContact = pathname === "/contact";
  const isShop = pathname === "/shop";
  const isProjects = pathname === "/projects";


  // Detect mobile using a media query (client-side only)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // On home page and mobile, keep transparent until menu is open, then white bg/black text
  const backgroundColor = isHome && isMobile && isMenuOpen
    ? "bg-white"
    : isHome
    ? "bg-transparent"
    : isAbout
    ? "bg-[#F8C722]"
    : isEvents
    ? "bg-[#F8C722]"
    : isContact
    ? "bg-[#F8C722]"
    : isMusic
    ? "bg-[#F8C722]"
    : isShop
    ? "bg-[#F8C722]"
    : isProjects
    ? "bg-[#F8C722]"
    : "bg-white";

  const textColor = isHome && !isScrolled && (!isMobile || (isMobile && !isMenuOpen)) ? "text-white" : "text-gray-800";

  const headerClasses = `
    ${
      isHome ? "absolute top-0 left-0 right-0" : "sticky top-0"
    } z-50 transition-all duration-300 ease-in-out 
    ${backgroundColor} ${textColor} 
    ${isScrolled ? "py-2 shadow-sm" : isHome ? "py-4" : "py-6 md:py-8"}
    border-none rounded-none
  `;

  const links = ["ABOUT", "PROJECTS", "EVENTS", "MUSIC", "SHOP", "CONTACT"];

  // Choose logo based on page and scroll state
  const currentLogo = isHome && !isScrolled && (!isMobile || (isMobile && !isMenuOpen)) ? whiteLogo : logo;

  // Determine mobile dropdown text color
  const mobileDropdownTextColor = backgroundColor === "bg-white" ? "text-[#202020] hover:text-gray-700" : "text-white hover:text-gray-300";

  return (
    <header className={headerClasses}>
      <div className="relative flex items-center justify-between mx-auto px-4 md:px-6 w-full">
        {/* Logo */}
        <Link
          href="/"
          className="transition-transform hover:scale-105 hover:-rotate-12 z-10"
        >
          <Image
            src={currentLogo}
            alt="Sample Chief Logo"
            width={isScrolled ? 180 : 160}
            height={isScrolled ? 120 : 140}
            className="transition-all duration-300 ease-in-out md:w-auto w-32"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-6">
              {links.map((label) => {
                const path = `/${label.toLowerCase()}`;
                const isActive = pathname === path;

                return (
                  <NavigationMenuItem key={label}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={path}
                        className={`group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-lg font-ruder font-bold transition-all duration-200 ease-out transform hover:scale-105 ${
                          isHome && !isScrolled
                            ? "text-white hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-white"
                            : "text-[#202020] hover:text-[#202020] hover:underline hover:underline-offset-4 hover:decoration-2"
                        } ${
                          isActive
                            ? isHome && !isScrolled
                              ? "underline underline-offset-4 decoration-2 decoration-white"
                              : "underline underline-offset-4 decoration-2"
                            : ""
                        }`}
                      >
                        {label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Cart Icon */}
          <Link href="/shop/cart" className="relative">
            <ShoppingCart
              className={`h-6 w-6 transition-colors ${
                isHome && !isScrolled ? "text-white" : "text-[#202020]"
              }`}
            />
            {cart.totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cart.totalQuantity}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 z-10"
          onClick={() => setIsMenuOpen((o) => !o)}
        >
          {isMenuOpen ? (
            <X
              className={`h-6 w-6 ${
                isHome && isMobile && isMenuOpen
                  ? "text-[#202020]"
                  : isHome && !isScrolled
                  ? "text-white"
                  : "text-[#202020]"
              }`}
            />
          ) : (
            <Menu
              className={`h-6 w-6 ${
                isHome && !isScrolled ? "text-white" : "text-[#202020]"
              }`}
            />
          )}
        </button>

        {/* Mobile nav dropdown - positioned absolutely within header */}
        {isMenuOpen && (
          <div
            className={`md:hidden absolute top-full left-0 right-0 z-50 ${backgroundColor} overflow-hidden border-none rounded-none`}
          >
            <nav className="flex flex-col items-start space-y-3 px-6 py-3">
              {links.map((label) => {
                const path = `/${label.toLowerCase()}`;
                const isActive = pathname === path;

                return (
                  <Link
                    key={label}
                    href={path}
                    className={`block w-full text-left font-ruder font-bold text-lg md:text-xl uppercase py-2 px-3 transition duration-150 rounded-lg ${mobileDropdownTextColor} ${isActive ? "underline underline-offset-4 decoration-2" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                );
              })}

              {/* Mobile Cart Link */}
              <Link
                href="/shop/cart"
                className={`block w-full text-left font-ruder font-bold text-lg md:text-xl uppercase py-2 px-3 transition duration-150 rounded-lg ${mobileDropdownTextColor}`}
                onClick={() => setIsMenuOpen(false)}
              >
                CART {cart.totalQuantity > 0 && `(${cart.totalQuantity})`}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
