"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Camera, UserCheck } from "lucide-react";
import Link from "next/link";
import Header from "@/Components/Header";

export default function VaishnavaVisitsGallery() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/iyf/vaishnava-visits')
      .then(res => res.json())
      .then(data => {
        setPosts(data.data || []);
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  const getInstagramEmbedUrl = (content: string) => {
    if (!content) return null;
    const trimmed = content.trim();
    if (trimmed.startsWith('http')) {
      return `${trimmed.split('?')[0].replace(/\/$/, '')}/embed`;
    }
    const match = content.match(/data-instgrm-permalink="([^"]+)"/);
    if (match) return `${match[1].split('?')[0].replace(/\/$/, '')}/embed`;
    return null;
  };

  return (
    <main className="min-h-screen bg-[#050505] font-sans selection:bg-orange-500/30">
      <Header onlyLogo={true} />
      
      <div className="pt-32 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Link 
            href="/iyf"
            className="flex items-center gap-2 text-white/40 hover:text-orange-400 transition-colors mb-8 group w-fit"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Back to Youth Forum</span>
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-4">
            Vaishnava <span className="text-orange-400 italic">Visits</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl font-light leading-relaxed">
            A sacred archive of association with exalted Vaishnavas.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="w-12 h-12 border-2 border-orange-500/20 border-t-orange-500 rounded-none animate-spin" />
            <span className="text-orange-500/50 text-[10px] uppercase tracking-[0.4em] font-bold">Loading Archive</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-40 text-center border border-dashed border-white/10 rounded-none">
            <UserCheck className="w-12 h-12 text-white/10 mx-auto mb-6" />
            <p className="text-white/20 uppercase tracking-widest text-sm">No visits archived yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {posts.map((post, i) => {
              const embedUrl = getInstagramEmbedUrl(post.content);
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative bg-[#0a0a0a] border border-white/5 rounded-none.5rem] overflow-hidden shadow-2xl hover:border-orange-500/20 transition-all duration-500"
                >
                  <div className="p-8 border-b border-white/5">
                    <h3 className="text-xl font-serif text-white group-hover:text-orange-300 transition-colors">{post.title}</h3>
                    <p className="text-white/30 text-[10px] uppercase tracking-widest mt-2">{post.date}</p>
                  </div>
                  
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
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm pointer-events-none">
                      <div className="px-6 py-3 bg-white text-black text-[10px] uppercase tracking-widest font-bold rounded-none transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        View on Instagram
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
