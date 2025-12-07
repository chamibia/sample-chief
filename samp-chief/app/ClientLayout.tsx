// app/ClientLayout.tsx (Client Component)
"use client";

import { useEffect } from "react";

import ScrollToTop from "@/components/ScrollToTop";
import { optimizeBfcache } from "@/lib/bfcache";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Viewport height fix for mobile
  useEffect(() => {
    function setViewportHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    // Set initial value
    setViewportHeight();

    // Update on resize
    const handleResize = () => {
      setViewportHeight();
    };

    // Update on orientation change (mobile)
    const handleOrientationChange = () => {
      // Delay to let mobile browser UI settle
      setTimeout(setViewportHeight, 100);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);
    
    // Initialize bfcache optimization
    optimizeBfcache();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        minHeight: "calc(var(--vh, 1vh) * 100)",
      }}
    >
      {children}
      <ScrollToTop />
    </div>
  );
}
