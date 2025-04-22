"use client"
import { AnimatePresence, motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function ImageSlider() {
    const images: string[] = [
        "/assets/samp1.png", 
        "/assets/samp2.jpeg",
        "/assets/samp3.png",
        "/assets/samp4.jpg",
        "/assets/samp5.jpg",
        "/assets/samp6.jpeg",
        "/assets/samp7.jpg",
    ]

    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [direction, setDirection] = useState<number>(1)
    
    // Auto-transition logic
    useEffect(() => {
        // Set up interval for automatic transitions
        const intervalId = setInterval(() => {
            // Move to the next image
            const nextIndex = (selectedIndex + 1) % images.length
            setSelectedIndex(nextIndex)
            setDirection(1) // Always move forward for auto-transitions
        }, 3000) // Change image every 4 seconds (adjust as needed)
        
        // Clean up interval on component unmount
        return () => clearInterval(intervalId)
    }, [selectedIndex, images.length])

    function handleSlide(newDirection: number): void {
        const nextIndex = (selectedIndex + newDirection + images.length) % images.length
        setSelectedIndex(nextIndex)
        setDirection(newDirection)
    }

    // Use a fixed color
    const buttonColor = "#2E8B57"

    return (
        <div className="relative py-12 px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#2E8B57]">
                Our Sample Archive
            </h2>
            
            <div className="flex justify-center items-center gap-4 max-w-4xl mx-auto">
                <motion.button
                    initial={false}
                    animate={{ backgroundColor: buttonColor }}
                    aria-label="Previous"
                    className="flex-none w-10 h-10 rounded-full flex items-center justify-center z-10 border-none cursor-pointer"
                    onClick={() => handleSlide(-1)}
                    whileFocus={{ outline: `2px solid ${buttonColor}` }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ArrowLeft />
                </motion.button>

                <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
                    <AnimatePresence initial={false} mode="wait">
                        <motion.div
                            key={selectedIndex}
                            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 300, 
                                damping: 30,
                                opacity: { duration: 0.2 }
                            }}
                            className="absolute inset-0"
                        >
                            <div className="relative w-full h-full">
                                <img 
                                    src={images[selectedIndex]} 
                                    alt={`Sample image ${selectedIndex + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <motion.button
                    initial={false}
                    animate={{ backgroundColor: buttonColor }}
                    aria-label="Next"
                    className="flex-none w-10 h-10 rounded-full flex items-center justify-center z-10 border-none cursor-pointer"
                    onClick={() => handleSlide(1)}
                    whileFocus={{ outline: `2px solid ${buttonColor}` }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ArrowRight />
                </motion.button>
            </div>
            
            {/* Image indicators/dots */}
            <div className="flex justify-center mt-6 space-x-2">
                {images.map((_, index) => (
                    <motion.button
                        key={index}
                        className="w-3 h-3 rounded-full cursor-pointer"
                        initial={false}
                        animate={{
                            backgroundColor: index === selectedIndex ? buttonColor : "#4B5563",
                            scale: index === selectedIndex ? 1.2 : 1
                        }}
                        onClick={() => {
                            setDirection(index > selectedIndex ? 1 : -1);
                            setSelectedIndex(index);
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

// Arrow Icons
function ArrowLeft() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m12 19-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 12H5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

function ArrowRight() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="m12 5 7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}