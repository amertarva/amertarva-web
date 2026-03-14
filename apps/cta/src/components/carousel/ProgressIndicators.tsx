import React from "react";

interface ProgressIndicatorsProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

export default function ProgressIndicators({ total, current, onChange }: ProgressIndicatorsProps) {
  return (
    <div className="flex gap-2 mb-8 justify-center">
      {Array.from({ length: total }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onChange(idx)}
          className={`h-2 rounded-full transition-all duration-300 ${
            current === idx ? "w-8 bg-[#789D8E]" : "w-2 bg-[#789D8E]/30"
          }`}
          aria-label={`Go to slide ${idx + 1}`}
        />
      ))}
    </div>
  );
}
