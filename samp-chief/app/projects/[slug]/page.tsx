

import { notFound } from "next/navigation";
import { events } from "@/data/events";
import fs from "fs";
import path from "path";
import React from "react";

export async function generateStaticParams() {
  return events.map(event => ({ slug: event.slug }));
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const event = events.find(e => e.slug === params.slug);
  if (!event) return notFound();

  const folderPath = path.join(process.cwd(), "public/assets/projects", event.imageFolder);
  let images: string[] = [];
  try {
    images = fs.readdirSync(folderPath)
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map(file => `/assets/projects/${event.imageFolder}/${file}`);
  } catch {
    images = [];
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      <p className="text-lg mb-2">{event.description}</p>
      <div className="flex flex-wrap gap-6">
        {images.map((img, idx) => (
          <img key={img} src={img} alt={event.title + " image " + (idx+1)} className="rounded-lg shadow w-full max-w-xs" />
        ))}
      </div>
      {event.tags && (
        <div className="mt-6 flex flex-wrap gap-2">
          {event.tags.map((tag: string) => (
            <span key={tag} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}
