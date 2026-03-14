import React from "react";
import { SlideData } from "./types";

interface SlideContentProps {
  slide: SlideData;
}

export default function SlideContent({ slide }: SlideContentProps) {
  const Icon = slide.icon;

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Slide Header */}
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F8FAF8] rounded-2xl flex items-center justify-center shadow-inner mb-6 border border-[#789D8E]/10 flex-shrink-0">
          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#789D8E]" />
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
          {slide.headline}
        </h2>
        <p className="text-xl sm:text-2xl text-[#E9C46A] font-semibold">
          {slide.subline}
        </p>
      </div>

      {/* Slide Body */}
      {slide.body && (
        <div className="mt-8 text-left max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {slide.body}
        </div>
      )}
    </div>
  );
}
