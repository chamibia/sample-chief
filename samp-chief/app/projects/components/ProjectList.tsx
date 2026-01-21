"use client";

import Link from "next/link";
import { events } from '@/data/events';

interface ProjectListProps {
  variant: 'sidebar' | 'mobile';
  hoveredProject?: string | null;
  onProjectHover?: (slug: string) => void;
  onProjectLeave?: () => void;
}

export default function ProjectList({ variant, hoveredProject, onProjectHover, onProjectLeave }: ProjectListProps) {
  if (variant === 'sidebar') {
    return (
      <div className="space-y-4 overflow-y-auto flex-1 pr-2">
        {events.map((event) => {
          const isHighlighted = hoveredProject === event.slug;
          return (
            <Link
              key={event.slug}
              href={`/projects/${event.slug}`}
              className={`block font-sans font-light text-lg transition-all duration-300 rounded-lg px-4 py-2 ${
                isHighlighted 
                  ? 'bg-[#202020] text-white' 
                  : 'text-[#202020] hover:bg-[#202020] hover:text-white'
              }`}
              onMouseEnter={() => onProjectHover?.(event.slug)}
              onMouseLeave={() => onProjectLeave?.()}
            >
              {event.title}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-2 mb-0">
      {events.map((event) => (
        <Link
          key={event.slug}
          href={`/projects/${event.slug}`}
          className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={event.projectcard}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-ruder font-medium text-[#202020] text-lg mb-1">
              {event.title}
            </h3>
            <p className="font-sans font-light text-gray-600 text-sm">
              {event.ethos}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}