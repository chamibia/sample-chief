import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "Discover upcoming Sample Chief events - immersive experiences celebrating African music culture.",
  openGraph: {
    title: "Events",
    description: "Discover upcoming Sample Chief events - immersive experiences celebrating African music culture.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sample Chief Events",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events | Sample Chief",
    description: "Discover upcoming Sample Chief events - immersive experiences celebrating African music culture.",
    images: ["/assets/og-image.png"],
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
