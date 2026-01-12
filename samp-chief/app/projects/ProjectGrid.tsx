import { ProjectCard } from '@/components/ui/UnifiedCard';
import { events } from '@/data/events';

// Get the grid classes from the event data
const getGridClasses = (event: any) => {
  const gridSpan = event.gridSpan || "col-span-1 row-span-1";
  const colStart = event.colStart || "";
  const rowStart = event.rowStart || "";
  
  // Convert to responsive classes
  const responsiveSpan = gridSpan.split(' ').map((cls: string) => `md:${cls}`).join(' ');
  const responsiveColStart = colStart ? `md:${colStart}` : "";
  const responsiveRowStart = rowStart ? `md:${rowStart}` : "";
  
  return `${responsiveSpan} ${responsiveColStart} ${responsiveRowStart}`.trim();
};

interface ProjectGridProps {
  hoveredProject?: string | null;
}

export default function ProjectGrid({ hoveredProject }: ProjectGridProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-2 md:grid-cols-4 flex-1 gap-3 md:gap-4 w-full" style={{ gridAutoRows: 'minmax(0, 1fr)' }}>
        {events.map((event, index) => {
          const gridClasses = getGridClasses(event);
          const isLarge = event.gridSpan?.includes('col-span-2') && event.gridSpan?.includes('row-span-2');
          const isLCP = index === 0; // First image is LCP
          const isHovered = hoveredProject === event.slug;
          
          // Mobile layout pattern: 1 item, 2 items, 1 item, 1 item
          let mobileClasses = '';
          if (index === 0) {
            mobileClasses = 'col-span-2 row-start-1'; // First item spans full width
          } else if (index === 1) {
            mobileClasses = 'col-span-1 row-start-2 col-start-1'; // Second item left
          } else if (index === 2) {
            mobileClasses = 'col-span-1 row-start-2 col-start-2'; // Third item right
          } else {
            mobileClasses = 'col-span-2'; // Remaining items span full width
          }
          
          const finalClasses = `${mobileClasses} ${gridClasses}`;
          
          return (
            <ProjectCard
              key={event.slug}
              event={event}
              className={finalClasses}
              isLCP={isLCP}
              isLarge={isLarge}
              forceHover={isHovered}
            />
          );
        })}
      </div>
    </div>
  );
}