"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { slides } from "./carousel/data";
import SlideContent from "./carousel/SlideContent";

// Animasi Scroll Section yang halus menggunakan Framer Motion
function ScrollSection({ children, index }: { children: React.ReactNode, index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <div className="w-full min-h-[70vh] flex flex-col justify-center py-20 relative" ref={ref}>
      {/* Nomor Background (Parallax Effect) */}
      <motion.div 
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 1], [0, 0.4]),
          y: useTransform(scrollYProgress, [0, 1], [50, -20]) 
        }}
        className="absolute -top-10 left-0 sm:left-[-10%] text-[10rem] sm:text-[18rem] font-black text-gray-200/60 leading-none select-none z-0 pointer-events-none tracking-tighter"
      >
        0{index + 1}
      </motion.div>

      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-10 w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function LandingScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Progress bar menyusut ke bawah
  const progressBarHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-screen bg-[#F8FAF8] text-gray-900 font-sans relative selection:bg-[#789D8E] selection:text-white pb-32 overflow-hidden"
    >
      
      {/* Scroll Progress Line (Samping Kiri) */}
      <div className="fixed left-4 sm:left-10 top-1/4 bottom-1/4 w-1 bg-gray-200 rounded-full hidden md:block z-50 overflow-hidden">
        <motion.div 
          style={{ height: progressBarHeight }} 
          className="w-full bg-[#789D8E] rounded-full"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-12 lg:px-24">
        
        {/* Intro / Judul Utama */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center pt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-white text-[#789D8E] font-semibold text-sm tracking-widest uppercase mb-8">
              Amertarva Digitalisasi
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
              Transformasi <br className="hidden sm:block" />
              Sekolah ke Era <span className="text-[#789D8E]">Digital.</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-500 font-medium max-w-2xl mx-auto mb-12">
              Bukan sekadar mengganti kertas, tapi membangun sistem yang bekerja untuk Anda.
            </p>

            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="animate-bounce mt-16 text-gray-400 hover:text-[#789D8E] transition-colors focus:outline-none cursor-pointer"
            >
              <span className="text-sm font-semibold tracking-wider uppercase mb-2 block">Scroll ke bawah</span>
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.button>
          </motion.div>
        </section>

        {/* Konten Utama */}
        <div className="space-y-10 sm:space-y-20">
          {slides.map((slide, index) => (
            <ScrollSection key={slide.id} index={index}>
              <SlideContent slide={slide} />
            </ScrollSection>
          ))}
        </div>

      </div>

    </div>
  );
}
