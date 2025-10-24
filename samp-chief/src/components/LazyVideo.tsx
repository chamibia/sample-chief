"use client";

import { useEffect, useRef } from 'react';

interface LazyVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  fitClass?: string;
  positionClass?: string;
}

export default function LazyVideo({ src, className = '', style, fitClass = 'object-cover', positionClass = 'object-center' }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Load video when it enters viewport
            video.load();
            observer.unobserve(video);
          }
        });
      },
      { 
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={`w-full h-full ${fitClass} ${positionClass} ${className}`}
      style={style}
      loop
      muted
      playsInline
      preload="none"
      controls={false}
      autoPlay
    >
      <source src={src} />
      Your browser does not support the video tag.
    </video>
  );
}