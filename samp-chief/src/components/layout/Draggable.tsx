"use client";
import { useState, useEffect, useRef } from 'react';
import SoundCloudPlayer from './SoundCloudPlayer';

export default function DraggableSoundCloudPlayer() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const playerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true); // Default to true to avoid flash on first render

  useEffect(() => {
    setIsMounted(true);
    
    // Check if we're on desktop
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768); // Standard breakpoint for tablets/mobile
    };
    
    // Set initial position
    if (typeof window !== 'undefined') {
      checkIsDesktop();
      setPosition({
        x: window.innerWidth * 0.75 - 150,
        y: window.innerHeight / 2 - 83
      });
    }
    
    // Update on resize
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: position.x + e.clientX - dragStart.x,
          y: position.y + e.clientY - dragStart.y
        });
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, position, isMounted]);

  // Don't render anything on mobile
  if (!isMounted || !isDesktop) return null;

  return (
    <div
      ref={playerRef}
      className="fixed z-50 bg-black bg-opacity-90 rounded-lg shadow-lg p-2 w-[400px] hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      <div
        className="handle h-4 bg-[#176B2F] rounded-t-lg mb-2 flex items-center justify-center"
        onMouseDown={(e) => {
          setIsDragging(true);
          setDragStart({ x: e.clientX, y: e.clientY });
        }}
      >
        <div className="w-10 h-1 bg-white rounded-full"></div>
      </div>
      
      <SoundCloudPlayer
        url="https://soundcloud.com/samplechief/sample-chief-selekta-w-haruna?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
        visual={false}
        height={100}
        color="#176B2F"
        hideRelated={true}
      />
    </div>
  );
}