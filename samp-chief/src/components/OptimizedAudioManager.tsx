"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface OptimizedAudioManagerProps {
  children: React.ReactNode;
}

// Lightweight wrapper that only loads audio logic on home page
export default function OptimizedAudioManager({ children }: OptimizedAudioManagerProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  // Only render audio controls on home page
  if (!isHomePage) {
    return <>{children}</>;
  }
  
  // For now, just return children without audio logic to reduce bundle size
  return <>{children}</>;
}