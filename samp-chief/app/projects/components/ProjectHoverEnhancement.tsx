"use client";

import { useState, useEffect } from "react";

export default function ProjectHoverEnhancement() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    // Add hover event listeners to sidebar links
    const sidebarLinks = document.querySelectorAll('[data-project-slug]');
    
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const slug = target.getAttribute('data-project-slug');
      if (slug) {
        setHoveredProject(slug);
        // Add hover class to corresponding project card
        const projectCard = document.querySelector(`[data-project-card="${slug}"]`);
        if (projectCard) {
          projectCard.classList.add('project-card-hovered');
        }
      }
    };

    const handleMouseLeave = () => {
      setHoveredProject(null);
      // Remove hover class from all project cards
      const projectCards = document.querySelectorAll('[data-project-card]');
      projectCards.forEach(card => card.classList.remove('project-card-hovered'));
    };

    sidebarLinks.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      sidebarLinks.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return null; // This component doesn't render anything
}