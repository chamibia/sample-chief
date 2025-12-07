"use client";

import {useRef, useState } from "react";

import { createAudioFadeController } from '@/lib/audioUtils';

export default function LazyVideoHero() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioController = createAudioFadeController();

  // Keep this component as-is since it has custom audio controls
  // that are specific to the hero video functionality

  return (
    <section className="relative w-full h-[100vh] bg-black" id="hero-section">
      <video
        ref={videoRef}
        src="/assets/videos/sample.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      >
        <div className="text-center text-white px-4 max-w-4xl">
          <p className="text-xl md:text-2xl font-ruder italic -skew-x-4 max-w-2xl mx-auto mb-6">
            This is where culture happens
          </p>
        </div>
      </div>
    </section>
  );
}
