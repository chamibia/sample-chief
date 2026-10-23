"use client";

import { motion } from 'framer-motion';

import { ProjectCard } from '@/components/ui/UnifiedCard';
import { events } from '@/data/events';

interface AllProjectsGridProps {
  hoveredProject?: string | null;
  onProjectHover?: (slug: string) => void;
  onProjectLeave?: () => void;
}

// Same tile shapes as the original 5-slot featured grid (see
// ProjectGrid.tsx's getGridConfig), just cycled across every project
// instead of stopping at 5. Combined with `grid-auto-flow: dense`, this
// keeps the familiar tetris-style look while scaling to any project count.
const TILE_CONFIGS: Record<number, { gridClasses: string; isLarge: boolean }> = {
  1: { gridClasses: 'col-span-2 md:col-span-1 md:row-span-2', isLarge: true },  // Large vertical
  2: { gridClasses: 'col-span-1 md:col-span-1 md:row-span-1', isLarge: false }, // Standard
  3: { gridClasses: 'col-span-1 md:col-span-2 md:row-span-2', isLarge: true },  // Large square
  4: { gridClasses: 'col-span-2 md:col-span-1 md:row-span-1', isLarge: false }, // Standard
  5: { gridClasses: 'col-span-2 md:col-span-4 md:row-span-1', isLarge: true },  // Full width
};

export default function AllProjectsGrid({ hoveredProject, onProjectHover, onProjectLeave }: AllProjectsGridProps = {}) {
  // Originally-featured projects keep their exact assigned positions (1-5),
  // so the grid opens with the same arrangement it had before every project
  // got a tile. Everything else follows afterward, continuing the same
  // shape cycle, sorted alphabetically like the old sidebar list was.
  const featuredProjects = events
    .filter(event => event.featured)
    .sort((a, b) => a.featured!.position - b.featured!.position);
  // Non-featured order and shape are hand-curated (not alphabetical/cycled)
  // so the Holt Renfrew/Ace Hotel block mirrors left-right: Holt Renfrew's
  // large tile sits on the left, Ace Hotel's tall tile on the right, each
  // keeping its own size. DOM order drives dense-packing placement; the
  // config key drives each tile's shape independent of that order.
  const NON_FEATURED_ORDER = ["holt-renfrew", "pinterest", "ace-hotel", "u-of-t", "village-boogie"];
  const NON_FEATURED_CONFIG_KEY: Record<string, number> = {
    "holt-renfrew": 3,
    "pinterest": 2,
    "ace-hotel": 1,
    "u-of-t": 4,
    "village-boogie": 5,
  };
  const nonFeaturedProjects = NON_FEATURED_ORDER
    .map(slug => events.find(event => event.slug === slug))
    .filter((event): event is typeof events[number] => Boolean(event));
  const orderedProjects = [...featuredProjects, ...nonFeaturedProjects];

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
      {orderedProjects.map((event, index) => {
        const position = event.featured?.position ?? NON_FEATURED_CONFIG_KEY[event.slug] ?? ((index % 5) + 1);
        const { gridClasses, isLarge } = TILE_CONFIGS[position];
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
