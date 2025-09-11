import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Our Community",
  description: "Join the Sample Chief community - a global collective of music lovers, tastemakers, and cultural connectors shaping the next wave.",
  openGraph: {
    title: "Join Our Community",
    description: "Join the Sample Chief community - a global collective of music lovers, tastemakers, and cultural connectors shaping the next wave.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Sample Chief",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Join Our Community",
    description: "Join the Sample Chief community - a global collective of music lovers, tastemakers, and cultural connectors shaping the next wave.",
    images: ["/assets/og-image.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}