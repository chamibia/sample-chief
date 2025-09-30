import { notFound } from "next/navigation";
import { events } from "@/data/events";
import fs from "fs";
import path from "path";
import React from "react";
import Image from "next/image";

export async function generateStaticParams() {
  return events.map(event => ({ slug: event.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find(e => e.slug === slug);
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

  // Use only images declared in event.images for the custom grid
  const projectImages = event.images || [];

  return (
    <div className="w-full px-0">
      <div className="grid grid-rows-[auto_auto] w-full">
        {/* First section: full width, one column */}
        <div className="relative w-full h-screen flex flex-row justify-between items-center text-white">
          {/* Absolutely positioned image background using Next.js Image */}
          {(event.heroImage || images[0]) && (
            <Image
              src={event.heroImage || images[0]}
              alt={event.title + " main image"}
              fill
              sizes="100vw"
              priority
              className="object-cover object-center z-0"
            />
          )}
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none" />
          {/* Project title and location */}
          <div className="relative z-10 p-6 flex flex-col justify-between h-full w-1/2">
            <div>
              <div className="font-bold text-4xl mb-6">{event.title}</div>
              {event.brandLogo && (
                <div className="mb-6">
                  <Image
                    src={event.brandLogo}
                    alt={event.title + ' brand logo'}
                    width={64}
                    height={64}
                    quality={100}
                    className="object-contain" style={{ filter: 'invert(1)' }}
                  />
                </div>
              )}
              <div className="text-base mb-4">{event.location || "-"}</div>
            </div>
          </div>
          {/* Event poster, Ethos, Description, Services, Tags */}
          <div className="relative z-10 p-6 h-full w-1/2 ml-auto flex items-start">
            <div className="relative bg-white/80 rounded p-6 text-black w-full flex flex-row items-start gap-6 h-1/2 justify-between">
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
                {/* Left: Text content */}
                <div className="relative flex flex-col items-start self-start h-full">
                  <h3 className="font-bold text-lg mb-2">Ethos</h3>
                  <div className="mb-4">{event.ethos || "-"}</div>
                  <h3 className="font-bold text-lg mb-2">Description</h3>
                  <div className="mb-4">{event.description}</div>
                  {/* Services Provided tags at bottom left of text content */}
                  <div className="absolute left-0 bottom-0 flex items-center">
                    <p className="font-semibold text-sm mr-2">Services</p>
                    {event.services ? (
                      <div className="flex flex-wrap gap-2">
                        {event.services.split(',').map(service => (
                          <span
                            key={service.trim()}
                            className="px-2 py-1 rounded text-xs font-semibold"
                            style={{ backgroundColor: '#F8C722', color: '#000' }}
                          >
                            {service.trim()}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span>-</span>
                    )}
                  </div>
                </div>
                {/* Right: Event poster */}
                <div className="flex items-center justify-end w-full h-full">
                  {event.poster && (
                    <img
                      src={event.poster}
                      alt={event.title + ' poster'}
                      className="max-w-xs w-full h-auto md:h-full rounded object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom grid section for project images */}
        <section className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[30vh] gap-0 p-0">
            {projectImages.map((imgObj, idx) => (
              <div
                key={imgObj.src}
                className={`relative bg-gray-100 overflow-hidden shadow-sm h-full w-full ${imgObj.gridSpan || ''} ${imgObj.colStart || ''} ${imgObj.rowStart || ''}`.trim()}
              >
                <Image
                  src={imgObj.src}
                  alt={event.title + ' project image ' + (idx + 1)}
                  fill
                  sizes="(min-width:1280px) 18vw, (min-width:1024px) 24vw, (min-width:640px) 40vw, 80vw"
                  className="object-cover object-center"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
