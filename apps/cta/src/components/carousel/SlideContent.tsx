import React from "react";
import { SlideData } from "./types";
import { motion } from "framer-motion";

interface SlideContentProps {
  slide: SlideData;
}

export default function SlideContent({ slide }: SlideContentProps) {
  const Icon = slide.icon;

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col justify-center">
      {/* Slide Header */}
      <div className="mb-6 sm:mb-10 flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="mb-6 w-16 h-16 sm:w-20 sm:h-20 bg-[#F8FAF8] rounded-2xl flex items-center justify-center border border-gray-100 flex-shrink-0"
        >
          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#789D8E]" />
        </motion.div>
        
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4 tracking-tight"
        >
          {slide.headline}
        </motion.h2>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", delay: 0.3 }}
          className="text-lg sm:text-2xl text-[#E9C46A] font-bold tracking-tight max-w-2xl px-4"
        >
          {slide.subline}
        </motion.p>
      </div>

      {/* Slide Body */}
      {slide.body && (
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", delay: 0.4 }}
          className="mt-4 sm:mt-8 text-left w-full"
        >
          <div className="max-w-3xl mx-auto">
            {slide.body}
          </div>
        </motion.div>
      )}
    </div>
  );
}
