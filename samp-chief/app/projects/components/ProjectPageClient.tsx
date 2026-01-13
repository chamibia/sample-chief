"use client";

import { useState, useEffect } from "react";

import ProjectGrid from "../ProjectGrid";
import ClientProjectSidebar from "./ClientProjectSidebar";
import MobileProjectTabs from "./MobileProjectTabs";

export default function ProjectPageClient() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleProjectHover = (slug: string) => setHoveredProject(slug);
  const handleProjectLeave = () => setHoveredProject(null);

  if (isMobile) {
    return <MobileProjectTabs />;
  }

  return (
    <div className="flex h-[calc(100vh-80px)]">
      <div className="flex-1 p-5">
        <ProjectGrid hoveredProject={hoveredProject} />
      </div>
      
      <ClientProjectSidebar 
        onProjectHover={handleProjectHover}
        onProjectLeave={handleProjectLeave}
      />
    </div>
  );
}