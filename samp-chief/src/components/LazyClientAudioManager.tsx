"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { useEffect,useRef, useState } from "react";

import { createAudioFadeController } from '@/lib/audioUtils';

interface ClientAudioManagerProps {
  children: React.ReactNode;
}

export default function LazyClientAudioManager({ children }: ClientAudioManagerProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const audioController = createAudioFadeController();

  // Set video ref when component mounts
  useEffect(() => {
    if (isHomePage) {
      const timer = setTimeout(() => {
        const video = document.querySelector('video[src="/assets/videos/sample.mp4"]') as HTMLVideoElement;
        videoRef.current = video;
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isHomePage]);

  // Navigation audio fade
  useEffect(() => {
    if (!isHomePage && videoRef.current && !isMuted) {
      audioController.fadeAudioOnNavigate(videoRef.current);
    }
  }, [pathname]);

  const toggleMute = () => {
    if (!videoRef.current) {
      setIsMuted(!isMuted);
      return;
    }
    
    audioController.toggleMute(videoRef.current, isMuted, setIsMuted);
  };

  return (
    <>
      {children}

      {/* Persistent Floating Audio Button - Only on Home Page */}
      {isHomePage && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={toggleMute}
            disabled={audioController.isTransitioning}
            className="flex items-center gap-2 px-4 py-3
                     hover:bg-black hover:bg-opacity-40 transition-all duration-300 
                     text-white text-sm font-medium shadow-lg cursor-pointer rounded-full
                     disabled:opacity-50"
            aria-label={isMuted ? "Turn sound on" : "Turn sound off"}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              {isMuted ? (
                <>
                  <path d="M11 5 6 9H2v6h4l5 4V5z"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </>
              ) : (
                <>
                  <path d="M11 5 6 9H2v6h4l5 4V5z"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </>
              )}
            </svg>
            <span className="hidden sm:inline">
              {isMuted ? "Sound On" : "Sound Off"}
            </span>
          </button>
        </div>
      )}
    </>
  );
}
