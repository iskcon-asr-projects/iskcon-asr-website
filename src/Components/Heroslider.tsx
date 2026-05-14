"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const IMAGES = Array.from({ length: 10 }, (unused: unknown, i: number) =>
  `https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/gaur-nitai/img_${String(i + 1).padStart(2, "0")}.png`
);

let savedIndex = 0;

export default function HeroSlider() {
  const [index, setIndex] = useState<number>(savedIndex);
  const [manualPaused, setManualPaused] = useState<boolean>(false);
  const [showOverlayIcon, setShowOverlayIcon] = useState<boolean>(false);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [pressTimer, setPressTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 150 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["1deg", "-1deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-1deg", "1deg"]);

  const paginate = useCallback((dir: number) => {
    setIndex((prev: number) => {
      const nextIndex = (prev + dir + IMAGES.length) % IMAGES.length;
      savedIndex = nextIndex;
      return nextIndex;
    });
  }, []);

  // Auto play
  useEffect(() => {
    if (manualPaused) return;
    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, [manualPaused, paginate]);

  const togglePause = () => {
    setManualPaused((prev: boolean) => !prev);
    setShowOverlayIcon(true);
    setTimeout(() => setShowOverlayIcon(false), 800);
  };

  // Mobile long press
  const handleTouchStart = () => {
    const timer = setTimeout(() => {
      togglePause();
    }, 600);
    setPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  return (
    <section
      style={{ willChange: "transform" }}
      className="relative w-full bg-black h-auto aspect-[3/4] md:aspect-auto md:h-[90vh] overflow-hidden"
    >
      {/* MAIN WRAPPER - Added overflow-hidden to clip any drag offsets */}
      <motion.div
        style={isMobile ? {} : { rotateX, rotateY }}
        className="relative w-full h-full overflow-hidden"
        onDoubleClick={() => {
          if (!isMobile) togglePause();
        }}
      >
        {/* IMAGE */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full"
          >
            <img
              src={IMAGES[index]}
              alt="Darshan"
              className="w-full h-full object-contain md:object-cover bg-black"
              draggable={false}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
            {/* Vintage Cinematic Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_100%)] pointer-events-none opacity-90" />
            <div className="absolute inset-0 ring-1 ring-[#C5A059]/25 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* CLICK OVERLAY */}
        <div
          className="absolute inset-0 z-30"
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
            const x = event.clientX - rect.left;
            const width = rect.width;

            if (x < width * 0.33) {
              paginate(-1); // LEFT
            } else if (x > width * 0.66) {
              paginate(1); // RIGHT
            } else {
              togglePause(); // CENTER
            }
          }}
        />

        {/* MOBILE SWIPE - touch-action: pan-y prevents horizontal page jitter */}
        <motion.div
          className="md:hidden absolute inset-0 z-20"
          style={{ touchAction: "pan-y" }} 
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
            if (Math.abs(info.offset.x) < 30) return;
            if (info.offset.x > 0) paginate(-1);
            else paginate(1);
          }}
        />
      </motion.div>

      {/* ARROWS (DESKTOP) */}
      <div className="hidden md:flex absolute inset-0 items-center justify-between px-6 pointer-events-none z-40">
        <button
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            paginate(-1);
          }}
          className="pointer-events-auto w-16 h-16 flex items-center justify-center rounded-none border border-[#C5A059]/40 text-[#C5A059] bg-black/30 backdrop-blur-md hover:bg-[#C5A059]/20"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            paginate(1);
          }}
          className="pointer-events-auto w-16 h-16 flex items-center justify-center rounded-none border border-[#C5A059]/40 text-[#C5A059] bg-black/30 backdrop-blur-md hover:bg-[#C5A059]/20"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* PAUSE / PLAY OVERLAY */}
      <AnimatePresence>
        {showOverlayIcon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="w-20 h-20 flex items-center justify-center rounded-none border border-[#C5A059]/40 bg-black/60 backdrop-blur-md shadow-[0_0_30px_rgba(197,160,89,0.3)]">
              {manualPaused ? (
                <Play size={36} className="text-[#C5A059] fill-[#C5A059]" />
              ) : (
                <Pause size={36} className="text-[#C5A059] fill-[#C5A059]" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INDICATORS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {IMAGES.map((unused: string, i: number) => (
          <button
            key={i}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              setIndex(i);
              savedIndex = i;
            }}
            className="py-2"
          >
            <div
              className={`transition-all duration-300 ${
                i === index
                  ? "w-8 h-[3px] bg-[#C5A059]"
                  : "w-4 h-[2px] bg-white/30"
              }`}
            />
          </button>
        ))}
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[#121212] pointer-events-none" />
    </section>
  );
}
