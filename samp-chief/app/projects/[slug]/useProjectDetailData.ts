import fs from "fs";
import path from "path";

import { ProjectBlock } from "@/components/projectBlocks";
import { events } from "@/data/events";

export interface ProjectDetailData {
  event: any;
  projectBlocks: ProjectBlock[];
  heroSrc: string | null;
  servicesArray: string[];
}

export async function getProjectDetailData(slug: string): Promise<ProjectDetailData | null> {
  const event = events.find((e) => e.slug === slug);
  if (!event) return null;

  // Only read manifest if we need it (no contentBlocks defined)
  let manifest: Record<string, string[]> | null = null;
  if (!(event as any).contentBlocks?.length) {
    try {
      const manifestPath = path.join(process.cwd(), "public", "assets", "projects", "manifest.json");
      if (fs.existsSync(manifestPath)) {
        const raw = fs.readFileSync(manifestPath, "utf-8");
        manifest = JSON.parse(raw);
      }
    } catch (err) {
      console.error("Error reading manifest:", err);
      manifest = null;
    }
  }

  let projectBlocks: ProjectBlock[] = [];
  if ((event as any).contentBlocks && (event as any).contentBlocks.length) {
    projectBlocks = (event as any).contentBlocks;
  } else if (manifest && manifest[event.imageFolder] && manifest[event.imageFolder].length) {
    projectBlocks = manifest[event.imageFolder].map((src: string) => ({ type: "image", src }));
  } else if ((event as any).images && (event as any).images.length) {
    projectBlocks = (event as any).images.map((img: any) => ({ type: "image", src: img.src, gridSpan: img.gridSpan, colStart: img.colStart, rowStart: img.rowStart }));
  }

  const heroSrc =
    event.heroImage ||
    (Array.isArray((event as any).contentBlocks) &&
      (event as any).contentBlocks.find((b: any) => b.type !== "text" && b.src)?.src) ||
    ((event as any).images && (event as any).images[0] && (event as any).images[0].src) ||
    null;

  const servicesArray = event.services
    ? event.services.split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  return {
    event,
    projectBlocks,
    heroSrc,
    servicesArray,
  };
}
