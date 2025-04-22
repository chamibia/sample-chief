"use client";
"use client";
import ImageSlider from "@/components/layout/ImageSlider";

export default function About() {
  return (
    <div className="min-h-screen relative">
      {/* Background split */}
      <div className="absolute inset-0 z-0">
        <div className="h-1/2 bg-[#ffffff]"></div>
        <div className="h-1/2 bg-white"></div>
      </div>
  
      {/* Content overlay */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-8xl font-bold tracking-tight mb-16 text-black text-right" style={{ fontWeight: 400, lineHeight: '0.9' }}>
          About
        </h1>
          
          {/* Optional subtitle or count indicator similar to "Total Events" */}
          <div className="mb-12 flex items-center">
            <span className="text-2xl text-[#F4C430] opacity-70">Our Story → </span>
          </div>
          
          {/* About Content */}
          <div className="space-y-12">
            <div className="grid md:grid-cols-12 gap-6">
              {/* Left column - could be for dates in events, could be for categories or sections in about */}
              <div className="md:col-span-2">
                <div className="space-y-1">
                  <p className="text-sm uppercase text-[#F4C430] opacity-70">WHO WE ARE</p>
                </div>
              </div>
              
              {/* Middle column - for content, similar to the image and details in events */}
              <div className="md:col-span-8">
                <p className="text-lg mb-6 text-center">
                  Sample Chief is a global community that celebrates African music culture. We're based in London, Toronto, Montreal and Lagos (Nigeria).
                </p>
                <p className="text-lg mb-6 text-center">
                  Our mission is to promote music discovery by creating interactive experiences for a global audience, through media and events.
                </p>
                <p className="text-lg text-center">
                  We connect brands to a vibrant youth audience that is interested in digital content and music experiences.
                </p>
              </div>
              
              {/* Right column - could be for additional info, similar to venue in events */}
              <div className="md:col-span-2">
                <div className="space-y-1">
                  <p className="text-sm uppercase text-[#F4C430] opacity-70">ESTABLISHED</p>
                  <p className="font-medium text-[#F4C430]">2020</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image Slider Section - positioned in the lower half with white background */}
          <div className="mt-20 pt-12">
            <ImageSlider />
          </div>
        </div>
      </div>
    </div>
  )
}