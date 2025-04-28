"use client";
import { useState, useEffect, useRef, ReactNode } from "react";
import Footer from "@/components/layout/Footer"; 

export default function ScrollWrapper({ children }: { children: ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const mainEl = mainRef.current;
    const sentinelEl = sentinelRef.current;
    if (!mainEl || !sentinelEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
      
        setShowFooter(entry.isIntersecting)
      },
      {
        root: mainEl,       
        threshold: 0,        
      }
    );

    observer.observe(sentinelEl);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <main
        ref={mainRef}
        className="flex-1 min-h-0 overflow-y-auto"
      >
        {children}

        <div ref={sentinelRef} className="w-full h-px" />
      </main>

      <div
        className={`
          fixed inset-x-0 bottom-0
          transition-opacity duration-300
          ${showFooter
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }
        `}
      >
        <Footer />
      </div>
    </>
  );
}
