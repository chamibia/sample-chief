"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, easeOut } from "framer-motion";
import { events } from '@/data/events';
import ProjectGrid from "./ProjectGrid";

// Types
type TabType = 'featured' | 'all';

interface ProjectSidebarProps {
  onProjectHover: (slug: string) => void;
  onProjectLeave: () => void;
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleOnHover = {
  hover: { scale: 1.02, transition: { duration: 0.2 } },
};

// Style constants
const STYLES = {
  sidebar: {
    container: "w-80 bg-white p-6 flex flex-col justify-between shrink-0",
    title: "font-ruder font-medium text-[#202020] text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] mb-8 flex-shrink-0",
    listContainer: "space-y-4 overflow-y-auto flex-1 pr-2",
    listItem: "block font-sans font-light text-[#202020] text-lg hover:bg-[#202020] hover:text-white transition-all duration-300 rounded-lg px-4 py-2",
    button: "font-sans font-light leading-relaxed text-base bg-transparent border-2 border-gray-800 hover:bg-[#202020] hover:border-[#202020] hover:text-white rounded-full transition-all duration-300 hover:scale-105 inline-flex items-center justify-center px-6 py-3 text-[#202020] w-full"
  },
  mobile: {
    container: "p-5",
    title: "font-ruder font-medium text-[#202020] text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] mb-8",
    tabContainer: "flex mb-6",
    tab: "px-4 py-2 font-sans font-medium text-lg transition-colors duration-200",
    activeTab: "border-b-2 border-[#202020] text-[#202020]",
    inactiveTab: "text-gray-600 hover:text-[#202020]",
    list: {
      container: "space-y-2 mb-0",
      item: "flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200",
      image: "w-24 h-24 rounded-lg overflow-hidden flex-shrink-0",
      content: "flex-1",
      title: "font-ruder font-medium text-[#202020] text-lg mb-1",
      description: "font-sans font-light text-gray-600 text-sm"
    },
    buttonContainer: "mt-8 mb-16"
  },
  layout: {
    desktop: "flex h-[calc(100vh-80px)]",
    desktopMain: "flex-1 p-5",
    mobileGrid: "h-[calc(100vh-200px)]"
  }
} as const;

// Utility function for responsive detection
const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile };
};

// Reusable components
const TabButton = ({ 
  label, 
  isActive, 
  onClick 
}: { 
  label: string; 
  isActive: boolean; 
  onClick: () => void; 
}) => (
  <button
    onClick={onClick}
    className={`${STYLES.mobile.tab} ${
      isActive ? STYLES.mobile.activeTab : STYLES.mobile.inactiveTab
    }`}
  >
    {label}
  </button>
);

const CollabButton = ({ className }: { className?: string }) => (
  <Link href="/contact" className={`${STYLES.sidebar.button} ${className || ''}`}>
    Collab with Us
  </Link>
);

const ProjectSidebar = ({ onProjectHover, onProjectLeave }: ProjectSidebarProps) => (
  <motion.div 
    className={STYLES.sidebar.container}
    variants={fadeInUp}
    initial="hidden"
    animate="visible"
    transition={{ delay: 0.2 }}
  >
    <div className="flex flex-col min-h-0">
      <motion.h1 
        className={STYLES.sidebar.title}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        Projects
      </motion.h1>
      
      <motion.div 
        className={STYLES.sidebar.listContainer}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {events.map((event) => (
          <motion.div
            key={event.slug}
            variants={fadeInUp}
            whileHover="hover"
          >
            <Link
              href={`/projects/${event.slug}`}
              className={STYLES.sidebar.listItem}
              onMouseEnter={() => onProjectHover(event.slug)}
              onMouseLeave={onProjectLeave}
            >
              {event.title}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
    
    <motion.div 
      className="mt-8"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.6 }}
      whileHover="hover"
    >
      <CollabButton />
    </motion.div>
  </motion.div>
);

const MobileProjectList = () => (
  <motion.div 
    className={STYLES.mobile.list.container}
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
  >
    {events.map((event) => (
      <motion.div
        key={event.slug}
        variants={fadeInUp}
        whileHover={scaleOnHover.hover}
      >
        <Link
          href={`/projects/${event.slug}`}
          className={STYLES.mobile.list.item}
        >
          <div className={STYLES.mobile.list.image}>
            <img
              src={event.projectcard}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={STYLES.mobile.list.content}>
            <h3 className={STYLES.mobile.list.title}>{event.title}</h3>
            <p className={STYLES.mobile.list.description}>{event.ethos}</p>
          </div>
        </Link>
      </motion.div>
    ))}
  </motion.div>
);

function MobileProjectTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('featured');

  return (
    <motion.div 
      className={STYLES.mobile.container}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className={STYLES.mobile.title}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        Projects
      </motion.h1>
      
      <motion.div 
        className={STYLES.mobile.tabContainer}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <TabButton
          label="Featured"
          isActive={activeTab === 'featured'}
          onClick={() => setActiveTab('featured')}
        />
        <TabButton
          label="All"
          isActive={activeTab === 'all'}
          onClick={() => setActiveTab('all')}
        />
      </motion.div>

      <motion.div
        key={activeTab}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        {activeTab === 'featured' ? (
          <div className={STYLES.layout.mobileGrid}>
            <ProjectGrid hoveredProject={null} />
          </div>
        ) : (
          <MobileProjectList />
        )}
      </motion.div>
      
      <motion.div 
        className={STYLES.mobile.buttonContainer}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
        whileHover={scaleOnHover.hover}
      >
        <CollabButton />
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const { isMobile } = useResponsive();

  const handleProjectHover = (slug: string) => setHoveredProject(slug);
  const handleProjectLeave = () => setHoveredProject(null);

  if (isMobile) {
    return <MobileProjectTabs />;
  }

  return (
    <motion.div 
      className={STYLES.layout.desktop}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className={STYLES.layout.desktopMain}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        <ProjectGrid hoveredProject={hoveredProject} />
      </motion.div>
      
      <ProjectSidebar 
        onProjectHover={handleProjectHover}
        onProjectLeave={handleProjectLeave}
      />
    </motion.div>
  );
}