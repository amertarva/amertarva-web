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
      x: direction > 0 ? 800 : -800,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 800 : -800,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? -15 : 15,
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
    <div className="w-full min-h-screen bg-[#F8FAF8] flex items-center justify-center py-6 sm:py-12 px-2 sm:px-6 lg:px-8 font-sans overflow-hidden relative selection:bg-[#789D8E] selection:text-white">
      
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col h-[90vh] sm:h-[80vh] min-h-[650px] perspective-1000">
        
        <ProgressIndicators 
          total={slides.length} 
          current={current} 
          onChange={setSlide} 
        />

        {/* Carousel Container */}
        <div className="flex-1 relative bg-white rounded-3xl sm:rounded-[2.5rem] border border-gray-200 overflow-hidden flex flex-col transform-gpu">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 250, damping: 25 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                rotateY: { duration: 0.4 }
              }}
              className="flex-1 w-full h-full flex flex-col justify-center p-6 sm:p-12 md:p-20"
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
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-gray-500 text-sm font-medium tracking-wide flex items-center justify-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#789D8E]"></span>
          Slide {current + 1} of {slides.length} • Digitalisasi Sekolah Masa Depan
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(120, 157, 142, 0.4); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: rgba(120, 157, 142, 0.8); }
        ::selection { background-color: #789D8E; color: white; }
      `}} />
    </div>
  );
}
