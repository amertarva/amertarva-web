import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function NavigationControls({ onPrev, onNext }: NavigationControlsProps) {
  return (
    <>
      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 flex items-center justify-start pl-2 sm:pl-6 pointer-events-none z-20">
        <button
          onClick={onPrev}
          className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#789D8E] hover:bg-gray-50 transition-all pointer-events-auto"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 flex items-center justify-end pr-2 sm:pr-6 pointer-events-none z-20">
        <button
          onClick={onNext}
          className="w-12 h-12 rounded-full bg-[#789D8E] flex items-center justify-center text-white hover:bg-[#608b7a] transition-all pointer-events-auto"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}
