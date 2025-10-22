import { notFound } from "next/navigation";
import { events } from "@/data/events";
import React from "react";
import Image from "next/image";
import fs from 'fs';
import path from 'path';
import LazyVideo from "@/components/LazyVideo";

export async function generateStaticParams() {
  return events.map(event => ({ slug: event.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  let slug: string = '';
  try {
    const paramsResolved = await params;
    slug = paramsResolved.slug;
    const event = events.find(e => e.slug === slug);
    if (!event) return notFound();

    // Only read manifest if we need it (no contentBlocks defined)
    let manifest: Record<string, string[]> | null = null;
    if (!(event as any).contentBlocks?.length) {
      try {
        const manifestPath = path.join(process.cwd(), 'public', 'assets', 'projects', 'manifest.json');
        if (fs.existsSync(manifestPath)) {
          const raw = fs.readFileSync(manifestPath, 'utf-8');
          manifest = JSON.parse(raw);
        }
      } catch (err) {
        console.error('Error reading manifest:', err);
        manifest = null;
      }
    }

    let projectBlocks: any[] = [];
    if ((event as any).contentBlocks && (event as any).contentBlocks.length) {
      projectBlocks = (event as any).contentBlocks;
    } else if (manifest && manifest[event.imageFolder] && manifest[event.imageFolder].length) {
      projectBlocks = manifest[event.imageFolder].map(src => ({ type: 'image', src }));
    } else if ((event as any).images && (event as any).images.length) {
      projectBlocks = (event as any).images.map((img: any) => ({ type: 'image', src: img.src, gridSpan: img.gridSpan, colStart: img.colStart, rowStart: img.rowStart }));
    }

    const heroSrc = event.heroImage || (
      Array.isArray((event as any).contentBlocks) && (event as any).contentBlocks.find((b: any) => b.type !== 'text' && b.src)?.src
    ) || ((event as any).images && (event as any).images[0] && (event as any).images[0].src) || null;

    const servicesArray = event.services ? event.services.split(',').map((s: string) => s.trim()).filter(Boolean) : [];

    return (
      <div className="w-full px-0">
        <div className="grid grid-rows-[auto_auto] w-full">
          {/* First section: full width, one column */}
          <div className="relative w-full h-[50vh] md:h-screen flex flex-row justify-between items-center text-white">
            {heroSrc && (
              // Hero image: this is the LCP element. Keep it as priority.
              <div className="absolute inset-0 z-0">
                <div className="relative w-full h-full aspect-[16/9]">
                  <Image
                    src={heroSrc}
                    alt={event.title + " main image"}
                    fill
                    sizes="100vw"
                    priority
                    quality={85}
                    className="object-cover object-center z-0"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml,%3Csvg width='16' height='16' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='16' height='16' fill='%23e5e7eb'/%3E%3C/svg%3E"
                  />
                </div>
              </div>
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
            {/* Desktop/tablet: keep the info panel positioned inside the hero area */}
            <div className="hidden md:block md:static md:p-6 md:h-full md:w-1/2 md:ml-auto">
              <div className="relative bg-white rounded-lg p-4 md:p-6 text-black w-full">
                {/* Text content */}
                <div className="relative flex flex-col items-start self-start w-full md:h-full">
                  <h3 className="font-bold text-lg mb-2">Ethos</h3>
                  <div className="mb-6">{event.ethos || "-"}</div>
                  <h3 className="font-bold text-lg mb-2">Description</h3>
                  <div className="mb-6">
                    {event.description.split(/\n+/).map((para, idx) => (
                      <p key={idx} dangerouslySetInnerHTML={{ __html: para.trim() }} />
                    ))}
                  </div>
                  <h3 className="font-bold text-lg mb-2">Services</h3>
                    {servicesArray.length ? (
                      <div className="mb-6">
                        {servicesArray.map((s: string, i: number) => (
                          <p key={i} className="text-gray-700 leading-relaxed">{s}</p>
                        ))}
                      </div>
                    ) : (
                      <div><p className="text-sm text-gray-700 leading-relaxed">-</p></div>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-only ethos/description block: place after the hero so it appears as its own block on small screens */}
          {/* Full-bleed yellow background on mobile with centered white card */}
          <div className="block md:hidden">
            <div className="w-full bg-[#F8C722]">
              <div className="max-w-3xl mx-auto px-4 py-6">
                <div className="bg-white rounded-lg p-4 text-black">
                <h3 className="font-bold text-lg mb-2">Ethos</h3>
                <div className="mb-6">{event.ethos || "-"}</div>
                <h3 className="font-bold text-lg mb-2">Description</h3>
                <div className="mb-6">
                  {event.description.split(/\n+/).map((para, idx) => (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: para.trim() }} />
                  ))}
                </div>
                <div className="mt-2 w-full">
                  <h3 className="font-bold text-lg mb-2">Services</h3>
                  {servicesArray.length ? (
                    <div className="mb-10">
                      {servicesArray.map((s: string, i: number) => (
                        <p key={i} className="text-gray-700 leading-relaxed">{s}</p>
                      ))}
                    </div>
                  ) : (
                    <div><p className="text-sm text-gray-700 leading-relaxed">-</p></div>
                  )}
                </div>
                </div>
              </div>
            </div>
          </div>

          {/* Custom grid section for project images */}
          <section className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 auto-rows-auto md:auto-rows-[30vh] gap-0 p-0">
              {Array.isArray(projectBlocks) && projectBlocks.length > 0 ? projectBlocks.map((block: any, idx: number) => {
                const prefixIfNeeded = (tok: string) => tok.startsWith('md:') ? tok : `md:${tok}`;
                const rawGridSpan = block.gridSpan ? (block.gridSpan as string).split(/\s+/).join(' ') : '';
                const rawColStart = block.colStart ? (block.colStart as string).split(/\s+/).join(' ') : '';
                const rawRowStart = block.rowStart ? (block.rowStart as string).split(/\s+/).join(' ') : '';
                const mdGridSpan = block.gridSpan ? (block.gridSpan as string).split(/\s+/).map(prefixIfNeeded).join(' ') : '';
                const mdColStart = block.colStart ? (block.colStart as string).split(/\s+/).map(prefixIfNeeded).join(' ') : '';
                const mdRowStart = block.rowStart ? (block.rowStart as string).split(/\s+/).map(prefixIfNeeded).join(' ') : '';
                const baseClasses = `relative overflow-hidden w-full ${rawGridSpan} ${rawColStart} ${rawRowStart} ${mdGridSpan} ${mdColStart} ${mdRowStart} md:bg-gray-100`.trim();
                const mediaClasses = `relative overflow-hidden h-full w-full min-h-[60vh] md:min-h-[30vh] border-0 ${rawGridSpan} ${rawColStart} ${rawRowStart} ${mdGridSpan} ${mdColStart} ${mdRowStart} md:bg-gray-100`.trim();

                const fit = (block as any).fit || 'cover';
                const fitClass = (() => {
                  switch (fit) {
                    case 'contain':
                      return 'object-contain';
                    case 'fill':
                      return 'object-fill';
                    case 'none':
                      return 'object-none';
                    case 'scale-down':
                      return 'object-scale-down';
                    case 'cover':
                    default:
                      return 'object-cover';
                  }
                })();

                const position = (block as any).position || '';
                const positionClass = (() => {
                  switch ((position || '').toLowerCase()) {
                    case 'top':
                      return 'object-top';
                    case 'bottom':
                      return 'object-bottom';
                    case 'left':
                      return 'object-left';
                    case 'right':
                      return 'object-right';
                    case 'center':
                      return 'object-center';
                    case 'top-left':
                    case 'left-top':
                      return 'object-top object-left';
                    case 'top-right':
                    case 'right-top':
                      return 'object-top object-right';
                    case 'bottom-left':
                    case 'left-bottom':
                      return 'object-bottom object-left';
                    case 'bottom-right':
                    case 'right-bottom':
                      return 'object-bottom object-right';
                    default:
                      return '';
                  }
                })();

                const inlineStyle: React.CSSProperties = {};
                if (!positionClass && position) {
                  inlineStyle.objectPosition = position;
                }

                if (block.type === 'video') {
                  const isExternal = typeof block.src === 'string' && /youtube|vimeo/.test(block.src);
                  return (
                    <div key={idx} className={mediaClasses}>
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
                          <LazyVideo
                            src={block.src}
                            className=""
                            style={inlineStyle}
                            fitClass={fitClass}
                            positionClass={positionClass || 'object-center'}
                          />
                        )}
                      </div>
                    </div>
                  );
                }

                if (block.type === 'text') {
                  return (
                    <div key={idx} className={`${baseClasses}`}>
                      <div className="block md:hidden w-full bg-[#F8C722]">
                        <div className="max-w-3xl mx-auto px-4 py-6 flex items-center">
                          <div className="bg-[#0F0500] rounded-lg p-4 text-white w-full py-10">
                            <div className="text-base leading-relaxed max-w-none text-white w-full">
                              <div dangerouslySetInnerHTML={{ __html: block.html || '' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:flex p-8 items-center justify-center h-full w-full bg-[#0F0500] min-h-[30vh]">
                        <div className="max-w-3xl w-full">
                          <div className="bg-[#0F0500] rounded-lg p-6 text-white h-full flex items-center">
                            <div className="text-base leading-relaxed w-full" dangerouslySetInnerHTML={{ __html: block.html || '' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={block.src || idx} className={mediaClasses}>
                    <Image
                      src={block.src}
                      alt={event.title + ' project image ' + (idx + 1)}
                      fill
                      sizes="(min-width:1280px) 18vw, (min-width:1024px) 24vw, (min-width:640px) 40vw, 80vw"
                      className={`${fitClass} ${positionClass || 'object-center'}`}
                      style={inlineStyle}
                      quality={75}
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml,%3Csvg width='16' height='16' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='16' height='16' fill='%23e5e7eb'/%3E%3C/svg%3E"
                      loading={idx < 4 ? "eager" : "lazy"}
                    />
                  </div>
                );
              }) : (
                <div className="col-span-full p-8 text-center">No project media available.</div>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  } catch (err) {
    console.error('ProjectDetailPage render error for slug:', slug, err);
    console.error('Error stack:', err instanceof Error ? err.stack : err);
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold">Internal Server Error</h2>
        <p>Something went wrong rendering this project. Check server logs for details.</p>
        <p className="text-sm text-gray-600 mt-2">Project slug: {slug}</p>
      </div>
    );
  }
}
