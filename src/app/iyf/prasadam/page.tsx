"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  UtensilsCrossed,
  Calendar,
  Camera
} from "lucide-react";
import Header from "@/Components/Header";

type PrasadamPost = {
  id: string;
  event_name: string;
  date: string;
  type: string;
  content: string;
  created_at: string;
};

export default function PrasadamGalleryPage() {
  const [posts, setPosts] = useState<PrasadamPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/iyf/prasadam')
      .then(res => res.json())
      .then(data => {
        setPosts(data.data || []);
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  // Helper: extract Instagram permalink
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

  // Group by Event Name
  const groupedEvents = useMemo(() => {
    const map = new Map<string, PrasadamPost[]>();
    posts.forEach(p => {
      if (!map.has(p.event_name)) map.set(p.event_name, []);
      map.get(p.event_name)!.push(p);
    });
    return Array.from(map.entries());
  }, [posts]);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30">
      <Header onlyLogo={true} />

      <div className="pt-32 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <Link 
          href="/iyf"
          className="group flex items-center gap-2 text-white/40 hover:text-orange-400 transition-colors mb-12"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-[0.2em] font-bold">Back to IYF</span>
        </Link>

        <header className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-orange-500/50" />
            <span className="text-orange-500 text-[10px] uppercase tracking-[0.4em] font-bold">The Art of Cooking</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8">
            Prasadam <span className="text-orange-400 italic">Archive</span>
          </h1>
          <p className="text-white/40 max-w-2xl text-lg font-light leading-relaxed">
            Witness the devotion and care that goes into preparing sanctified food for thousands, from small gatherings to mega feasts.
          </p>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="w-12 h-12 border-2 border-orange-500/20 border-t-orange-500 rounded-none animate-spin" />
            <span className="text-orange-500 text-[10px] uppercase tracking-[0.3em] font-bold">Loading Archive...</span>
          </div>
        ) : groupedEvents.length === 0 ? (
          <div className="py-40 text-center border border-dashed border-white/10 rounded-none">
            <UtensilsCrossed size={48} className="text-white/10 mx-auto mb-6" />
            <p className="text-white/30 text-sm tracking-widest uppercase">No memories archived yet.</p>
          </div>
        ) : (
          <div className="space-y-32">
            {groupedEvents.map(([name, items]) => (
              <section key={name} className="relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-serif text-white/90 mb-2">{name}</h2>
                    <div className="flex items-center gap-2 text-orange-400/60 font-medium tracking-wide">
                      <Calendar size={14} />
                      <span className="text-sm">{items[0]?.date || "Devotional Service"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/30 bg-white/5 px-4 py-2 rounded-none border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider">{items.length} Memories</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((post, i) => {
                    const embedUrl = getInstagramEmbedUrl(post.content, post.type);
                    if (!embedUrl) return null;
                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="group relative bg-[#0a0a0a] border border-white/5 rounded-none overflow-hidden shadow-2xl hover:border-orange-500/20 transition-colors"
                      >
                        <div className="relative w-full overflow-hidden bg-[#0a0a0a] group/embed" style={{ minHeight: 500 }}>
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
                              href={getOriginalUrl(post.content, post.type) || "#"} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-none text-[10px] uppercase tracking-widest font-bold text-white/70 hover:text-white hover:bg-black transition-all"
                            >
                              <Camera size={12} />
                              View on Instagram
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-none pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-none pointer-events-none -z-10" />
    </main>
  );
}
