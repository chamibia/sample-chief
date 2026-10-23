"use client";

import { motion } from 'framer-motion';
import { useMemo } from 'react';

import { ProjectCard } from '@/components/ui/UnifiedCard';
import { events } from '@/data/events';

import { getGridConfig } from './ProjectGrid';

interface AllProjectsGridProps {
  hoveredProject?: string | null;
  onProjectHover?: (slug: string) => void;
  onProjectLeave?: () => void;
}

// Tile shapes (1-5) come from ProjectGrid.tsx's getGridConfig — the same
// shapes the original 5-slot featured grid used — just cycled across every
// project instead of stopping at 5. Combined with `grid-auto-flow: dense`,
// this keeps the familiar tetris-style look while scaling to any project
// count.

// Hand-curated order/shape for part of the non-featured block, so the Holt
// Renfrew/Ace Hotel pair mirrors left-right (Holt Renfrew's large tile on
// the left, Ace Hotel's tall tile on the right, each keeping its own size).
// Any non-featured project NOT listed here still renders — it's appended
// afterward, alphabetically, continuing the shape cycle — so a project can
// never silently disappear just because this list wasn't updated. A slug
// here that later becomes `featured` in events.ts also drops out of this
// list automatically (it's only matched against non-featured events).
const NON_FEATURED_CURATION: { slug: string; position: number }[] = [
  { slug: "holt-renfrew", position: 3 },
  { slug: "kops-record-store", position: 2 },
  { slug: "ace-hotel", position: 1 },
  { slug: "u-of-t", position: 4 },
  { slug: "village-boogie", position: 5 },
];

export default function AllProjectsGrid({ hoveredProject, onProjectHover, onProjectLeave }: AllProjectsGridProps = {}) {
  // Originally-featured projects keep their exact assigned positions (1-5),
  // so the grid opens with the same arrangement it had before every project
  // got a tile. `events` is static import-time data, so this never needs
  // to be recomputed on hover/re-render.
  const orderedProjects = useMemo(() => {
    const featuredProjects = events
      .filter(event => event.featured)
      .sort((a, b) => a.featured!.position - b.featured!.position);

    const nonFeaturedEvents = events.filter(event => !event.featured);
    const curatedSlugs = new Set(NON_FEATURED_CURATION.map(c => c.slug));

    const curatedProjects = NON_FEATURED_CURATION
      .map(({ slug }) => nonFeaturedEvents.find(event => event.slug === slug))
      .filter((event): event is typeof events[number] => Boolean(event));

    const uncuratedProjects = nonFeaturedEvents
      .filter(event => !curatedSlugs.has(event.slug))
      .sort((a, b) => a.title.localeCompare(b.title));

    return [
      ...featuredProjects.map(event => ({ event, position: event.featured!.position })),
      ...curatedProjects.map(event => ({
        event,
        position: NON_FEATURED_CURATION.find(c => c.slug === event.slug)!.position,
      })),
      ...uncuratedProjects.map((event, i) => ({ event, position: (i % 5) + 1 })),
    ];
  }, []);

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 auto-rows-[240px] sm:auto-rows-[260px] md:auto-rows-[300px] gap-3 md:gap-4 w-full"
      style={{ gridAutoFlow: 'dense' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      }}
    >
      {orderedProjects.map(({ event, position }, index) => {
        const { gridClasses, isLarge } = getGridConfig(position);
        const isLCP = index === 0;
        const isHovered = hoveredProject === event.slug;

        return (
          <div
            key={event.slug}
            className={`${gridClasses} relative group`}
            onMouseEnter={() => onProjectHover?.(event.slug)}
            onMouseLeave={() => onProjectLeave?.()}
          >
            <ProjectCard
              event={event}
              className="w-full h-full"
              isLCP={isLCP}
              isLarge={isLarge}
              forceHover={isHovered}
            />
          </div>
        );
      })}
    </motion.div>
  );
}
