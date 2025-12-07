"use client";

import { ReactNode,useEffect, useRef, useState } from 'react';

type MediaType = 'video' | 'image' | 'component';

interface LazyMediaProps {
  type: MediaType;
  src?: string; // For video/image
  children?: ReactNode; // For component
  className?: string;
  style?: React.CSSProperties;
  
  // Video specific
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  
  // Image specific  
  alt?: string;
  priority?: boolean;
  
  // Lazy loading options
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
  
  // Callbacks
  onLoad?: () => void;
  onError?: () => void;
  onIntersect?: (isIntersecting: boolean) => void;
}

export default function LazyMedia({
  type,
  src,
  children,
  className = '',
  style,
  
  // Video props
  autoPlay = false,
  loop = false,
  muted = false,
  controls = false,
  playsInline = true,
  preload = 'none',
  
  // Image props
  alt = '',
  priority = false,
  
  // Lazy loading config
  rootMargin = '50px',
  threshold = 0.1,
  triggerOnce = true,
  
  // Callbacks
  onLoad,
  onError,
  onIntersect,
}: LazyMediaProps) {
  const elementRef = useRef<HTMLVideoElement | HTMLImageElement | HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || priority) {
      if (priority) setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const intersecting = entry.isIntersecting;
          setIsIntersecting(intersecting);
          onIntersect?.(intersecting);

          if (intersecting && type === 'video' && src) {
            const videoEl = entry.target as HTMLVideoElement;
            if (!isLoaded) {
              videoEl.load();
              setIsLoaded(true);
            }
            if (triggerOnce) {
              observer.unobserve(videoEl);
            }
          }

          if (intersecting && type === 'image' && src) {
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { 
        rootMargin,
        threshold
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [type, src, priority, rootMargin, threshold, triggerOnce, isLoaded, onIntersect]);

  // Render based on type
  if (type === 'video' && src) {
    return (
      <video
        ref={elementRef as React.RefObject<HTMLVideoElement>}
        className={`w-full h-full object-cover ${className}`}
        style={style}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        controls={controls}
        preload={preload}
        onLoad={onLoad}
        onError={onError}
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  }

  if (type === 'image' && src) {
    return (
      <img
        ref={elementRef as React.RefObject<HTMLImageElement>}
        src={isIntersecting || priority ? src : ''}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        style={style}
        onLoad={onLoad}
        onError={onError}
      />
    );
  }

  if (type === 'component') {
    return (
      <div
        ref={elementRef as React.RefObject<HTMLDivElement>}
        className={className}
        style={style}
      >
        {isIntersecting || priority ? children : null}
      </div>
    );
  }

  return null;
}

// Specialized components for common patterns
export function LazyVideo({
  src,
  className = '',
  style,
  fitClass = 'object-cover',
  positionClass = 'object-center',
  ...props
}: {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  fitClass?: string;
  positionClass?: string;
} & Omit<LazyMediaProps, 'type' | 'src'>) {
  return (
    <LazyMedia
      type="video"
      src={src}
      className={`${fitClass} ${positionClass} ${className}`}
      style={style}
      loop={true}
      muted={true}
      playsInline={true}
      preload="none"
      controls={false}
      {...props}
    />
  );
}

export function LazyVideoHero({
  src,
  className = '',
  autoPlay = true,
  muted = true,
  ...props
}: {
  src: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
} & Omit<LazyMediaProps, 'type' | 'src'>) {
  return (
    <LazyMedia
      type="video"
      src={src}
      className={`absolute inset-0 w-full h-full object-cover z-0 ${className}`}
      autoPlay={autoPlay}
      loop={true}
      muted={muted}
      playsInline={true}
      preload="metadata"
      priority={true}
      {...props}
    />
  );
}

export function LazyComponent({
  children,
  className = '',
  ...props
}: {
  children: ReactNode;
  className?: string;
} & Omit<LazyMediaProps, 'type' | 'children'>) {
  return (
    <LazyMedia
      type="component"
      className={className}
      {...props}
    >
      {children}
    </LazyMedia>
  );
}