"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookHeart,
  Calendar,
  Flame
} from "lucide-react";
import Header from "@/Components/Header";

export default function IYFGalleryPage() {
  const [updates, setUpdates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/iyf')
      .then(res => res.json())
      .then(data => {
        setUpdates(data.data || []);
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  // Script loader for instagram embeds
  useEffect(() => {
    const hasInstagram = updates.some(update => update.type === "instagram");
    if (hasInstagram && !(window as any).instgrm) {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else if (hasInstagram && (window as any).instgrm) {
      setTimeout(() => {
        (window as any).instgrm.Embeds.process();
      }, 500);
    }
  }, [updates]);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30 selection:text-orange-500 flex flex-col items-center font-sans overflow-x-hidden">
      <Header onlyLogo={true} />

      {/* ── Ambient background glows ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/[0.03] rounded-none blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-amber-500/[0.02] rounded-none blur-[220px]" />
      </div>

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
            <BookHeart className="w-4 h-4 text-orange-500" />
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-orange-500/50" />
          </div>

          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
            Book Distribution <span className="text-orange-400 italic">Gallery</span>
          </h1>
          <p className="text-white/40 max-w-2xl text-lg font-light">
            A comprehensive archive of our transcendental book distribution efforts.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {isLoading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-32 opacity-50">
               <Flame className="w-8 h-8 text-orange-500 animate-pulse mb-4" />
               <p className="text-sm tracking-[0.3em] uppercase font-bold text-orange-500 animate-pulse">Loading Archives...</p>
            </div>
          ) : updates.length === 0 ? (
            <div className="col-span-full flex justify-center py-20 border border-dashed border-white/10 rounded-none">
              <div className="text-white/30 text-sm tracking-widest uppercase">No historical updates found.</div>
            </div>
          ) : (
            updates.map((update, i) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative bg-[#0a0a0a] border border-white/5 rounded-none overflow-hidden shadow-2xl flex flex-col h-full"
              >
                {/* Header */}
                <div className="p-5 border-b border-white/5 flex items-center justify-end bg-white/[0.01]">
                  {update.date && (
                    <div className="flex items-center gap-1.5 text-white/30 text-[10px] tracking-wider uppercase shrink-0">
                      <Calendar size={10} />
                      {update.date}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-center items-center relative min-h-[250px]">
                  
                  {update.type === "text" && (
                    <div className="text-center w-full">
                      <BookHeart className="w-8 h-8 text-orange-500/20 mx-auto mb-4" />
                      <p className="text-base text-white/70 font-light leading-relaxed">
                        {update.content}
                      </p>
                    </div>
                  )}

                  {update.type === "image" && (
                    <div className="relative w-full aspect-square rounded-none overflow-hidden border border-white/5 bg-black/20">
                      <Image 
                        src={update.content} 
                        alt={update.title} 
                        fill 
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                  )}

                  {update.type === "instagram" && (
                    <div 
                      className="w-full flex justify-center items-center instagram-embed-wrapper bg-[#0a0a0a] rounded-none overflow-hidden py-4"
                      dangerouslySetInnerHTML={{ __html: update.content.replace('<blockquote', '<blockquote data-instgrm-theme="dark"') }} 
                    />
                  )}

                  {update.type === "instagram_link" && (
                    <div className="relative w-full h-[450px] rounded-none overflow-hidden border border-white/5 bg-[#0a0a0a]">
                      <iframe 
                        src={`${update.content.split('?')[0].replace(/\/$/, '')}/embed/captioned`}
                        className="absolute top-0 left-0 w-full h-full"
                        frameBorder="0"
                        scrolling="no"
                        allowTransparency={true}
                      />
                    </div>
                  )}

                </div>
              </motion.div>
            ))
          )}
        </div>

      </div>
    </main>
  );
}
