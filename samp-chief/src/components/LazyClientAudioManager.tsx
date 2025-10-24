"use client";

import React from "react";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

interface ClientAudioManagerProps {
  children: React.ReactNode;
}

export default function LazyClientAudioManager({ children }: ClientAudioManagerProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

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
      fadeAudioOnNavigate();
    }
  }, [pathname]);

  const fadeAudio = (targetVolume: number, duration = 800) => {
    if (!videoRef.current) return;
    
    setIsTransitioning(true);
    const video = videoRef.current;
    const startVolume = video.volume;
    const volumeStep = (targetVolume - startVolume) / (duration / 16);
    
    const fade = () => {
      if (!videoRef.current) return;
      
      const newVolume = videoRef.current.volume + volumeStep;
      
      if (
        (volumeStep > 0 && newVolume >= targetVolume) || 
        (volumeStep < 0 && newVolume <= targetVolume)
      ) {
        videoRef.current.volume = targetVolume;
        setIsTransitioning(false);
        return;
      }
      
      videoRef.current.volume = newVolume;
      requestAnimationFrame(fade);
    };
    
    requestAnimationFrame(fade);
  };

  const fadeAudioOnNavigate = () => {
    if (!videoRef.current) return;
    fadeAudio(0, 400);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }, 400);
  };

  const toggleMute = () => {
    if (isTransitioning) return;
    
    if (!videoRef.current) {
      setIsMuted(!isMuted);
      return;
    }
    
    const video = videoRef.current;
    
    if (isMuted) {
      video.muted = false;
      video.volume = 0;
      fadeAudio(0.7, 800);
      setIsMuted(false);
    } else {
      fadeAudio(0, 600);
      setTimeout(() => {
        if (videoRef.current) videoRef.current.muted = true;
        setIsMuted(true);
      }, 600);
    }
  };

  return (
    <>
      {children}

      {/* Persistent Floating Audio Button - Only on Home Page */}
      {isHomePage && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={toggleMute}
            disabled={isTransitioning}
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
