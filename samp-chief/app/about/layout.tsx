import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Sample Chief",
  description: "Learn about Sample Chief - a global community that celebrates African music culture through immersive experiences.",
  openGraph: {
    title: "About Sample Chief",
    description: "Learn about Sample Chief - a global community that celebrates African music culture through immersive experiences.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Sample Chief",
      },
    ],
  },
  twitter: {
    title: "About Sample Chief",
    description: "Learn about Sample Chief - a global community that celebrates African music culture through immersive experiences.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
