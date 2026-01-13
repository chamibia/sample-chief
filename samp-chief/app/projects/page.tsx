import Link from "next/link";

import { events } from '@/data/events';

import ProjectGrid from "./ProjectGrid";
import ProjectHoverEnhancement from "./components/ProjectHoverEnhancement";
import "./projects.css";

// Static optimization for reduced JavaScript execution
export const revalidate = 3600;
export const dynamic = 'force-static';
export const runtime = 'nodejs';

export default function Projects() {
  return (
    <>
      <ProjectHoverEnhancement />
      {/* Desktop Layout */}
      <div className="hidden md:flex h-[calc(100vh-80px)]">
        {/* Main content area */}
        <div className="flex-1 p-5">
          <ProjectGrid />
        </div>
        
        {/* Sidebar */}
        <div className="w-80 bg-white p-6 flex flex-col justify-between shrink-0">
          <div className="flex flex-col min-h-0">
            <h1 className="font-ruder font-medium text-[#202020] text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] mb-8 flex-shrink-0">
              Projects
            </h1>
            
            <div className="space-y-4 overflow-y-auto flex-1 pr-2">
              {events.map((event) => (
                <Link
                  key={event.slug}
                  href={`/projects/${event.slug}`}
                  data-project-slug={event.slug}
                  className="block font-sans font-light text-[#202020] text-lg hover:bg-[#202020] hover:text-white transition-all duration-300 rounded-lg px-4 py-2"
                >
                  {event.title}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="mt-8">
            <Link 
              href="/contact" 
              className="font-sans font-light leading-relaxed text-base bg-transparent border-2 border-gray-800 hover:bg-[#202020] hover:border-[#202020] hover:text-white rounded-full transition-all duration-300 hover:scale-105 inline-flex items-center justify-center px-6 py-3 text-[#202020] w-full"
            >
              Collab with Us
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden p-5">
        <h1 className="font-ruder font-medium text-[#202020] text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] mb-8">
          Projects
        </h1>
        
        {/* Radio inputs */}
        <input 
          type="radio" 
          name="project-tab" 
          id="featured-tab"
          value="featured" 
          defaultChecked 
          className="sr-only"
        />
        <input 
          type="radio" 
          name="project-tab" 
          id="all-tab"
          value="all" 
          className="sr-only"
        />
        
        {/* Tab buttons */}
        <div className="flex mb-6">
          <label htmlFor="featured-tab" className="flex-1 px-4 py-2 font-sans font-medium text-lg transition-colors duration-200 cursor-pointer text-gray-600 hover:text-[#202020]">
            Featured
          </label>
          <label htmlFor="all-tab" className="flex-1 px-4 py-2 font-sans font-medium text-lg transition-colors duration-200 cursor-pointer text-gray-600 hover:text-[#202020]">
            All
          </label>
        </div>

        {/* Featured content - visible by default */}
        <div className="h-[calc(100vh-200px)]" id="featured-content">
          <ProjectGrid />
        </div>

        {/* All projects list - hidden by default */}
        <div className="space-y-2 mb-0" id="all-content">
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
        
        <div className="mt-8 mb-16">
          <Link 
            href="/contact" 
            className="font-sans font-light leading-relaxed text-base bg-transparent border-2 border-gray-800 hover:bg-[#202020] hover:border-[#202020] hover:text-white rounded-full transition-all duration-300 hover:scale-105 inline-flex items-center justify-center px-6 py-3 text-[#202020] w-full"
          >
            Collab with Us
          </Link>
        </div>
      </div>
    </>
  );
}