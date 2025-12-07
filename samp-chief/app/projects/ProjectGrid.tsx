import { ProjectCard } from '@/components/ui/UnifiedCard';
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
    <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[350px] gap-4 md:gap-6 w-full mb-5">
      {events.map((event, index) => {
        const gridClasses = getGridClasses(event);
        const isLarge = event.gridSpan?.includes('col-span-2') && event.gridSpan?.includes('row-span-2');
        const isLCP = index === 0; // First image is likely LCP
        
        // Add entrance animation with staggered delay
        const animationDelay = `delay-${Math.min(index * 100, 500)}`;
        const animationClasses = `animate-fade-in transform transition-all duration-700 ease-out ${animationDelay}`;
        
        // Custom mobile layout for cards
        let mobileClasses = '';
        if (index === 0) {
          mobileClasses = 'col-span-2 row-start-1'; // First card spans full width
        } else if (index === 1) {
          mobileClasses = 'col-span-1 row-start-2 col-start-1'; // Second card left
        } else if (index === 2) {
          mobileClasses = 'col-span-1 row-start-2 col-start-2'; // Third card right
        } else {
          mobileClasses = 'col-span-2'; // Remaining cards span full width
        }
        
        // Ensure first item is positioned optimally for LCP
        const finalClasses = isLCP ? 
          `col-span-2 md:col-span-1 md:row-span-2 md:col-start-1 md:row-start-1 ${animationClasses}` : 
          `${mobileClasses} ${gridClasses} ${animationClasses}`;
        
        return (
          <ProjectCard
            key={event.slug}
            event={event}
            className={finalClasses}
            isLCP={isLCP}
            isLarge={isLarge}
          />
        );
      })}
    </div>
  );
}