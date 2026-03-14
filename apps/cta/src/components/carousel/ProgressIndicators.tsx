import React from "react";

interface ProgressIndicatorsProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

export default function ProgressIndicators({ total, current, onChange }: ProgressIndicatorsProps) {
  return (
    <div className="flex gap-3 mb-6 sm:mb-10 justify-center items-center relative z-20">
      {Array.from({ length: total }).map((_, idx) => {
        const isActive = current === idx;
        return (
          <button
            key={idx}
            onClick={() => onChange(idx)}
            className={`h-2 rounded-full transition-all duration-300 flex items-center justify-center ${
              isActive ? "w-8 bg-[#789D8E]" : "w-2 bg-gray-200 hover:bg-gray-300"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        );
      })}
    </div>
  );
}
