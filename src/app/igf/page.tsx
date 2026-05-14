"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  Pin,
  Camera,
  Play,
  Users,
  BookOpen,
  Sparkles
} from "lucide-react";
import Header from "@/Components/Header";
import StaggeredEntry from "@/Components/StaggeredEntry";

type IGFMedia = {
  id: string;
  type: string;
  content: string;
  is_pinned: boolean;
  class_type?: string;
  date?: string;
};

export default function IGFPage() {
  const [classesMedia, setClassesMedia] = useState<IGFMedia[]>([]);
  const [activitiesMedia, setActivitiesMedia] = useState<IGFMedia[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/igf/classes').then(res => res.json()),
      fetch('/api/igf/activities').then(res => res.json())
    ]).then(([classes, activities]) => {
      setClassesMedia(classes.data || []);
      setActivitiesMedia(activities.data || []);
      setIsLoading(false);
    }).catch(console.error);
  }, []);

  const getInstagramEmbedUrl = (content: string) => {
    if (content.trim().startsWith('http')) {
      return `${content.split('?')[0].replace(/\/$/, '')}/embed`;
    }
    const match = content.match(/data-instgrm-permalink="([^"]+)"/);
    if (match) return `${match[1].split('?')[0].replace(/\/$/, '')}/embed`;
    return null;
  };

  const sundayMedia = useMemo(() => {
    const filtered = classesMedia.filter(m => m.class_type === 'sunday');
    const pinned = filtered.filter(m => m.is_pinned);
    return [...pinned, ...filtered.filter(m => !m.is_pinned)].slice(0, 5);
  }, [classesMedia]);

  const lilamrtaMedia = useMemo(() => {
    const filtered = classesMedia.filter(m => m.class_type === 'lilamrta');
    const pinned = filtered.filter(m => m.is_pinned);
    return [...pinned, ...filtered.filter(m => !m.is_pinned)].slice(0, 5);
  }, [classesMedia]);

  const featuredActivities = useMemo(() => {
    const pinned = activitiesMedia.filter(m => m.is_pinned);
    return [...pinned, ...activitiesMedia.filter(m => !m.is_pinned)].slice(0, 10);
  }, [activitiesMedia]);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#C5A059]/30 selection:text-[#C5A059] overflow-x-hidden">
      <Header onlyLogo={true} />

      <div className="pt-40 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto relative z-10">
        
        {/* BACK LINK */}
        <StaggeredEntry delay={0}>
          <Link 
            href="/"
            className="group inline-flex items-center gap-2 text-white/40 hover:text-[#C5A059] transition-all mb-16"
          >
            <div className="w-8 h-px bg-white/10 group-hover:bg-[#C5A059]/50 transition-all" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Back to Home</span>
          </Link>
        </StaggeredEntry>

        {/* HERO */}
        <header className="mb-24">
          <StaggeredEntry delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#C5A059]/50" />
              <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.5em] font-bold">Community</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight">
              ISKCON <span className="text-[#C5A059] italic">Girls Forum</span>
            </h1>
            <p className="text-white/40 max-w-2xl text-lg md:text-xl font-light leading-relaxed font-sans">
              A sacred space for young women to explore spiritual wisdom, cultivate character, and build lasting friendships centered around Krishna.
            </p>
          </StaggeredEntry>
        </header>

        {/* CLASSES & ANNOUNCEMENTS */}
        <section className="mb-40 space-y-12">
          {/* Sunday Class */}
          <StaggeredEntry delay={0.2}>
            <div className="bg-[#0a0a0a] border border-white/5 p-10 md:p-16 relative overflow-hidden group hover:border-[#C5A059]/20 transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 blur-[100px]" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center gap-3 text-[#C5A059] mb-8">
                    <Calendar size={18} />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Every Sunday</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">Sunday <span className="italic text-[#C5A059]">Special</span></h2>
                  <div className="space-y-6 mb-12">
                    <div className="flex items-center gap-4 text-white/60">
                      <Clock size={20} className="text-[#C5A059]" />
                      <span className="text-lg tracking-wide font-light italic">4:00 PM — 6:00 PM</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/60">
                      <Sparkles size={20} className="text-[#C5A059]" />
                      <span className="text-lg tracking-wide font-light">Sri Sri Gaur Nitai Mandir, Fatehgarh Churian Road, Vrindavan Gardens, Amritsar - 143008</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-6 mb-12">
                    <a href="tel:+918872845687" className="flex items-center gap-3 px-8 py-5 bg-[#C5A059] text-black text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-[#C5A059]/10">
                      <Phone size={16} /> Contact: 8872845687
                    </a>
                    <a href="https://wa.me/918872845687" className="flex items-center gap-3 px-8 py-5 bg-white/5 border border-white/10 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                      <MessageCircle size={16} className="text-[#25D366]" /> Join WhatsApp
                    </a>
                  </div>
                </div>

                {/* Sunday Photos Preview */}
                <div className="flex flex-col justify-end">
                  <div className="grid grid-cols-5 gap-3">
                     {sundayMedia.map((m, i) => (
                       <div key={i} className="aspect-square bg-white/5 border border-white/5 overflow-hidden relative group/img">
                         {m.type === 'instagram_link' ? (
                           <iframe src={getInstagramEmbedUrl(m.content) || ""} className="w-full h-full scale-[2.5]" scrolling="no" />
                         ) : (
                           <img src={m.content} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                         )}
                         {m.is_pinned && <Pin size={8} className="absolute top-2 right-2 text-[#C5A059] fill-current" />}
                       </div>
                     ))}
                     {[...Array(Math.max(0, 5 - sundayMedia.length))].map((_, i) => (
                       <div key={i} className="aspect-square bg-white/[0.02] border border-dashed border-white/5 flex items-center justify-center">
                         <Camera size={14} className="text-white/5" />
                       </div>
                     ))}
                  </div>
                  <p className="mt-4 text-right text-[9px] uppercase tracking-[0.4em] text-white/20 font-bold">Moments from Sunday Class</p>
                </div>
              </div>
            </div>
          </StaggeredEntry>

          {/* Lilamrta Announcement Banner */}
          <StaggeredEntry delay={0.3}>
            <div className="relative group overflow-hidden bg-gradient-to-r from-[#121212] to-[#080808] border border-white/5 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 hover:border-[#C5A059]/20 transition-all">
              <div className="absolute top-0 right-0 w-96 h-full bg-[#C5A059]/[0.02] -skew-x-12 translate-x-1/2" />
              
              <div className="flex items-center gap-8 relative z-10">
                <div className="w-16 h-16 shrink-0 bg-[#C5A059]/10 border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059]">
                  <BookOpen size={28} />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
                    Srila Prabhupada <span className="italic text-[#C5A059]">Lilamrta</span>
                  </h3>
                  <div className="flex flex-wrap items-center gap-6 text-white/40">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-[#C5A059]" />
                      <span className="text-[10px] uppercase tracking-widest font-bold">Mon | Wed | Fri</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-[#C5A059]" />
                      <span className="text-[10px] uppercase tracking-widest font-bold italic">8:30 PM — 9:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              <a 
                href="https://wa.me/918872845687" 
                className="relative z-10 px-10 py-4 bg-white/5 border border-white/10 hover:border-[#C5A059]/40 hover:bg-[#C5A059]/5 text-white/80 hover:text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.3em] transition-all whitespace-nowrap"
              >
                Join Online Session
              </a>
            </div>
          </StaggeredEntry>
        </section>

        {/* ACTIVITIES SECTION */}
        <section className="mb-40">
           <StaggeredEntry delay={0.4} className="mb-16">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-[1px] bg-[#C5A059]" />
                <h3 className="text-xs uppercase tracking-[0.4em] text-white/60 font-bold">Activities Archive</h3>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif text-white">Moments of <span className="text-[#C5A059] italic">Joy</span></h2>
           </StaggeredEntry>

           {isLoading ? (
             <div className="flex flex-col items-center justify-center py-20 gap-4">
               <div className="w-10 h-10 border-2 border-[#C5A059]/20 border-t-[#C5A059] rounded-none animate-spin" />
             </div>
           ) : featuredActivities.length === 0 ? (
             <div className="py-20 text-center border border-dashed border-white/5">
                <p className="text-white/20 text-xs uppercase tracking-widest">New activities coming soon</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {featuredActivities.map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="relative aspect-[3/4] bg-white/5 border border-white/5 overflow-hidden group"
                  >
                    {m.is_pinned && <Pin size={14} className="absolute top-4 right-4 z-10 text-[#C5A059] fill-current" />}
                    {m.type === 'instagram_link' ? (
                      <iframe src={getInstagramEmbedUrl(m.content) || ""} className="w-full h-full border-0" scrolling="no" />
                    ) : m.type === 'video' ? (
                      <video src={m.content} className="w-full h-full object-cover" muted loop onMouseEnter={e => e.currentTarget.play()} onMouseLeave={e => e.currentTarget.pause()} />
                    ) : (
                      <img src={m.content} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                        <span className="text-[9px] uppercase tracking-widest font-bold text-[#C5A059] border border-[#C5A059]/40 px-3 py-1.5 backdrop-blur-sm">View Moment</span>
                    </div>
                  </motion.div>
                ))}
             </div>
           )}
        </section>

      </div>

      {/* BACKGROUND DECORATION */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[#C5A059]/[0.02] blur-[150px] rounded-none pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-[#C5A059]/[0.03] blur-[120px] rounded-none pointer-events-none -z-10" />
    </main>
  );
}
