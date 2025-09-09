"use client";

import { useState, useRef } from "react";

export default function VideoHeroSection() {
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const toggleMute = () => {
    if (!videoRef.current || isTransitioning) return;
    
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
    <section className="relative w-full h-[100vh] bg-black" id="hero-section">
      <video
        ref={videoRef}
        src="/videos/sample.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      >
        <div className="text-center text-white px-4 max-w-4xl">
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto mb-6">
            This is where culture happens
          </p>
        </div>
      </div>
    </section>
  );
}