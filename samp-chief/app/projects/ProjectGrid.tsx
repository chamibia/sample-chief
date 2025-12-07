import { ProjectCard } from '@/components/ui';
import { events } from '@/data/events';

// Get the grid classes from the event data (original layout)
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

export default function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[350px] gap-4 md:gap-6 w-full mb-5">
      {events.map((event, index) => {
        const gridClasses = getGridClasses(event);
        const isLarge = event.gridSpan?.includes('col-span-2') && event.gridSpan?.includes('row-span-2');
        const isLCP = index === 0; // First image is likely LCP
        
        return (
          <ProjectCard
            key={event.slug}
            event={event}
            className={`${gridClasses}`}
            isLCP={isLCP}
            isLarge={isLarge}
          />
        );
      })}
    </div>
  );
}