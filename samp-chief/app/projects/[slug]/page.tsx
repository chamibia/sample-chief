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
  try {
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

    // Prefer contentBlocks (rich content) if provided, otherwise fall back to images
    const projectBlocks = (event as any).contentBlocks && (event as any).contentBlocks.length
      ? (event as any).contentBlocks
      : (event.images || []).map(img => ({ type: 'image', src: img.src, gridSpan: img.gridSpan, colStart: img.colStart, rowStart: img.rowStart }));

    return (
      <div className="w-full px-0">
        <div className="grid grid-rows-[auto_auto] w-full">
          {/* First section: full width, one column */}
          <div className="relative w-full h-screen flex flex-row justify-between items-center text-white">
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
                <div className="mb-6">
                  <h1 className="font-ruder font-medium text-white leading-tight text-4xl md:text-5xl">
                    {event.title}
                  </h1>
                </div>
                <div className="text-base font-bold mb-4">{event.location || "-"}</div>
              </div>
            </div>
            {/* Ethos, Description, Services, Tags */}
            {/* On mobile the info panel should sit at the bottom of the hero. */}
            <div className="absolute left-0 right-0 bottom-0 p-4 z-10 flex items-start md:static md:p-6 md:h-full md:w-1/2 md:ml-auto">
              <div className="relative bg-white rounded-lg p-4 md:p-6 text-black w-full shadow-lg md:shadow-sm">
                {/* Text content */}
                <div className="relative flex flex-col items-start self-start w-full md:h-full">
                  <h3 className="font-bold text-lg mb-2">Ethos</h3>
                  <div className="mb-6">{event.ethos || "-"}</div>
                  <h3 className="font-bold text-lg mb-2">Description</h3>
                  <div className="mb-10">
                    {event.description.split(/\n+/).map((para, idx) => (
                      <p key={idx} className="mb-4" dangerouslySetInnerHTML={{ __html: para.trim() }} />
                    ))}
                  </div>
                  {/* Services: on mobile show inline under description; on md+ keep absolute bottom-left */}
                  {(() => {
                    const servicesArray = event.services ? event.services.split(',').map(s => s.trim()).filter(Boolean) : [];
                    return (
                      <>
                        {/* Mobile inline */}
                        <div className="block md:hidden mt-2 w-full">
                          <p className="font-bold text-sm mb-1">SERVICES</p>
                          {servicesArray.length ? (
                            <div className="text-sm font-medium">
                              {servicesArray.map((s: string, i: number) => (
                                <span key={i} className="inline-block mr-2">{s}{i < servicesArray.length - 1 ? ',' : ''}</span>
                              ))}
                            </div>
                          ) : (
                            <span>-</span>
                          )}
                        </div>

                        {/* Desktop/Tablet absolute placement */}
                        <div className="hidden md:absolute md:left-0 md:bottom-0 md:flex md:items-center">
                          <p className="font-bold text-sm mr-2">SERVICES</p>
                          {servicesArray.length ? (
                            <span className="text-sm font-medium">{servicesArray.join(' / ')}</span>
                          ) : (
                            <span>-</span>
                          )}
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* Custom grid section for project images */}
          <section className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[30vh] gap-0 p-0">
              {Array.isArray(projectBlocks) && projectBlocks.length > 0 ? projectBlocks.map((block: any, idx: number) => {
                const classes = `relative bg-gray-100 overflow-hidden shadow-sm h-full w-full ${block.gridSpan || ''} ${block.colStart || ''} ${block.rowStart || ''}`.trim();

                if (block.type === 'video') {
                  const isExternal = typeof block.src === 'string' && /youtube|vimeo/.test(block.src);
                  return (
                    <div key={idx} className={classes}>
                      <div className="w-full h-full relative bg-black flex items-center justify-center">
                        {isExternal ? (
                          <iframe
                            src={block.src}
                            title={block.alt || `${event.title} video ${idx + 1}`}
                            className="w-full h-full"
                            frameBorder={0}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                          >
                            <source src={block.src} />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                    </div>
                  );
                }

                if (block.type === 'text') {
                  return (
                    <div key={idx} className={`${classes} p-8 flex items-center justify-center`}>
                      <div className="prose prose-lg max-w-none text-black" dangerouslySetInnerHTML={{ __html: block.html || '' }} />
                    </div>
                  );
                }

                // default: image
                return (
                  <div key={block.src || idx} className={classes}>
                    <Image
                      src={block.src}
                      alt={event.title + ' project image ' + (idx + 1)}
                      fill
                      sizes="(min-width:1280px) 18vw, (min-width:1024px) 24vw, (min-width:640px) 40vw, 80vw"
                      className="object-cover object-center"
                      priority={idx === 0}
                    />
                  </div>
                );
              }) : (
                <div className="col-span-full p-8 text-center">No project media available.</div>
              )}
            </div>
            {/* uploader removed */}
          </section>
        </div>
      </div>
    );
  } catch (err) {
    // Log the full error server-side so you can inspect the stack trace in your terminal or logs
    // eslint-disable-next-line no-console
    console.error('ProjectDetailPage render error:', err);
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold">Internal Server Error</h2>
        <p>Something went wrong rendering this project. Check server logs for details.</p>
      </div>
    );
  }
}
