"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Camera, Star, Calendar } from "lucide-react";
import Link from "next/link";
import Header from "@/Components/Header";

type MegaEventPost = {
  id: string;
  type: string;
  event_name: string;
  date: string;
  content: string;
  created_at: string;
};

export default function MegaEventsGallery() {
  const [posts, setPosts] = useState<MegaEventPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/iyf/mega-events')
      .then(res => res.json())
      .then(data => {
        setPosts(data.data || []);
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  // Group posts by event name
  const groupedEvents = useMemo(() => {
    const groups = new Map<string, MegaEventPost[]>();
    posts.forEach((p) => {
      if (!groups.has(p.event_name)) {
        groups.set(p.event_name, []);
      }
      groups.get(p.event_name)!.push(p);
    });
    return groups;
  }, [posts]);

  const getInstagramEmbedUrl = (content: string) => {
    if (!content) return null;
    
    // Auto-detect if it's an embed code or a link
    if (content.includes('<blockquote') || content.includes('data-instgrm-permalink')) {
      const match = content.match(/data-instgrm-permalink="([^"]+)"/);
      if (match) return `${match[1].split('?')[0].replace(/\/$/, '')}/embed`;
      const hrefMatch = content.match(/href="(https:\/\/www\.instagram\.com\/(?:p|reel)\/[^"/?]+)/);
      if (hrefMatch) return `${hrefMatch[1].replace(/\/$/, '')}/embed`;
    }

    const trimmed = content.trim();
    if (trimmed.startsWith('http')) {
      return `${trimmed.split('?')[0].replace(/\/$/, '')}/embed`;
    }
    return null;
  };

  return (
    <main className="min-h-screen bg-[#050505] font-sans selection:bg-orange-500/30">
      <Header onlyLogo={true} />
      
      <div className="pt-32 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <Link 
            href="/iyf"
            className="flex items-center gap-2 text-white/40 hover:text-orange-400 transition-colors mb-8 group w-fit"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Back to Youth Forum</span>
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-4">
            Mega <span className="text-orange-400 italic">Events</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl font-light leading-relaxed">
            Reliving the grandeur of our biggest youth festivals and seminars.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="w-12 h-12 border-2 border-orange-500/20 border-t-orange-500 rounded-none animate-spin" />
            <span className="text-orange-500/50 text-[10px] uppercase tracking-[0.4em] font-bold">Loading Archive</span>
          </div>
        ) : groupedEvents.size === 0 ? (
          <div className="py-40 text-center border border-dashed border-white/10 rounded-none">
            <Star className="w-12 h-12 text-white/10 mx-auto mb-6" />
            <p className="text-white/20 uppercase tracking-widest text-sm">No mega events archived yet</p>
          </div>
        ) : (
          <div className="space-y-32">
            {Array.from(groupedEvents.entries()).map(([eventName, eventPosts], groupIndex) => (
              <section key={eventName} className="relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/5 pb-8">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-serif text-[#C5A059] mb-3">{eventName}</h2>
                    <p className="flex items-center gap-2 text-white/30 text-xs uppercase tracking-[0.2em] font-medium">
                      <Calendar size={14} className="text-orange-500/50" />
                      {eventPosts[0].date}
                    </p>
                  </div>
                  <div className="px-5 py-2 bg-white/5 border border-white/10 rounded-none text-[10px] text-white/40 font-bold uppercase tracking-widest whitespace-nowrap">
                    {eventPosts.length} Memories
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                  {eventPosts.map((post, i) => {
                    const embedUrl = getInstagramEmbedUrl(post.content);
                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative bg-[#0a0a0a] border border-white/5 rounded-none.5rem] overflow-hidden shadow-2xl hover:border-orange-500/20 transition-all duration-500"
                      >
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                          {embedUrl ? (
                            <iframe
                              src={embedUrl}
                              className="w-full h-full border-0"
                              allowTransparency={true}
                              scrolling="no"
                              frameBorder="0"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-white/10 italic text-sm">
                              Invalid content
                            </div>
                          )}
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
    </main>
  );
}
