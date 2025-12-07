"use client";

import dynamic from "next/dynamic";

// Lazy load SubscribePopup to reduce initial bundle size
const SubscribePopup = dynamic(() => import("@/components/SubscribePopup"), { 
  ssr: false,
  loading: () => null 
});

export default function LazySubscribePopup() {
  return <SubscribePopup />;
}