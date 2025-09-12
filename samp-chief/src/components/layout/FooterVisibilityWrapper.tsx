"use client";

import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";

export default function FooterVisibilityWrapper() {
  const pathname = usePathname();
  // Hide Footer on mobile if on home page
  if (pathname === "/") {
    return <div className="hidden sm:block"><Footer /></div>;
  }
  return <Footer />;
}
