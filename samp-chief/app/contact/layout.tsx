import { Metadata } from "next";

import { createPageMetadata,PageLayout } from "../../src/components/ui";

export const metadata: Metadata = createPageMetadata({
  title: "Join Our Community",
  description: "Join the Sample Chief community - a global collective of music lovers, tastemakers, and cultural connectors shaping the next wave.",
  images: [{
    url: "/assets/logos/og-image.png",
    width: 1200,
    height: 630,
    alt: "Contact Sample Chief",
  }],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout variant="standard">{children}</PageLayout>;
}