"use client";

import { usePathname } from "next/navigation";

import Footer from "@/components/layout/Footer";

export default function FooterVisibilityWrapper() {
  const pathname = usePathname();
  // Hide Footer on mobile if on home page
  if (pathname === "/") {
    return <div className="hidden sm:block"><Footer pathname={pathname} /></div>;
  }
  return <Footer pathname={pathname} />;
}
