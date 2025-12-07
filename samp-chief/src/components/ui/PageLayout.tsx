import { Metadata } from "next";
import { ReactNode } from "react";

type LayoutVariant = 'special' | 'standard' | 'provider' | 'project';

interface PageLayoutProps {
  children: ReactNode;
  variant?: LayoutVariant;
  provider?: ReactNode; // For wrapping with providers like CartProvider
  className?: string;
  containerClassName?: string;
}

const layoutStyles: Record<LayoutVariant, { main: string; container: string }> = {
  special: {
    main: "flex-1 w-full pt-20 text-[#202020]",
    container: "max-w-7xl mx-auto px-6"
  },
  standard: {
    main: "flex-1 w-full text-[#202020]", 
    container: ""
  },
  provider: {
    main: "",
    container: ""
  },
  project: {
    main: "flex-1 w-full text-[#202020]",
    container: ""
  }
};

export default function PageLayout({ 
  children, 
  variant = 'standard',
  provider,
  className = "",
  containerClassName = ""
}: PageLayoutProps) {
  const styles = layoutStyles[variant];
  
  const content = variant === 'provider' ? (
    provider ? (
      typeof provider === 'function' ? (
        (provider as any)({ children })
      ) : (
        children
      )
    ) : children
  ) : (
    <main className={`${styles.main} ${className}`}>
      {styles.container ? (
        <div className={`${styles.container} ${containerClassName}`}>
          {children}
        </div>
      ) : (
        children
      )}
    </main>
  );

  return <>{content}</>;
}

// Helper function to create metadata with consistent structure
interface CreateMetadataOptions {
  title: string;
  description: string;
  images?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt: string;
  }>;
  type?: "website" | "article" | "book" | "profile" | "music.song" | "music.album" | "music.playlist" | "music.radio_station" | "video.movie" | "video.episode" | "video.tv_show" | "video.other";
}

export function createPageMetadata({
  title,
  description,
  images = [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: title }],
  type = "website"
}: CreateMetadataOptions): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map(img => img.url),
    },
  };
}