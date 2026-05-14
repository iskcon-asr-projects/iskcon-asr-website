"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Music,
  Calendar,
  Camera,
  Phone,
  Home as HomeIcon,
  BookOpen,
  Sparkles,
  MessageCircle,
  Pin
} from "lucide-react";
import Header from "@/Components/Header";
import StaggeredEntry from "@/Components/StaggeredEntry";

type BhaktiVrikshaPost = {
  id: string;
  date: string;
  type: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
};

export default function BhaktiVrikshaPage() {
  const [posts, setPosts] = useState<BhaktiVrikshaPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/iyf/home-sankirtan')
      .then(res => res.json())
      .then(data => {
        setPosts(data.data || []);
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  // Helper: extract Instagram permalink
  const getInstagramEmbedUrl = (content: string) => {
    if (content.trim().startsWith('http')) {
      return `${content.split('?')[0].replace(/\/$/, '')}/embed`;
    }
    const match = content.match(/data-instgrm-permalink="([^"]+)"/);
    if (match) return `${match[1].split('?')[0].replace(/\/$/, '')}/embed`;
    const hrefMatch = content.match(/href="(https:\/\/www\.instagram\.com\/(?:p|reel)\/[^"/?]+)/);
    if (hrefMatch) return `${hrefMatch[1].replace(/\/$/, '')}/embed`;
    return null;
  };

  const getOriginalUrl = (content: string) => {
    if (content.trim().startsWith('http')) return content.split('?')[0];
    const match = content.match(/data-instgrm-permalink="([^"]+)"/);
    if (match) return match[1].split('?')[0];
    const hrefMatch = content.match(/href="(https:\/\/www\.instagram\.com\/(?:p|reel)\/[^"/?]+)/);
    if (hrefMatch) return hrefMatch[1].split('?')[0];
    return null;
  };

  // Featured posts (pinned or latest 5)
  const featuredPosts = useMemo(() => {
    const pinned = posts.filter(p => p.is_pinned);
    if (pinned.length >= 5) return pinned.slice(0, 5);
    const unpinned = posts.filter(p => !p.is_pinned);
    return [...pinned, ...unpinned].slice(0, 5);
  }, [posts]);

  // Archive posts (everything after the first 5)
  const archivePosts = useMemo(() => {
    const featuredIds = new Set(featuredPosts.map(p => p.id));
    return posts.filter(p => !featuredIds.has(p.id));
  }, [posts, featuredPosts]);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#C5A059]/30 selection:text-[#C5A059] overflow-x-hidden">
      <Header onlyLogo={true} />

      <div className="pt-40 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto relative z-10">
        
        {/* BACK LINK */}
        <StaggeredEntry delay={0}>
          <Link 
            href="/"
            className="group inline-flex items-center gap-2 text-white/40 hover:text-[#C5A059] transition-all mb-20"
          >
            <div className="w-8 h-px bg-white/10 group-hover:bg-[#C5A059]/50 transition-all" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Back to Home</span>
          </Link>
        </StaggeredEntry>

        {/* HERO SECTION */}
        <header className="mb-24">
          <StaggeredEntry delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#C5A059]/50" />
              <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.5em] font-bold">Bhakti Vriksha</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight">
              Home <span className="text-[#C5A059] italic">Sankirtan</span>
            </h1>
            <p className="text-white/40 max-w-2xl text-lg md:text-xl font-light leading-relaxed font-sans">
              Transform your home into a spiritual oasis. We bring the holy names and transcendental wisdom directly to your doorstep.
            </p>
          </StaggeredEntry>
        </header>

        {/* INVITE & SERVICES CARD */}
        <section id="invite" className="mb-40">
          <StaggeredEntry delay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Left: Services */}
              <div className="bg-white/[0.02] border border-white/5 p-10 md:p-16 flex flex-col justify-center">
                <h2 className="text-[#C5A059] text-xs uppercase tracking-[0.4em] font-bold mb-10">Our Services</h2>
                <div className="space-y-8">
                  {[
                    { icon: Sparkles, text: "We can install deities at your home" },
                    { icon: BookOpen, text: "Install Caitanya Caritamrta / Srimad Bhagavatam" },
                    { icon: Music, text: "Perform Sankirtan on special occasions" }
                  ].map((service, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="w-12 h-12 shrink-0 bg-[#C5A059]/10 border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059] group-hover:scale-110 transition-transform">
                        <service.icon size={20} />
                      </div>
                      <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed pt-1">
                        {service.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: CTA/Invite */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#121212] to-[#080808] border border-[#C5A059]/20 p-10 md:p-16 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(197,160,89,0.1)]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 blur-[100px] rounded-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C5A059]/5 blur-[100px] rounded-none" />
                
                <HomeIcon size={40} className="text-[#C5A059] mb-8 opacity-50" />
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-6">Invite Us to Your <span className="italic text-[#C5A059]">Home</span></h3>
                <p className="text-white/50 text-base font-light mb-12 max-w-sm">
                  Whether it&apos;s a birthday, anniversary, or a housewarming, let the holy names sanctify your space.
                </p>
                
                <div className="flex flex-col gap-4 w-full max-w-xs">
                  <a 
                    href="tel:+917740052036" 
                    className="flex items-center justify-center gap-3 bg-[#C5A059] hover:bg-[#E2C792] text-black py-5 px-8 text-xs font-bold uppercase tracking-[0.3em] transition-all"
                  >
                    <Phone size={16} />
                    Call: 7740052036
                  </a>
                  <a 
                    href="https://wa.me/917740052036" 
                    className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white py-5 px-8 text-xs font-bold uppercase tracking-[0.3em] transition-all"
                  >
                    <MessageCircle size={16} className="text-[#25D366]" />
                    WhatsApp Us
                  </a>
                  <span className="text-white/40 text-[9px] uppercase tracking-widest font-bold text-center mt-2">(10 AM - 7 PM, Mon-Sat)</span>
                </div>
              </div>
            </div>
          </StaggeredEntry>
        </section>

        {/* FEATURED SANKIRTANS */}
        <section id="gallery" className="mb-40">
          <StaggeredEntry delay={0.3} className="mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
              Recent <span className="text-[#C5A059] italic">Sankirtans</span>
            </h2>
            <p className="text-white/40 text-sm md:text-base font-light tracking-wide">
              Glimpses of spiritual joy from homes across the city.
            </p>
          </StaggeredEntry>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-2 border-[#C5A059]/20 border-t-[#C5A059] rounded-none animate-spin" />
              <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.4em] font-bold">Fetching Highlights...</span>
            </div>
          ) : featuredPosts.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-white/10 rounded-none">
              <p className="text-white/30 text-sm tracking-widest uppercase">No highlights yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, i) => {
                const embedUrl = getInstagramEmbedUrl(post.content);
                if (!embedUrl) return null;
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="group relative bg-[#0a0a0a] border border-white/5 overflow-hidden shadow-2xl hover:border-[#C5A059]/30 transition-colors"
                  >
                    {post.is_pinned && (
                      <div className="absolute top-4 right-4 z-10 text-[#C5A059] drop-shadow-lg">
                        <Pin size={16} className="fill-current" />
                      </div>
                    )}
                    <div className="relative w-full overflow-hidden bg-[#0a0a0a] group/embed" style={{ minHeight: 500 }}>
                      {post.date && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-widest font-bold text-white/70">
                          {post.date}
                        </div>
                      )}
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
                          href={getOriginalUrl(post.content) || "#"} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest font-bold text-white/70 hover:text-white transition-all"
                        >
                          <Camera size={12} />
                          View Moment
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* FULL ARCHIVE */}
        {archivePosts.length > 0 && (
          <section className="pt-20 border-t border-white/5">
            <StaggeredEntry delay={0.4} className="mb-12">
              <h3 className="text-xl font-serif text-white uppercase tracking-widest">Historical <span className="text-[#C5A059]">Archive</span></h3>
            </StaggeredEntry>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {archivePosts.map((post, i) => {
                const embedUrl = getInstagramEmbedUrl(post.content);
                if (!embedUrl) return null;
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-[4/5] bg-white/5 border border-white/5 overflow-hidden group/archive"
                  >
                    <iframe
                      src={embedUrl}
                      className="w-full h-full border-0"
                      allowTransparency={true}
                      scrolling="no"
                      frameBorder="0"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/archive:opacity-100 transition-opacity flex items-center justify-center p-4">
                       <a 
                          href={getOriginalUrl(post.content) || "#"} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-[#C5A059] text-black text-[9px] uppercase tracking-widest font-bold"
                        >
                          View Full Sankirtan
                        </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

      </div>

      {/* BACKGROUND DECORATION */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[#C5A059]/[0.02] blur-[150px] rounded-none pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-[#C5A059]/[0.03] blur-[120px] rounded-none pointer-events-none -z-10" />
    </main>
  );
}
