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
    // `relative` gives the home page's `position: absolute` nav (Navbar.tsx)
    // an in-flow containing block instead of the viewport, so its width
    // resolves the same way the `sticky` nav on every other page does
    // (excluding the scrollbar track). Removing this reintroduces a
    // nav-padding/scrollbar mismatch specific to the home page. Any other
    // `absolute`-positioned element in the app now resolves against this
    // div too unless it has its own closer positioned ancestor.
    <div
      className="relative min-h-screen flex flex-col"
      style={{
        minHeight: "calc(var(--vh, 1vh) * 100)",
      }}
    >
      {children}
      <ScrollToTop />
    </div>
  );
}
