import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore the diverse projects of Sample Chief, showcasing African music culture through innovative and immersive experiences.",
  openGraph: {
    title: "Sample Chief Projects",
    description: "Explore the diverse projects of Sample Chief, showcasing African music culture through innovative and immersive experiences.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sample Chief Projects",
      },
    ],
  },
  twitter: {
    title: "Projects | Sample Chief",
    description: "Explore the diverse projects of Sample Chief, showcasing African music culture through innovative and immersive experiences.",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col bg-white text-black">
      {children}
    </main>
  );
}
