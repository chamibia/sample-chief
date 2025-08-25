"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/assets/logo.png";
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

  const backgroundColor = isHome
    ? "bg-transparent"
    : isAbout
    ? "bg-[#07693A]"
    : isEvents
    ? "bg-[#DA232A]"
    : isContact
    ? "bg-[#07693A]"
    : isMusic
    ? "bg-[#F8C722]"
    : isShop
    ? "bg-[#F07416]"
    : "bg-white";

  const textColor = isHome && !isScrolled ? "text-white" : "text-gray-800";

  const headerClasses = `
    sticky top-0 z-50 transition-all duration-300 ease-in-out 
    ${backgroundColor} ${textColor} 
    ${isScrolled ? "py-2 shadow-sm" : isHome ? "py-4" : "py-6 md:py-8"} 
    rounded-b-2xl
  `;

  const links = ["ABOUT", "EVENTS", "MUSIC", "SHOP", "CONTACT"];

  return (
    <header className={headerClasses}>
      <div className="relative flex mx-auto px-6">
        {/* Mobile menu toggle */}
        <button
          className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 p-2"
          onClick={() => setIsMenuOpen((o) => !o)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="transition-transform hover:scale-105 hover:-rotate-12"
        >
          <Image
            src={logo}
            alt="Sample Chief Logo"
            width={isScrolled ? 240 : 200}
            height={isScrolled ? 140 : 160}
            className="transition-all duration-300 ease-in-out"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-8">
              {links.map((label) => {
                const path = `/${label.toLowerCase()}`;
                const isActive = pathname === path;

                return (
                  <NavigationMenuItem key={label}>
                    <Link href={path} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`${navigationMenuTriggerStyle()} font-radikal font-bold text-[1.1rem] transition-all duration-200 ease-out transform hover:scale-105 ${
                          isHome && !isScrolled
                            ? "text-white"
                            : "text-[#202020]"
                        } ${
                          isActive
                            ? "underline underline-offset-4 decoration-2"
                            : ""
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

        {/* Mobile nav dropdown - positioned absolutely within header */}
        {isMenuOpen && (
          <div
            className={`md:hidden absolute top-full left-0 right-0 z-50 ${backgroundColor} rounded-b-2xl overflow-hidden`}
          >
            <nav className="flex flex-col items-center space-y-3 px-6 py-3">
              {links.map((label) => {
                const path = `/${label.toLowerCase()}`;
                const isActive = pathname === path;

                return (
                  <Link
                    key={label}
                    href={path}
                    className="block w-full text-center font-bold text-sm md:text-base uppercase py-1 px-3 transition duration-150 rounded-lg text-white hover:text-gray-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                );
              })}

              {/* Mobile Cart Link */}
              <Link
                href="/shop/cart"
                className="block w-full text-center font-bold text-sm md:text-base uppercase py-1 px-3 transition duration-150 rounded-lg text-white hover:text-gray-300 flex items-center justify-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>CART</span>
                {cart.totalQuantity > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cart.totalQuantity}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
