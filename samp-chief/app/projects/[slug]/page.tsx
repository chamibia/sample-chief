import { notFound } from "next/navigation";
import React from "react";

import ProjectBlocksClient from "@/components/ProjectBlocksClient";
import { events } from "@/data/events";

import Image from "./Image";
import { getProjectDetailData } from "./useProjectDetailData";
import { BLUR_PLACEHOLDER } from "@/lib/imageOptimization";

export async function generateStaticParams() {
  return events.map(event => ({ slug: event.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  let slug = '';
  try {
    const paramsResolved = await params;
    slug = paramsResolved.slug;
    const data = await getProjectDetailData(slug);
    if (!data) return notFound();
    const { event, projectBlocks, heroSrc, servicesArray } = data;

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
                    quality={75}
                    className="object-cover object-center z-0"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
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
            <div className="hidden md:block md:static md:p-6 md:h-full md:w-1/2 md:ml-auto md:mt-14">
              <div className="relative bg-white rounded-lg p-4 md:p-6 text-black w-full">
                {/* Text content */}
                <div className="relative flex flex-col items-start self-start w-full md:h-full">
                  <h3 className="font-bold text-lg mb-2">Ethos</h3>
                  <div className="mb-6">{event.ethos || "-"}</div>
                  <h3 className="font-bold text-lg mb-2">Description</h3>
                  <div className="mb-6">
                    {event.description.split(/\n+/).map((para: string, idx: number) => (
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
          {/* Full-bleed background on mobile */}
          <div className="block md:hidden">
            <div className="w-full bg-white">
              <div className="w-full px-0 py-6">
                <div className="bg-white p-4 text-black">
                <h3 className="font-bold text-lg mb-2">Ethos</h3>
                <div className="mb-6">{event.ethos || "-"}</div>
                <h3 className="font-bold text-lg mb-2">Description</h3>
                <div className="mb-6">
                  {event.description.split(/\n+/).map((para: string, idx: number) => (
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
              {Array.isArray(projectBlocks) && projectBlocks.length > 0 ? (
                <ProjectBlocksClient blocks={projectBlocks} eventTitle={event.title} />
              ) : (
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
