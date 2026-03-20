"use client";

import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

import { Card, CardContent } from './card';
import { ProductCardImage } from './OptimizedImage';
import { getProjectCardOptimization, BLUR_PLACEHOLDER } from '@/lib/imageOptimization';

type CardVariant = 'project' | 'product' | 'event' | 'content' | 'music';

interface BaseCardProps {
  variant: CardVariant;
  title: string;
  description?: string;
  subtitle?: string;
  image?: string | {
    src: string;
    alt: string;
    priority?: boolean;
  };
  href?: string;
  price?: {
    amount: string;
    currencyCode: string;
  };
  badge?: string;
  actions?: ReactNode;
  footer?: ReactNode;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

// Props for specific card types
interface ProjectCardProps extends BaseCardProps {
  variant: 'project';
  event: any;
  isLCP?: boolean;
  isLarge?: boolean;
  forceHover?: boolean;
}

interface ProductCardProps extends BaseCardProps {
  variant: 'product';
  node: any;
}

interface MusicCardProps extends BaseCardProps {
  variant: 'music';
  title: string;
  subtitle?: string;
  image: string;
  href: string;
  priority?: boolean;
}

interface EventCardProps extends BaseCardProps {
  variant: 'event';
}

interface ContentCardProps extends BaseCardProps {
  variant: 'content';
}

type UnifiedCardProps = ProjectCardProps | ProductCardProps | MusicCardProps | EventCardProps | ContentCardProps;

const variantStyles = {
  project: {
    container: "group block relative overflow-hidden rounded-lg bg-gray-100",
    content: "p-6",
    title: "text-xl font-semibold mb-2",
    description: "text-gray-600 line-clamp-3"
  },
  product: {
    container: "relative flex flex-col",
    content: "px-2 text-left",
    title: "font-sans font-bold text-[15px] leading-6 tracking-[0.06em] uppercase text-black group-hover:underline [text-shadow:0.5px_0_0_currentColor]",
    description: "mt-1 italic text-[15px] leading-6 text-black/80 font-sans"
  },
  music: {
    container: "group block rounded-lg overflow-hidden",
    content: "",
    title: "font-sans font-bold text-white text-lg",
    description: "font-sans text-white text-sm pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  },
  event: {
    container: "overflow-hidden hover:shadow-lg transition-shadow duration-300",
    content: "p-6",
    title: "text-2xl font-bold mb-4",
    description: "text-gray-700 mb-6"
  },
  content: {
    container: "h-full",
    content: "p-6",
    title: "text-lg font-semibold mb-3",
    description: "text-gray-600"
  }
};

export default function UnifiedCard(props: UnifiedCardProps) {
  const { variant, title, className = '' } = props;
  const styles = variantStyles[variant];

  // Handle music variant
  if (variant === 'music') {
    const { subtitle, image, href, priority } = props as MusicCardProps;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.container}
      >
        <Card className="bg-transparent border-0 cursor-pointer">
          <CardContent className="p-0">
            <div className="aspect-square relative">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
                loading={priority ? "eager" : "lazy"}
                priority={priority}
              />
              <div className="absolute inset-0 bg-neutral-700/30 group-hover:opacity-0 transition-opacity duration-500 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-20" />

              <div className="absolute top-4 left-4 z-30">
                <h3 className={styles.title}>
                  {title}
                </h3>
              </div>
              <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink className="w-5 h-5 text-white" aria-label="Opens external link" />
              </div>
              <div className="absolute bottom-4 left-4 z-30">
                <p className={styles.description}>
                  {subtitle}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </a>
    );
  }

  // Handle product variant
  if (variant === 'product') {
    const { node } = props as ProductCardProps;
    
    const img = node.images?.edges?.[0]?.node;
    const subtitle = node?.description ? node.description.split(/[.\n]/)[0]?.trim() : "";

    return (
      <div className={`${styles.container} ${className}`}>
        {img ? (
          <ProductCardImage
            src={img.url}
            alt={img.altText || node.title}
            href={`/shop/${node.handle}`}
            priority={false}
          />
        ) : (
          <div className="relative mb-6 aspect-square mx-auto w-[82%]">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 border border-gray-200 rounded">
              No Image
            </div>
          </div>
        )}

        <div className={styles.content}>
          <Link href={`/shop/${node.handle}`} aria-label={node.title} className="block group">
            <h3 className={styles.title}>
              {node.title}
            </h3>
            {subtitle && (
              <p className={styles.description}>
                {subtitle}
              </p>
            )}
            {node.variants?.edges?.[0]?.node?.price && (
              <p className="mt-2 font-sans font-medium text-[15px] text-black">
                <span className="font-sans">$</span>
                {Number(node.variants.edges[0].node.price.amount).toFixed(2)}
              </p>
            )}
          </Link>
        </div>
      </div>
    );
  }

  // Handle project variant
  if (variant === 'project') {
    const { event, isLCP, isLarge, forceHover } = props as ProjectCardProps;
    const { sizes: imageSizes, quality: imageQuality } = getProjectCardOptimization(isLCP ?? false, isLarge ?? false);
    
    return (
      <Link
        href={`/projects/${event.slug}`}
        data-project-card={event.slug}
        className={`${styles.container} ${className} group h-full project-card`}
      >
        <div className="relative w-full h-full">
          <Image
            src={event.projectcard}
            alt={event.title}
            fill
            sizes={imageSizes}
            className="object-cover object-center"
            quality={imageQuality}
            priority={isLCP}
            loading={isLCP ? "eager" : "lazy"}
            fetchPriority={isLCP ? "high" : "auto"}
            placeholder="empty"
            unoptimized={false}
          />
          
          <div className={`absolute inset-0 w-full h-full z-20 flex flex-col items-start justify-start p-3 md:p-4 opacity-100 md:opacity-0 transition-opacity duration-150 ${forceHover ? 'md:opacity-100' : 'md:group-hover:opacity-100'}`}>
            <h1 className="font-ruder font-medium text-white leading-tight text-lg md:text-2xl lg:text-3xl pl-2 md:pl-3">
              {event.title}
            </h1>
          </div>
          
          <div className={`absolute inset-0 w-full h-full bg-black/60 transition-opacity duration-150 z-10 ${forceHover ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
        </div>
      </Link>
    );
  }

  // Fallback for other variants (event, content)
  return <div>Card variant {variant} not implemented</div>;
}

// Specialized card components for common patterns
export function ProjectCard({
  event,
  className = '',
  isLCP = false,
  isLarge = false,
  forceHover = false,
}: {
  event: any;
  className?: string;
  isLCP?: boolean;
  isLarge?: boolean;
  forceHover?: boolean;
}) {
  return (
    <UnifiedCard
      variant="project"
      title={event.title}
      event={event}
      className={className}
      isLCP={isLCP}
      isLarge={isLarge}
      forceHover={forceHover}
    />
  );
}

export function ProductCard({
  node,
  className = '',
}: {
  node: any;
  className?: string;
}) {
  return (
    <UnifiedCard
      variant="product"
      title={node.title}
      node={node}
      className={className}
    />
  );
}

export function EventCard({
  title,
  description,
  _image,
  _href,
  _badge,
  _footer,
  className = '',
}: {
  title: string;
  description: string;
  _image?: { src: string; alt: string; priority?: boolean };
  _href?: string;
  _badge?: string;
  _footer?: ReactNode;
  className?: string;
}) {
  return (
    <UnifiedCard
      variant="event"
      title={title}
      description={description}
      className={className}
    />
  );
}