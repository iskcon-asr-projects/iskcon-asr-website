"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Camera, 
  Film, 
  Phone, 
  ChevronRight, 
  Star,
  Users,
  ScrollText,
  Play,
  LayoutGrid
} from "lucide-react";
import Link from "next/link";
import MagicalBackground from "@/Components/MagicalBackground";

type BPSItem = {
  id: string;
  section: string;
  title: string;
  media_url: string;
  media_type: string;
  is_pinned: boolean;
  created_at: string;
};

export default function BPSPage() {
  const [items, setItems] = useState<BPSItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'class' | 'activity' | 'shloka'>('class');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/bps");
      const data = await res.json();
      setItems(data.data || []);
    } catch (error) {
      console.error("Error fetching BPS data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Logic: Show 5 photos for Class section (Pinned items first, then latest)
  // The API already returns items ordered by is_pinned and created_at, 
  // so slice(0, 5) naturally takes the top 5 (including pinned).
  const classItems = items
    .filter(i => i.section === 'class')
    .slice(0, 5);

  const activityItems = items.filter(i => i.section === 'activity');
  const shlokaItems = items.filter(i => i.section === 'shloka');

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30 overflow-x-hidden">
      <MagicalBackground />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505] z-10" />
          <img 
            src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80" 
            alt="Spiritual Education" 
            className="w-full h-full object-cover scale-105"
          />
        </div>

        <div className="relative z-20 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-orange-400 font-bold mb-6 block">
              International Youth Forum Presents
            </span>
            <h1 className="text-6xl md:text-9xl font-serif tracking-tighter mb-8 bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent italic">
              Bhakta Prahlad School
            </h1>
            <p className="max-w-2xl mx-auto text-white/50 text-base md:text-lg leading-relaxed font-light tracking-wide italic">
              "Nurturing seeds of devotion in the hearts of young souls, following the divine path of Prahlad Maharaja."
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">Explore Module</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-orange-500/50 to-transparent" />
        </motion.div>
      </section>

      {/* Navigation Tabs */}
      <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-6">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-center gap-8 md:gap-16">
          {[
            { id: 'class', label: 'Sunday Classes', icon: Clock },
            { id: 'activity', label: 'Activities', icon: LayoutGrid },
            { id: 'shloka', label: 'Shloka Recitation', icon: ScrollText },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold transition-all ${
                activeTab === tab.id ? 'text-orange-400' : 'text-white/30 hover:text-white/60'
              }`}
            >
              <tab.icon size={14} className={activeTab === tab.id ? 'animate-pulse' : ''} />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content Sections */}
      <div className="max-w-[1400px] mx-auto px-6 py-24 md:py-48 min-h-[60vh]">
        <AnimatePresence mode="wait">
          {activeTab === 'class' && (
            <motion.section
              key="class-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-24"
            >
              {/* Timing Info */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white/[0.02] border border-white/5 p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 max-w-xl">
                  <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 tracking-tight">Divine Learning Every Sunday</h2>
                  <p className="text-white/40 text-lg mb-8 leading-relaxed italic">
                    Join us for an hour of spiritual awakening, stories, and meditation designed for the youth.
                  </p>
                  <div className="flex flex-wrap gap-8">
                    <div className="flex items-center gap-4 bg-white/5 px-6 py-4 border border-white/10">
                      <Calendar className="text-orange-400" size={20} />
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Schedule</p>
                        <p className="text-sm font-bold uppercase tracking-wider">Every Sunday</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white/5 px-6 py-4 border border-white/10">
                      <Clock className="text-orange-400" size={20} />
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Time</p>
                        <p className="text-sm font-bold uppercase tracking-wider">8:00 AM — 9:00 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 w-full md:w-auto">
                  <Link 
                    href="#contact" 
                    className="group flex items-center gap-4 px-10 py-5 bg-white text-black text-xs uppercase tracking-[0.3em] font-bold hover:bg-orange-500 hover:text-white transition-all shadow-2xl"
                  >
                    Join The School
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Gallery — Show only 5 as requested */}
              <div className="space-y-12">
                <header className="flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-[0.5em] text-white/20 font-bold">Featured Moments</h3>
                  <div className="h-[1px] flex-1 mx-12 bg-gradient-to-r from-white/5 via-white/5 to-transparent" />
                </header>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {classItems.length > 0 ? (
                    classItems.map((item, idx) => (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={item.id}
                        className={`relative aspect-[4/5] bg-white/5 overflow-hidden group border border-white/5 ${
                          idx === 0 ? 'md:col-span-2 md:row-span-2 aspect-auto' : ''
                        }`}
                      >
                        {item.media_type === 'video' ? (
                          <video src={item.media_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" muted autoPlay loop />
                        ) : (
                          <img src={item.media_url} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <p className="text-[10px] uppercase tracking-widest text-white font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                            {item.title || 'Divine Class'}
                          </p>
                        </div>
                        {item.is_pinned && (
                          <div className="absolute top-4 left-4 p-2 bg-orange-500 text-white">
                            <Star size={12} fill="currentColor" />
                          </div>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full py-24 text-center text-white/20 uppercase tracking-widest italic border border-dashed border-white/10">
                      Capturing the divine moments...
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === 'activity' && (
            <motion.section
              key="activity-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {activityItems.length > 0 ? (
                activityItems.map((item, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={item.id}
                    className="bg-[#0A0A0A] border border-white/5 rounded-none overflow-hidden group hover:border-orange-500/30 transition-all"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      {item.media_type === 'video' ? (
                        <div className="w-full h-full bg-black flex items-center justify-center">
                          <video src={item.media_url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" muted />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform">
                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                              <Play className="text-white fill-white ml-1" size={24} />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <img src={item.media_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      )}
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-orange-400 mb-4 font-bold">
                        <Users size={12} />
                        Active Learning
                      </div>
                      <h3 className="text-2xl font-serif text-white mb-2">{item.title}</h3>
                      <p className="text-white/40 text-xs uppercase tracking-widest">{new Date(item.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-24 text-center text-white/20 uppercase tracking-widest italic border border-dashed border-white/10">
                  New activities blooming soon...
                </div>
              )}
            </motion.section>
          )}

          {activeTab === 'shloka' && (
            <motion.section
              key="shloka-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto space-y-12"
            >
              {shlokaItems.length > 0 ? (
                shlokaItems.map((item, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={item.id}
                    className="flex flex-col md:flex-row gap-8 items-center bg-white/[0.02] border border-white/5 p-8 group hover:bg-white/[0.04] transition-all"
                  >
                    <div className="w-full md:w-64 aspect-square relative shrink-0 overflow-hidden border border-white/10">
                      {item.media_type === 'video' ? (
                        <video src={item.media_url} className="w-full h-full object-cover" controls />
                      ) : (
                        <img src={item.media_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      )}
                      {item.media_type === 'video' && (
                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                            <Film size={32} className="text-white/40" />
                         </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-orange-400 mb-4 font-bold">
                        <ScrollText size={12} />
                        Sacred Verse
                      </div>
                      <h3 className="text-3xl font-serif text-white mb-6 tracking-tight italic">
                         {item.title ? `"${item.title}"` : 'Bhagavad Gita Sloka'}
                      </h3>
                      <div className="flex items-center gap-6">
                        <div className="h-[1px] w-12 bg-orange-500/50" />
                        <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Recited by Young Bhaktas</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-24 text-center text-white/20 uppercase tracking-widest italic border border-dashed border-white/10">
                  Melodies of the Shastras coming soon...
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Join Section / Footer */}
      <section id="contact" className="relative py-48 px-6 bg-[#050505] text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
        <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-24"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-orange-400 font-bold mb-8 block">Registration Open</span>
            <h2 className="text-5xl md:text-8xl font-serif tracking-tighter mb-12 italic">Begin The Journey</h2>
            <p className="max-w-xl mx-auto text-white/40 text-lg leading-relaxed font-light italic">
              Enroll your children in a world of spiritual growth and wisdom. Contact us directly to join the Bhakta Prahlad School family.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
            {[
              { label: 'Coordinator 1', phone: '9646968900' },
              { label: 'Coordinator 2', phone: '8427123933' },
            ].map((contact, idx) => (
              <motion.a
                key={contact.phone}
                href={`tel:${contact.phone}`}
                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="group flex flex-col items-center p-12 border border-white/5 bg-white/[0.02] hover:border-orange-500 transition-all hover:bg-white/[0.05]"
              >
                <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:scale-110 transition-all">
                  <Phone size={24} className="text-orange-400 group-hover:text-white" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">{contact.label}</span>
                <span className="text-3xl font-serif tracking-tight text-white group-hover:text-orange-400 transition-colors">{contact.phone}</span>
              </motion.a>
            ))}
          </div>

          <div className="mt-48 pt-24 border-t border-white/5 w-full flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="flex items-center gap-6">
                <img src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/logo.png" alt="Logo" className="h-16" />
                <div className="h-8 w-[1px] bg-white/10" />
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Bhakta Prahlad School</p>
             </div>
             <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">© 2024. All Divine Rights Reserved.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
