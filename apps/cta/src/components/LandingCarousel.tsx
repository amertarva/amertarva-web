"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slides } from "./carousel/data";
import ProgressIndicators from "./carousel/ProgressIndicators";
import NavigationControls from "./carousel/NavigationControls";
import SlideContent from "./carousel/SlideContent";

export default function LandingCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  const setSlide = (newIndex: number) => {
    setDirection(newIndex > current ? 1 : -1);
    setCurrent(newIndex);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const slide = slides[current];

  return (
    <div className="w-full min-h-screen bg-[#F8FAF8] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#789D8E] rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#E9C46A] rounded-full blur-[120px] opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col h-[85vh] sm:h-[70vh] min-h-[600px]">
        
        <ProgressIndicators 
          total={slides.length} 
          current={current} 
          onChange={setSlide} 
        />

        {/* Carousel Container */}
        <div className="flex-1 relative bg-white/60 backdrop-blur-xl rounded-3xl sm:rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden flex flex-col">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
              }}
              className="flex-1 w-full h-full flex flex-col justify-center p-8 sm:p-12 md:p-16"
            >
              <SlideContent slide={slide} />
            </motion.div>
          </AnimatePresence>

          <NavigationControls 
            onPrev={() => paginate(-1)} 
            onNext={() => paginate(1)} 
          />

        </div>
        
        {/* Footer */}
        <div className="mt-6 text-center text-gray-500 text-sm font-medium">
          Slide {current + 1} of {slides.length} • Gunakan tombol panah untuk navigasi
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(120, 157, 142, 0.3);
          border-radius: 20px;
        }
      `}} />
    </div>
  );
}
