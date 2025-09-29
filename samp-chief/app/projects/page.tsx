
import Link from 'next/link';
import Image from 'next/image';
import { events } from '@/data/events';


const ProjectsPage = () => {
  // Skeleton loader with round logo white and pulsing animation
  const SkeletonCard = () => (
    <div className="flex items-center justify-center rounded-2xl w-full h-[30rem] mb-6 bg-gray-100 animate-pulse">
      <img
        src="/assets/logos/round-logo-white.png"
        alt="Loading..."
        className="w-24 h-24 object-contain opacity-80 animate-pulse"
      />
    </div>
  );

  // Calculate max row needed for grid-rows-N
  // This ensures the grid has enough rows for all cards based on their rowStart and rowSpan
  const maxRow = events.reduce((max, event) => {
    const rowStart = event.rowStart ? parseInt(event.rowStart.replace('row-start-', ''), 10) : 1;
    const rowSpan = event.gridSpan ? parseInt(event.gridSpan.replace('row-span-', '').split(' ')[0], 10) : 1;
    return Math.max(max, rowStart + rowSpan - 1);
  }, 1);
  const gridRowsClass = `grid-rows-${maxRow}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile: vertical stack */}
      <div className="block md:hidden w-full p-4">
        {events.length === 0
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : events.map((event) => (
            <Link key={event.slug} href={`/projects/${event.slug}`} className="block bg-transparent rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer w-full h-[30rem] relative mb-6">
              <Image 
                src={event.image} 
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover rounded-2xl"
                placeholder="blur"
                blurDataURL="/assets/images/popupimage.jpeg"
              />
              <div className="absolute inset-0 w-full h-full z-20 flex flex-col items-start justify-start p-4">
                <h3 className="font-semibold text-lg text-white mb-2 z-30 text-left">{event.title}</h3>
                <p className="text-white text-sm z-30 text-left pr-4">{event.description}</p>
              </div>
            </Link>
          ))}
      </div>

      {/* Desktop: custom grid */}
      <div className={`hidden md:grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${gridRowsClass} fixed-row-height gap-4 p-8 mx-auto`}>
        {events.length === 0
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : events.map((event) => (
            <Link
              key={event.slug}
              href={`/projects/${event.slug}`}
              className={`bg-transparent rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer h-full w-full relative block group ${event.gridSpan ? event.gridSpan : ''} ${event.colStart ? event.colStart : ''} ${event.rowStart ? event.rowStart : ''}`}
            >
              <Image 
                src={event.image} 
                alt={event.title}
                fill
                sizes="(max-width: 1200px) 33vw, 400px"
                className="object-cover rounded-2xl"
                placeholder="blur"
                blurDataURL="/assets/images/popupimage.jpeg"
              />
              {/* Hover overlay fills card */}
              <div className="absolute inset-0 w-full h-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col items-start justify-start p-4 h-full">
                <h3 className="font-semibold text-lg text-white mb-2 z-30 text-left">{event.title}</h3>
                <p className="text-white text-sm z-30 text-left pr-4">{event.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ProjectsPage;