"use client";

import { useState } from "react";

import AllProjectsGrid from "./AllProjectsGrid";
import ProjectGrid from "./ProjectGrid";
import ProjectList from "./components/ProjectList";
import CollabButton from "./components/CollabButton";
import "./projects.css";

// When true: every project gets a tile in a full-width tetris-style grid,
// the "Projects" heading and the all-projects sidebar/list are hidden.
// When false: restores the original layout (5-slot featured grid +
// sidebar/mobile "All" list of every other project). See README.md
// ("Projects Page Layout") for details before flipping this back.
const SHOW_ALL_PROJECTS_AS_TILES = true;

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  if (SHOW_ALL_PROJECTS_AS_TILES) {
    return (
      <div className="p-5">
        <AllProjectsGrid
          hoveredProject={hoveredProject}
          onProjectHover={setHoveredProject}
          onProjectLeave={() => setHoveredProject(null)}
        />
        <div className="mt-8 mb-16 md:hidden">
          <CollabButton />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:flex h-[calc(100vh-80px)]">
        {/* Main content area */}
        <div className="flex-1 p-5">
            <ProjectGrid
              hoveredProject={hoveredProject}
              onProjectHover={setHoveredProject}
              onProjectLeave={() => setHoveredProject(null)}
            />
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-white p-6 flex flex-col justify-between shrink-0">
            <div className="flex flex-col min-h-0">
              <h1 className="font-ruder font-medium text-[#202020] text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] mb-8 flex-shrink-0">
                Projects
              </h1>

              <ProjectList
                variant="sidebar"
                hoveredProject={hoveredProject}
                onProjectHover={setHoveredProject}
                onProjectLeave={() => setHoveredProject(null)}
              />
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
        <div id="all-content">
          <ProjectList variant="mobile" />
        </div>

        <div className="mt-8 mb-16">
          <CollabButton />
        </div>
      </div>
    </>
  );
}
