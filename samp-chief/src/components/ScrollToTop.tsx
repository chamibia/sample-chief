"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't fight an anchor link (e.g. /contact#careers) that's trying to
    // scroll to a specific section on load.
    if (window.location.hash) return;

    // Add a small delay to ensure the page has fully loaded
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });
      // Also try scrolling document root and body (for some browsers)
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}