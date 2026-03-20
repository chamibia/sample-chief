import { ProjectCard } from '@/components/ui/UnifiedCard';
import { events } from '@/data/events';

interface ProjectGridProps {
  hoveredProject?: string | null;
  onProjectHover?: (slug: string) => void;
  onProjectLeave?: () => void;
}

// Utility: Get grid layout and size info based on featured position
function getGridConfig(position: number) {
  const configs: Record<number, { gridClasses: string; isLarge: boolean }> = {
    1: { gridClasses: 'col-span-2 md:col-span-1 md:row-span-2', isLarge: true },  // Large vertical
    2: { gridClasses: 'col-span-1 md:col-span-1 md:row-span-1', isLarge: false }, // Standard
    3: { gridClasses: 'col-span-1 md:col-span-2 md:row-span-2', isLarge: true },  // Large square
    4: { gridClasses: 'col-span-2 md:col-span-1 md:row-span-1', isLarge: false }, // Standard
    5: { gridClasses: 'col-span-2 md:col-span-4 md:row-span-1', isLarge: true },  // Full width
  };
  return configs[position] || { gridClasses: 'col-span-1 md:col-span-1 md:row-span-1', isLarge: false };
}

export default function ProjectGrid({ hoveredProject, onProjectHover, onProjectLeave }: ProjectGridProps = {}) {
  // Filter and sort featured projects by position
  const featuredProjects = events
    .filter(event => event.featured)
    .sort((a, b) => a.featured!.position - b.featured!.position);

  // Create 5-slot array, fill with projects or null for empty slots
  const gridSlots = Array.from({ length: 5 }, (_, index) => 
    featuredProjects.find(project => project.featured!.position === index + 1) || null
  );

  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-2 md:grid-cols-4 flex-1 gap-3 md:gap-4 w-full" style={{ gridAutoRows: 'minmax(0, 1fr)' }}>
        {gridSlots.map((event, index) => {
          if (!event) {
            // Empty grey placeholder card
            return (
              <div 
                key={`empty-${index}`} 
                className="bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm"
              >
                Coming Soon
              </div>
            );
          }

          const isLCP = index === 0; // First image is LCP
          const isHovered = hoveredProject === event.slug;
          const { gridClasses, isLarge } = getGridConfig(event.featured!.position);
          
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
      </div>
    </div>
  );
}