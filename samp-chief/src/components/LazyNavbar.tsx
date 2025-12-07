"use client";

import dynamic from "next/dynamic";

// Lazy load Navbar to reduce initial bundle size  
const Navbar = dynamic(() => import("./layout/Navbar"), {
  ssr: false,
  loading: () => <div className="h-16" /> // Placeholder to prevent layout shift
});

export default function LazyNavbar() {
  return <Navbar />;
}