"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";

type DarshanImage = {
  title: string;
  url: string | null;
  type: number;
};

export default function DailyDarshanPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawDateParam = searchParams.get("date");
  
  const [selectedDate, setSelectedDate] = useState<string | null>(rawDateParam);
  const [recentDates, setRecentDates] = useState<string[]>([]);
  const [images, setImages] = useState<DarshanImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Fetch recent dates
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch("/api/darshans/recent");
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          const dates = json.data.map((row: any) => row.date);
          setRecentDates(dates);
          // If no date is selected in URL, pick the most recent available!
          if (!rawDateParam) {
            setSelectedDate(dates[0]);
          }
        } else {
          setIsLoading(false); // DB might be entirely empty
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecent();
  }, [rawDateParam]);

  // Fetch specific date data
  useEffect(() => {
    if (!selectedDate) return;

    const fetchDarshan = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/darshans?date=${selectedDate}`);
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setImages(json.data[0].images || []);
        } else {
          setImages([]); // Empty state
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDarshan();
  }, [selectedDate]);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    // Optionally update URL to allow sharing specific days
    router.replace(`/daily-darshan?date=${date}`, { scroll: false });
  };

  // Helper to format Date string
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(d);
  };
  
  const formatFullDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(d);
  };

  // Safe getter for specific slot (fallback if empty)
  const getImage = (slotId: number) => {
    return images.find(img => img.type === slotId) || { title: "Awaiting Frame", url: null };
  };

  // Premium Stagger Animations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98, filter: "blur(8px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <div className="bg-[#050505] text-[#e5e2e1] font-['Manrope'] selection:bg-[#C5A059] selection:text-[#1a1400] min-h-screen relative overflow-x-hidden">
      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-md cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={fullscreenImage}
              alt="Darshan Fullscreen"
              className="max-w-full max-h-full object-contain rounded-none shadow-2xl"
            />
            <button 
              onClick={() => setFullscreenImage(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 bg-black/50 hover:bg-[#C5A059]/20 text-white/50 hover:text-white p-3 rounded-none transition-all duration-300 backdrop-blur-md border border-white/10"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deep Immersive Background Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#050505] opacity-90" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#C5A059]/5 rounded-none blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#C5A059]/5 rounded-none blur-[200px]" />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,700;1,400&family=Manrope:wght@300;400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Top Left Logo Redirect */}
      <div 
        onClick={() => router.push('/')}
        className="absolute top-6 left-6 md:top-8 md:left-10 z-50 cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-300"
        title="Return to Home"
      >
        <Image 
          src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/logo.png" 
          alt="ISKCON Logo" 
          width={160}
          height={80}
          className="w-24 h-auto md:w-32 lg:w-40 drop-shadow-2xl" 
        />
      </div>

      {/* Main Content Area - Rebuilt to prevent overlap */}
      <main className="relative z-10 pt-32 pb-32 px-4 md:px-12 lg:px-24 max-w-[2000px] mx-auto min-h-screen flex flex-col items-center">
        
        {/* Title Section */}
        <header className="w-full max-w-6xl flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-['Noto_Serif'] font-light text-5xl md:text-7xl text-white mb-4 tracking-tight drop-shadow-lg">
              Today's <span className="italic text-[#C5A059]">Darshan</span>
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-[#C5A059] to-transparent"></div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-left md:text-right">
            <p className="font-['Manrope'] uppercase font-semibold tracking-[0.3em] text-[#C5A059]/60 text-[10px] mb-2">Sacred Date</p>
            <AnimatePresence mode="wait">
              <motion.p key={selectedDate || "empty"} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="font-['Noto_Serif'] text-xl md:text-2xl text-white/90">
                {selectedDate ? formatFullDate(selectedDate) : "Awaiting Selection"}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </header>

        {/* Sleek Archive Navigation (Non-Sticky to prevent scrolling bugs) */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="w-full max-w-6xl mb-16 relative">
          <div className="relative border-y border-white/10 py-5 flex items-center gap-8 overflow-x-auto no-scrollbar mask-edges">
            <span className="font-['Manrope'] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/40 whitespace-nowrap pl-2">Past Archives</span>
            {recentDates.length === 0 && <span className="text-white/20 text-xs italic">No dates available</span>}
            
            <div className="flex gap-6 pr-6">
              {recentDates.map((d, index) => {
                const isActive = d === selectedDate;
                return (
                  <button
                    key={d}
                    onClick={() => handleDateClick(d)}
                    className={`font-['Manrope'] text-xs sm:text-sm uppercase tracking-widest whitespace-nowrap transition-all duration-300
                      ${isActive 
                        ? "text-[#C5A059] font-bold" 
                        : "text-white/60 hover:text-white"
                      }`}
                  >
                    {index === 0 ? "Latest" : formatDate(d)}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Gallery Section */}
        {isLoading ? (
          <div className="w-full flex justify-center py-40">
             <div className="w-12 h-12 border-2 border-white/10 border-t-[#C5A059] rounded-none animate-spin"></div>
          </div>
        ) : images.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl py-32 text-center bg-white/5 border border-white/5 rounded-none backdrop-blur-sm shadow-2xl">
            <span className="material-symbols-outlined text-[48px] text-white/20 mb-6 block">visibility_off</span>
            <p className="font-['Noto_Serif'] text-2xl text-white mb-2">No Darshan Published</p>
            <p className="font-['Manrope'] text-white/40 text-sm mb-8">The sacred viewing for this date has not been released yet.</p>
            <button onClick={() => router.push('/admin/darshan')} className="font-['Manrope'] text-xs uppercase font-bold tracking-[0.2em] text-[#C5A059] bg-[#C5A059]/10 hover:bg-[#C5A059]/20 px-8 py-4 rounded-none transition-all">Go to Upload Portal</button>
          </motion.div>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-center gap-4 mb-12 text-[#C5A059]/40">
              <span className="h-px w-12 bg-gradient-to-l from-[#C5A059]/40 to-transparent"></span>
              <span className="material-symbols-outlined text-sm">photo_library</span>
              <span className="h-px w-12 bg-gradient-to-r from-[#C5A059]/40 to-transparent"></span>
            </div>

            {/* Flexible Centered Layout for Proper Sequence and Exact Gaping */}
            <motion.div 
              variants={containerVariants} 
              initial="hidden" 
              animate="show"
              key={selectedDate} // Re-trigger animations on date change
              className="w-full max-w-7xl mx-auto flex flex-wrap justify-center gap-8 md:gap-12 items-center"
            >
              {images
                .filter(img => img.url)
                .sort((a, b) => a.type - b.type) // STRICTLY enforce uploaded sequence
                .map((img, i) => (
                  <motion.div 
                    key={i} 
                    variants={itemVariants} 
                    onClick={() => setFullscreenImage(img.url)}
                    className="w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-3rem)] min-w-[280px] max-w-md group relative rounded-none overflow-hidden bg-[#111111]/80 backdrop-blur-sm border border-white/5 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-[#C5A059]/10 hover:-translate-y-2 cursor-zoom-in"
                  >
                    <div className="w-full relative overflow-hidden bg-black flex items-center justify-center min-h-[300px]">
                      {/* Image scales up slightly on hover while maintaining aspect ratio perfectly */}
                      <Image 
                        src={img.url!} 
                        alt={`Daily Darshan - Upload ${i + 1}`}
                        fill
                        className="object-contain transition-transform duration-1000 ease-out group-hover:scale-[1.03]" 
                        loading="lazy"
                      />
                      
                      {/* Premium Edge Glow Effect on Hover */}
                      <div className="absolute inset-0 border border-[#C5A059]/0 group-hover:border-[#C5A059]/30 transition-colors duration-500 rounded-none pointer-events-none z-10" />
                    </div>
                  </motion.div>
                ))
              }
            </motion.div>
          </div>
        )}
      </main>

      {/* Dark Theme Footer */}
      <footer className="bg-black border-t border-white/5 pt-20 pb-10 flex flex-col items-center justify-center gap-10 px-6 text-center relative z-20">
        <div className="text-[#C5A059] font-['Noto_Serif'] text-xl mb-4">Sacred Sanctuary</div>
        <div className="flex gap-8 md:gap-12 items-center justify-center flex-wrap max-w-2xl">
          <button className="font-['Manrope'] text-[10px] md:text-xs uppercase font-semibold tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300">Privacy Policy</button>
          <button className="font-['Manrope'] text-[10px] md:text-xs uppercase font-semibold tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300">Guidelines</button>
          <button className="font-['Manrope'] text-[10px] md:text-xs uppercase font-semibold tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300">Contact</button>
        </div>
        
        <div className="flex gap-6 opacity-60">
          <span className="material-symbols-outlined text-white hover:text-[#C5A059] cursor-pointer transition-colors">temple_hindu</span>
          <span className="material-symbols-outlined text-white hover:text-[#C5A059] cursor-pointer transition-colors">favorite</span>
        </div>
        
        <p className="font-['Manrope'] text-[10px] uppercase tracking-[0.2em] text-white/20 mt-8">© {new Date().getFullYear()} ISKCON. The Sanctuary is Eternal.</p>
      </footer>
    </div>
  );
}
