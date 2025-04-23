"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function About() {
  const partners = [
    { id: 1,  logo: "/assets/ace.png" },
    { id: 2, logo: "/assets/holts.png" },
    { id: 3, logo: "/assets/okay.png" },
    { id: 4, logo: "/assets/sony.png" },
    { id: 5, logo: "/assets/standard.jpg" },
    { id: 6, logo: "/assets/sway.png" },
    { id: 7, logo: "/assets/universal.png" },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
        <div className="relative mb-16">
          <h1 className="text-8xl font-bold brush-title">About</h1>
        </div>
          <div className="mb-24">
          <div className="section-header">
            <span className="section-title">Our Story</span>
          </div>
            <div className="about-card">
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-2">
                <div className="info-block">
                  
                  <div className="mt-4">
                    <p className="text-sm uppercase text-[#F4C430] font-medium">WHO WE ARE</p>
                  </div>
                </div>
              </div>
                <div className="md:col-span-8">
                <motion.div 
                  className="mission-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="mission-text">
                    Sample Chief is a global community that celebrates African music culture. We're based in London, Toronto, Montreal and Lagos (Nigeria).
                  </p>
                  <p className="mission-text">
                    Our mission is to promote music discovery by creating interactive experiences for a global audience, through media and events.
                  </p>
                  <p className="mission-text ">
                    We connect brands to a vibrant youth audience that is interested in digital content and music experiences.
                  </p>
                </motion.div>
              </div>
              
              <div className="md:col-span-2">
                <div className="info-block">
        
                  <div className="mt-4">
                    <p className="text-sm uppercase text-[#F4C430] font-medium">ESTABLISHED</p>
                    <p className="font-bold text-xl text-[#F4C430]">2020</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div className="mt-20">
          <div className="section-header">
            <span className="section-title">Our Collaborations</span>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mx-auto max-w-5xl mt-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {partners.map((partner) => (
              <motion.div
                key={partner.id}
                className="partner-card"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex items-center justify-center h-20 w-full">
                  <Image
                    src={partner.logo}
                      alt="logo"
                      width={500}
                      height={500}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="brush-texture" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence baseFrequency="0.01" numOctaves="3" seed="1" />
          <feDisplacementMap in="SourceGraphic" scale="10" />
        </filter>
      </svg>
      
      {/* CSS for custom styling */}
      <style jsx global>{`
        /* Import brush font */
        @import url('https://fonts.cdnfonts.com/css/magic-brush');
        
        /* Brushstroke title */
        .brush-title {
          font-family: 'Magic Brush', sans-serif;
          color: #006636;
          text-align: right;
          line-height: 0.9;
          position: relative;
          z-index: 1;
        }
        
        /* Section header styling */
        .section-header {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .section-title {
          font-family: 'Magic Brush', sans-serif;
          font-size: 2rem;
          color:  #D72638;
          margin-right: 1rem;
          white-space: nowrap;
        }
        
        .about-card {
          background-color: #FFFFFF;
          border-radius: 12px;
          padding: 3rem 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

        }
        
        .info-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .mission-content {
          border-radius: 8px;
          padding: 2rem;
        }
        
        .mission-text {
          line-height: 1.8;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
          text-align: center;
        }
        
        .mission-text:last-child {
          margin-bottom: 0;
        }
       .partner-card {
          background-color: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.3s ease;
          height: 100%;
        }
        
        .partner-name {
          margin-top: 1rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: #006636;
          text-align: center;
        }
        
        /* Brand statement styling */
        .brand-statement {
          background-color: #F9F9F9;
          border-radius: 12px;
          padding: 3rem 2rem;
          text-align: center;
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }
      
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .brush-title {
            text-align: center;
            font-size: 4rem;
          }
          
          .about-card {
            padding: 2rem 1rem;
          }
          
          .mission-content {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}