import { Metadata } from "next";

import SpecialPageLayout from "../../src/components/layout/SpecialPageLayout";

export const metadata: Metadata = {
  title: "Music",
  description: "Explore Sample Chief's curated playlists, mixes, and musical journeys.",
  openGraph: {
    title: "Sample Chief Music",
    description: "Explore Sample Chief's curated playlists, mixes, and musical journeys.",
    images: [
      {
        url: "/assets/logos/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sample Chief Music",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Music | Sample Chief",
    description: "Explore Sample Chief's curated playlists, mixes, and musical journeys.",
    images: ["/assets/logos/og-image.png"],
  },
};

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SpecialPageLayout>{children}</SpecialPageLayout>;
}
