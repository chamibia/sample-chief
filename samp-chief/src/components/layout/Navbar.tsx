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
            <NavigationMenuList className="flex items-center space-x-4">
              <NavigationMenuItem>
                <Link href="/events" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "brush-nav-link text-lg"
                    )}
                  >
                    <span className="brush-text">Events</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "brush-nav-link text-lg"
                    )}
                  >
                    <span className="brush-text">About</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "brush-nav-link text-lg"
                    )}
                  >
                    <span className="brush-text">Contact</span>
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
              href="/events"
              className="block w-full py-2 px-4 text-center text-lg uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="brush-text-mobile">Events</span>
            </Link>
            <Link 
              href="/about"
              className="block w-full py-2 px-4 text-center text-lg uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="brush-text-mobile">About</span>
            </Link>
            <Link 
              href="/contact"
              className="block w-full py-2 px-4 text-center text-lg uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="brush-text-mobile">Contact</span>
            </Link>
          </nav>
        </div>
      )}

      {/* CSS for brushstroke text effect */}
      <style jsx global>{`
        /* Import brush font */
        @import url('https://fonts.cdnfonts.com/css/magic-brush');
        
        /* Base styles for navigation links */
        .brush-nav-link {
          position: relative;
          padding: 0.5rem 1rem;
          transition: all 0.3s ease;
        }
        
        /* Brushstroke text effect for desktop */
        .brush-text {
          position: relative;
          font-family: 'Magic Brush', sans-serif;
          font-size: 1.5rem;
          font-weight: normal;
          background: #006636; /* Same green as logo */
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          transition: all 0.3s ease;
          display: inline-block;
        }
        
        /* Clip path animation on hover */
        .brush-nav-link:hover .brush-text {
          background: linear-gradient(45deg, #006636, #2E8B57);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: reveal-brush 0.5s forwards;
        }
        
        /* Mobile brushstroke text */
        .brush-text-mobile {
          font-family: 'Magic Brush', sans-serif;
          font-size: 1.8rem;
          background: #006636;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          transition: all 0.3s ease;
          display: inline-block;
        }
        
        /* Hover effect for mobile */
        .brush-text-mobile:hover {
          background: linear-gradient(45deg, #006636, #2E8B57);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: reveal-brush 0.5s forwards;
        }
        
        /* Keyframe animation for the brushstroke reveal */
        @keyframes reveal-brush {
          0% {
            -webkit-clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
            clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
          }
          100% {
            -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
        }
        
        /* Fallback for browsers that don't support the font */
        @supports not (font-family: 'Magic Brush') {
          .brush-text, .brush-text-mobile {
            font-family: 'Comic Sans MS', cursive, sans-serif;
            font-weight: bold;
          }
        }
      `}</style>
    </header>
  );
}