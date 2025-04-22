"use client";
import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import sample_chief from '../../../public/assets/sample_chief.webp';
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

  return (
    <header>
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center">
          <Image 
            src={sample_chief} 
            alt='Sample Chief Logo' 
            width={300} 
            height={300}
            className='object-contain'
          />
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-8">
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={
                      cn(
                        navigationMenuTriggerStyle(),
                        "text-lg font-medium hover:text-[#2E8B57]"
                      )
                    }
                  >
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link href="/events" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={
                      cn(
                        navigationMenuTriggerStyle(),
                        "text-lg font-medium hover:text-[#2E8B57]"
                      )
                    }
                  >
                    Events
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={
                      cn(
                        navigationMenuTriggerStyle(),
                        "text-lg font-medium hover:text-[#2E8B57]"
                      )
                    }
                  >
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <nav className="flex flex-col items-center py-4">
            <Link 
              href="/about"
              className="block w-full py-2 px-4 text-center text-lg font-medium uppercase hover:bg-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/events"
              className="block w-full py-2 px-4 text-center text-lg font-medium uppercase hover:bg-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              href="/contact"
              className="block w-full py-2 px-4 text-center text-lg font-medium uppercase hover:bg-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}