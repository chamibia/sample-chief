"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Add a small delay to ensure the page has fully loaded
    const timer = setTimeout(() => {
      window.scrollTo({ 
        top: 0, 
        left: 0, 
        behavior: "auto" 
      });
      // Also try scrolling document root and body (for some browsers)
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}