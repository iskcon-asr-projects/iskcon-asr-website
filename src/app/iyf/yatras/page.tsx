"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Compass,
  Calendar,
  Flame,
  ChevronDown,
  ImageIcon,
  Type,
  X,
  Camera
} from "lucide-react";
import Header from "@/Components/Header";

const InstagramIcon = ({ className, size }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

type YatraUpdate = {
  id: string;
  type: string;
  yatra_name: string;
  date: string;
  content: string;
  created_at: string;
};

type YatraGroup = {
  name: string;
  date: string;
  items: YatraUpdate[];
  counts: { image: number; instagram: number; instagram_link: number; text: number };
};

export default function YatrasGalleryPage() {
  const [updates, setUpdates] = useState<YatraUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedYatra, setExpandedYatra] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/iyf/yatras')
      .then(res => res.json())
      .then(data => {
        setUpdates(data.data || []);
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  // Group updates by yatra_name
  const yatraGroups: YatraGroup[] = useMemo(() => {
    const groupMap = new Map<string, YatraUpdate[]>();
    updates.forEach((u) => {
      if (!groupMap.has(u.yatra_name)) {
        groupMap.set(u.yatra_name, []);
      }
      groupMap.get(u.yatra_name)!.push(u);
    });

    return Array.from(groupMap.entries()).map(([name, items]) => {
      const counts = { image: 0, instagram: 0, instagram_link: 0, text: 0 };
      items.forEach((item) => {
        if (item.type in counts) {
          counts[item.type as keyof typeof counts]++;
        }
      });
      return {
        name,
        date: items[0]?.date || "",
        items,
        counts,
      };
    });
  }, [updates]);

  // Auto-expand the first yatra on load
  useEffect(() => {
    if (yatraGroups.length > 0 && expandedYatra === null) {
      setExpandedYatra(yatraGroups[0].name);
    }
  }, [yatraGroups, expandedYatra]);

  // Helper: extract Instagram permalink from embed code or direct URL
  const getInstagramEmbedUrl = (content: string, type: string) => {
    if (type === "instagram_link") {
      return `${content.split('?')[0].replace(/\/$/, '')}/embed`;
    }
    const match = content.match(/data-instgrm-permalink="([^"]+)"/);
    if (match) return `${match[1].split('?')[0].replace(/\/$/, '')}/embed`;
    const hrefMatch = content.match(/href="(https:\/\/www\.instagram\.com\/(?:p|reel)\/[^"/?]+)/);
    if (hrefMatch) return `${hrefMatch[1].replace(/\/$/, '')}/embed`;
    return null;
  };

  const getOriginalUrl = (content: string, type: string) => {
    if (type === "instagram_link") return content.split('?')[0];
    const match = content.match(/data-instgrm-permalink="([^"]+)"/);
    if (match) return match[1].split('?')[0];
    const hrefMatch = content.match(/href="(https:\/\/www\.instagram\.com\/(?:p|reel)\/[^"/?]+)/);
    if (hrefMatch) return hrefMatch[1].split('?')[0];
    return null;
  };

  const toggleYatra = (name: string) => {
    setExpandedYatra(expandedYatra === name ? null : name);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30 selection:text-orange-500 flex flex-col items-center font-sans overflow-x-hidden">
      <Header onlyLogo={true} />

      {/* ── Ambient background glows ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/[0.03] rounded-none blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-amber-500/[0.02] rounded-none blur-[220px]" />
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-none bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
              onClick={() => setLightboxImage(null)}
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightboxImage}
              alt="Full view"
              className="max-w-full max-h-[90vh] object-contain rounded-none shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full flex flex-col items-center pt-32 pb-24 px-6 md:px-12 max-w-[1400px]">
        
        {/* Navigation & Header */}
        <div className="w-full mb-16 flex flex-col items-center text-center">
          <Link 
            href="/iyf"
            className="flex items-center gap-2 text-white/40 hover:text-orange-400 text-xs tracking-[0.2em] uppercase font-medium transition-colors mb-12 self-start"
          >
            <ArrowLeft size={14} /> Back to IYF
          </Link>
          
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-orange-500/50" />
            <Compass className="w-4 h-4 text-orange-500" />
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-orange-500/50" />
          </div>

          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
            Our <span className="text-orange-400 italic">Yatras</span>
          </h1>
          <p className="text-white/40 max-w-2xl text-lg font-light">
            A comprehensive archive of all our spiritual journeys and pilgrimages.
          </p>
        </div>

        {/* ── Grouped Yatra Sections ── */}
        <div className="w-full space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 opacity-50">
               <Flame className="w-8 h-8 text-orange-500 animate-pulse mb-4" />
               <p className="text-sm tracking-[0.3em] uppercase font-bold text-orange-500 animate-pulse">Loading Archives...</p>
            </div>
          ) : yatraGroups.length === 0 ? (
            <div className="flex justify-center py-20 border border-dashed border-white/10 rounded-none">
              <div className="text-white/30 text-sm tracking-widest uppercase">No historical yatras found.</div>
            </div>
          ) : (
            yatraGroups.map((group, groupIndex) => {
              const isExpanded = expandedYatra === group.name;
              return (
                <motion.div
                  key={group.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: groupIndex * 0.08 }}
                  className="bg-[#0a0a0a] border border-white/5 rounded-none overflow-hidden shadow-2xl"
                >
                  {/* ── Yatra Group Header (Clickable) ── */}
                  <button
                    onClick={() => toggleYatra(group.name)}
                    className="w-full px-6 md:px-8 py-6 md:py-7 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors text-left"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 min-w-0">
                      <h2 className="text-2xl md:text-3xl font-serif text-white truncate">
                        {group.name}
                      </h2>
                      <div className="flex items-center gap-3 flex-wrap">
                        {group.date && (
                          <span className="flex items-center gap-1.5 text-white/30 text-[10px] tracking-wider uppercase">
                            <Calendar size={10} />
                            {group.date}
                          </span>
                        )}
                        {/* Content type badges */}
                        <div className="flex items-center gap-2">
                          {group.counts.image > 0 && (
                            <span className="flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-none bg-orange-500/10 border border-orange-500/20 text-orange-400 tracking-wider uppercase">
                              <ImageIcon size={9} /> {group.counts.image}
                            </span>
                          )}
                          {(group.counts.instagram + group.counts.instagram_link) > 0 && (
                            <span className="flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-none bg-pink-500/10 border border-pink-500/20 text-pink-400 tracking-wider uppercase">
                              <InstagramIcon size={9} /> {group.counts.instagram + group.counts.instagram_link}
                            </span>
                          )}
                          {group.counts.text > 0 && (
                            <span className="flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-none bg-blue-500/10 border border-blue-500/20 text-blue-400 tracking-wider uppercase">
                              <Type size={9} /> {group.counts.text}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-white/20 tracking-widest">
                          {group.items.length} {group.items.length === 1 ? "post" : "posts"}
                        </span>
                      </div>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-white/30 shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* ── Expanded Content Grid ── */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/5 p-4 md:p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {group.items.map((update, i) => (
                              <motion.div
                                key={update.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.04 }}
                                className="group relative bg-[#080808] border border-white/5 rounded-none overflow-hidden hover:border-orange-500/20 transition-all duration-300"
                              >
                                {/* Content */}
                                <div className="flex flex-col h-full">
                                  {update.type === "text" && (
                                    <div className="p-6 flex-1 flex flex-col justify-center items-center text-center min-h-[200px]">
                                      <Compass className="w-6 h-6 text-orange-500/20 mb-4" />
                                      <p className="text-sm text-white/70 font-light leading-relaxed">
                                        {update.content}
                                      </p>
                                    </div>
                                  )}

                                  {update.type === "image" && (
                                    <div 
                                      className="relative w-full aspect-square overflow-hidden bg-black/20 cursor-pointer"
                                      onClick={() => setLightboxImage(update.content)}
                                    >
                                      <Image 
                                        src={update.content} 
                                        alt={update.yatra_name} 
                                        fill 
                                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                                      />
                                      {/* Hover overlay */}
                                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                        <div className="w-10 h-10 rounded-none bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {(update.type === "instagram" || update.type === "instagram_link") && (() => {
                                    const embedUrl = getInstagramEmbedUrl(update.content, update.type);
                                    if (!embedUrl) return null;
                                    return (
                                      <div className="relative w-full overflow-hidden bg-[#080808] group/embed" style={{ minHeight: 500 }}>
                                        <iframe
                                          src={embedUrl}
                                          className="w-full border-0"
                                          style={{ height: 500 }}
                                          allowTransparency={true}
                                          scrolling="no"
                                          frameBorder="0"
                                          loading="lazy"
                                        />
                                        <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover/embed:opacity-100 transition-opacity pointer-events-none">
                                          <a 
                                            href={getOriginalUrl(update.content, update.type) || "#"} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-none text-[10px] uppercase tracking-widest font-bold text-white/70 hover:text-white hover:bg-black transition-all"
                                          >
                                            <Camera size={12} />
                                            View on Instagram
                                          </a>
                                        </div>
                                      </div>
                                    );
                                  })()}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>

      </div>
    </main>
  );
}
