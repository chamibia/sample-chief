"use client";

import { useState } from "react";
import Link from "next/link";

import { events } from '@/data/events';

import ProjectGrid from "../ProjectGrid";

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ label, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-sans font-medium text-lg transition-colors duration-200 ${
        isActive 
          ? 'border-b-2 border-[#202020] text-[#202020]' 
          : 'text-gray-600 hover:text-[#202020]'
      }`}
    >
      {label}
    </button>
  );
}

function MobileProjectList() {
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

export default function MobileProjectTabs() {
  const [activeTab, setActiveTab] = useState<'featured' | 'all'>('featured');

  return (
    <div className="p-5">
      <h1 className="font-ruder font-medium text-[#202020] text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] mb-8">
        Projects
      </h1>
      
      <div className="flex mb-6">
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
      </div>

      <div>
        {activeTab === 'featured' ? (
          <div className="h-[calc(100vh-200px)]">
            <ProjectGrid hoveredProject={null} />
          </div>
        ) : (
          <MobileProjectList />
        )}
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
  );
}