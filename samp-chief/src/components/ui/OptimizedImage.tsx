"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

type ImageVariant = 'project-card' | 'product-card' | 'hero-background' | 'gallery-item';

interface OptimizedImageProps {
  src: string;
  alt: string;
  variant: ImageVariant;
  href?: string; // For linking images
  priority?: boolean;
  overlay?: ReactNode; // Custom overlay content
  aspectRatio?: string; // CSS aspect ratio
  className?: string;
  containerClassName?: string;
  sizes?: string;
  quality?: number;
}

const variantConfigs = {
  'project-card': {
    aspectRatio: 'aspect-[4/3]',
    containerClass: 'relative overflow-hidden rounded-lg bg-gray-100 group',
    imageClass: 'object-cover transition-transform duration-700 group-hover:scale-110',
    defaultOverlay: (
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    ),
    defaultSizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  },
  'product-card': {
    aspectRatio: 'aspect-square',
    containerClass: 'relative mb-6 group mx-auto w-[82%] overflow-hidden',
    imageClass: 'object-contain transition-transform duration-500 ease-in-out group-hover:scale-110',
    defaultOverlay: null,
    defaultSizes: '(min-width:1280px) 18vw, (min-width:1024px) 24vw, (min-width:640px) 40vw, 80vw'
  },
  'hero-background': {
    aspectRatio: '',
    containerClass: 'relative w-full h-full',
    imageClass: 'object-cover',
    defaultOverlay: null,
    defaultSizes: '100vw'
  },
  'gallery-item': {
    aspectRatio: 'aspect-square',
    containerClass: 'relative overflow-hidden rounded group cursor-pointer',
    imageClass: 'object-cover transition-all duration-300 group-hover:brightness-75',
    defaultOverlay: null,
    defaultSizes: '(max-width: 768px) 50vw, 33vw'
  }
};

export default function OptimizedImage({
  src,
  alt,
  variant,
  href,
  priority = false,
  overlay,
  aspectRatio,
  className = '',
  containerClassName = '',
  sizes,
  quality = 75,
}: OptimizedImageProps) {
  const config = variantConfigs[variant];
  const finalAspectRatio = aspectRatio || config.aspectRatio;
  const finalSizes = sizes || config.defaultSizes;

  const imageElement = (
    <div className={`${finalAspectRatio} ${config.containerClass} ${containerClassName}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={priority ? 75 : quality}
        sizes={finalSizes}
        className={`${config.imageClass} ${className}`}
      />
      {overlay || config.defaultOverlay}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block" aria-label={alt}>
        {imageElement}
      </Link>
    );
  }

  return imageElement;
}

// Specialized components for common use cases
export function ProjectCardImage({
  src,
  alt,
  href,
  isFirstProject = false,
  title,
}: {
  src: string;
  alt: string;
  href: string;
  isFirstProject?: boolean;
  title?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      variant="project-card"
      href={href}
      priority={isFirstProject}
      quality={isFirstProject ? 75 : 50}
      sizes={isFirstProject 
        ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        : "(max-width: 768px) 100vw, 33vw"
      }
      overlay={
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {title && (
            <div className="absolute bottom-4 left-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
              <p className="text-sm font-light">View Project</p>
            </div>
          )}
        </>
      }
    />
  );
}

export function ProductCardImage({
  src,
  alt,
  href,
  priority = false,
}: {
  src: string;
  alt: string;
  href: string;
  priority?: boolean;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      variant="product-card"
      href={href}
      priority={priority}
      overlay={
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      }
    />
  );
}

export function HeroBackgroundImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      variant="hero-background"
      priority={true}
      quality={85}
      className={className}
    />
  );
}