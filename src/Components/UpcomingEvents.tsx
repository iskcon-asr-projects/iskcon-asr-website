"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
};

function EventCard({ event, day, month }: { event: Event; day: number; month: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-row items-stretch w-full rounded-none bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_60px_-15px_rgba(197,160,89,0.3)] hover:border-[#C5A059]/40 transition-colors duration-700 relative z-10"
    >
      <div 
        className="flex flex-row items-stretch w-full overflow-hidden rounded-none"
        style={{ transform: "translateZ(30px)" }} // Pop out the content slightly
      >
        {/* IMAGE */}
        <div className="w-[35%] md:w-[40%] h-[150px] md:h-[220px] overflow-hidden relative shrink-0 border-r border-white/5 group-hover:border-[#C5A059]/20 transition-colors duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent z-10 transition-opacity duration-700 group-hover:opacity-0" />
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-[0.25,1,0.5,1]"
          />
        </div>

        {/* CONTENT */}
        <div className="w-[65%] md:w-[60%] flex items-center gap-4 md:gap-8 px-5 py-6 md:px-10 md:py-8 relative overflow-hidden bg-white/[0.01]">
          {/* Subtle inner hover glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          {/* DATE BADGE */}
          <div className="shrink-0 min-w-[55px] h-[65px] md:min-w-[85px] md:h-[95px] rounded-none bg-gradient-to-b from-[#E2C792] via-[#C5A059] to-[#8A6D3B] flex flex-col items-center justify-center text-[#2A1D0C] font-bold shadow-[0_10px_20px_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.5)] group-hover:scale-105 group-hover:shadow-[0_15px_30px_rgba(197,160,89,0.4),inset_0_2px_3px_rgba(255,255,255,0.7)] transition-all duration-500 border border-[#F3E1B6]/30 relative overflow-hidden z-10" suppressHydrationWarning>
            <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/40 to-transparent opacity-80 pointer-events-none" />
            <span className="text-[20px] md:text-[32px] leading-none drop-shadow-sm relative z-10">{day}</span>
            <span className="text-[9px] md:text-[12px] uppercase tracking-[0.2em] relative z-10 opacity-80 mt-1 md:mt-1.5">{month}</span>
          </div>

          {/* TEXT */}
          <div className="flex flex-col overflow-hidden w-full relative z-10">
            <h3 className="text-[15px] md:text-[22px] leading-tight font-serif font-bold text-white/95 group-hover:text-[#E2C792] transition-colors truncate drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {event.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-[11px] md:text-[15px] text-white/50 group-hover:text-white/70 mt-1.5 md:mt-3 line-clamp-2 md:line-clamp-3 leading-relaxed transition-colors duration-500">
              {event.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    
    // Ensure loading state doesn't stay forever
    const fallbackTimer = setTimeout(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    }, 7000); // 7 seconds safety cap

    const loadEvents = async () => {
      try {
        const res = await fetch("/api/events", { 
          signal: controller.signal,
          cache: 'no-store' // Avoid stale cache issues
        });
        
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        
        if (isMounted) {
          setEvents(data.data || []);
          setIsLoading(false);
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error("Error fetching events:", err);
          if (isMounted) setIsLoading(false);
        }
      } finally {
        if (isMounted) {
          clearTimeout(fallbackTimer);
        }
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
      controller.abort();
      clearTimeout(fallbackTimer);
    };
  }, []);


  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-none animate-spin" />
          <p className="text-gold/60 text-xs tracking-widest uppercase font-bold">Seeking Events...</p>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="w-full flex flex-col items-center py-20 px-6">
        <div className="max-w-2xl w-full bg-white/[0.02] border border-white/5 rounded-none p-12 text-center backdrop-blur-sm">
          <div className="w-16 h-16 bg-gold/10 rounded-none flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-[#C5A059] opacity-50">calendar_today</span>
          </div>
          <h3 className="text-white text-2xl font-serif mb-2">No Upcoming Events</h3>
          <p className="text-white/40 text-sm font-light">Stay tuned for sacred gatherings and festive celebrations.</p>
        </div>
      </div>
    );
  }


  return (
    <section className="h-auto bg-transparent text-white px-6 pt-10 pb-24 flex justify-center relative w-full perspective-[1200px]">
      {/* Animated Background Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[20%] w-[400px] md:w-[700px] h-[400px] md:h-[500px] bg-[#C5A059]/20 blur-[130px] rounded-none pointer-events-none"
      />
      <motion.div 
        animate={{ x: [0, -40, 0], y: [0, 30, 0], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[20%] right-[10%] w-[350px] md:w-[600px] h-[300px] md:h-[400px] bg-[#8c703b] blur-[150px] rounded-none pointer-events-none"
      />

      <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 px-4 relative z-10">
        
        {/* SECTION TITLE */}
        <div className="flex justify-center mb-12 mt-6 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-10 py-3 md:px-14 md:py-4 rounded-none bg-gradient-to-b from-white/[0.06] to-transparent backdrop-blur-3xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(197,160,89,0.25)] transition-shadow duration-700"
          >
            <h2 className="text-[12px] md:text-[14px] tracking-[0.6em] uppercase text-[#E2C792] font-sans font-bold text-center drop-shadow-[0_0_15px_rgba(197,160,89,0.5)]">
              Upcoming Events
            </h2>
          </motion.div>
        </div>

        {/* EVENTS */}
        <div className="flex flex-col gap-8">
          {sortedEvents.map((event) => {
            const date = new Date(event.date);
            const day = date.getDate();
            const month = date.toLocaleString("en-IN", { month: "short" });
            return <EventCard key={event.id} event={event} day={day} month={month} />;
          })}
        </div>
      </div>
    </section>
  );
}
