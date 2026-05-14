"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Flame,
  BookHeart,
  Compass,
  Tent,
  Music,
  UtensilsCrossed,
  BookOpen,
  MessageCircle,
  Phone,
  Sparkles,
  ArrowRight,
  LayoutGrid,
  Calendar,
  MapPin,
  Camera,
  UserCheck,
  Star,
  Pin,
  Users,
} from "lucide-react";
import Header from "@/Components/Header";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  STATIC DATA                                                        */
/* ------------------------------------------------------------------ */

const activities = [
  {
    icon: Tent,
    title: "Organizing Camps",
    text: "Immersive youth camps designed to recharge the spirit, build character, and foster lifelong friendships in devotion.",
    link: "/iyf/camps",
  },
  {
    icon: Music,
    title: "Weekly Nagar Sankirtan",
    text: "Taking the Holy Name to the streets at Company Bagh. Experiencing the sheer bliss of congregational chanting.",
    link: "/iyf/sankirtan",
  },
  {
    icon: UtensilsCrossed,
    title: "Prasadam Making",
    text: "Learning the art of cooking for Krishna. Preparing and distributing sanctified food with love and devotion.",
    link: "/iyf/prasadam",
  },
  {
    icon: BookOpen,
    title: "Classes",
    text: "Relive the wisdom shared in our IYF Classes, Gita workshops, and interactive seminars.",
    link: "/iyf/classes",
  },
  {
    icon: Compass,
    title: "Yatras",
    text: "Devotional pilgrimages to sacred dhamas like Vrindavan, Mayapur and Jagannath Puri.",
    link: "/iyf/yatras",
  },
  {
    title: "Vaishnava Visits",
    text: "Honoring the presence of exalted Vaishnavas. Hearing their wisdom and divine association.",
    link: "/iyf/vaishnava-visits",
    icon: UserCheck,
  },
  {
    title: "Mega Events",
    text: "Capturing the grandeur of our biggest gatherings. Festivals, seminars and major youth conventions.",
    link: "/iyf/mega-events",
    icon: Star,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function IYFPage() {
  const [updates, setUpdates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [featuredYatras, setFeaturedYatras] = useState<any[]>([]);
  const [featuredYatraName, setFeaturedYatraName] = useState<string>("");
  const [isYatraLoading, setIsYatraLoading] = useState(true);

  const [sankirtanPosts, setSankirtanPosts] = useState<any[]>([]);
  const [isSankirtanLoading, setIsSankirtanLoading] = useState(true);

  const [campsPosts, setCampsPosts] = useState<any[]>([]);
  const [featuredCampName, setFeaturedCampName] = useState<string>("");
  const [isCampsLoading, setIsCampsLoading] = useState(true);

  const [prasadamPosts, setPrasadamPosts] = useState<any[]>([]);
  const [featuredPrasadamEvent, setFeaturedPrasadamEvent] = useState<string>("");
  const [isPrasadamLoading, setIsPrasadamLoading] = useState(true);

  const [classesPosts, setClassesPosts] = useState<any[]>([]);
  const [isClassesLoading, setIsClassesLoading] = useState(true);

  const [vaishnavaPosts, setVaishnavaPosts] = useState<any[]>([]);
  const [isVaishnavaLoading, setIsVaishnavaLoading] = useState(true);

  const [megaEventsPosts, setMegaEventsPosts] = useState<any[]>([]);
  const [isMegaEventsLoading, setIsMegaEventsLoading] = useState(true);


  React.useEffect(() => {
    // Fetch Book Distribution
    fetch('/api/iyf')
      .then(res => res.json())
      .then(data => {
        setUpdates(data.data ? data.data.slice(0, 3) : []);
        setIsLoading(false);
      })
      .catch(console.error);

    // Fetch Latest Yatra Group
    fetch('/api/iyf/yatras')
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data.length > 0) {
          const latestName = data.data[0].yatra_name;
          const group = data.data.filter((y: any) => y.yatra_name === latestName);
          setFeaturedYatraName(latestName);
          setFeaturedYatras(group.slice(0, 3));
        }
        setIsYatraLoading(false);
      })
      .catch(console.error);

    // Fetch Nagar Sankirtan
    fetch('/api/iyf/sankirtan')
      .then(res => res.json())
      .then(data => {
        setSankirtanPosts(data.data ? data.data.slice(0, 3) : []);
        setIsSankirtanLoading(false);
      })
      .catch(console.error);

    // Fetch Latest Camp Group
    fetch('/api/iyf/camps')
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data.length > 0) {
          const latestName = data.data[0].camp_name;
          const group = data.data.filter((c: any) => c.camp_name === latestName);
          setFeaturedCampName(latestName);
          setCampsPosts(group.slice(0, 3));
        }
        setIsCampsLoading(false);
      })
      .catch(console.error);

    // Fetch Latest Prasadam
    fetch('/api/iyf/prasadam')
      .then(res => res.json())
      .then(data => {
        setPrasadamPosts(data.data ? data.data.slice(0, 3) : []);
        setIsPrasadamLoading(false);
      })
      .catch(console.error);

    // Fetch Classes
    fetch('/api/iyf/classes')
      .then(res => res.json())
      .then(data => {
        setClassesPosts(data.data ? data.data.slice(0, 3) : []);
        setIsClassesLoading(false);
      })
      .catch(console.error);

    // Fetch Vaishnava Visits
    fetch('/api/iyf/vaishnava-visits')
      .then(res => res.json())
      .then(data => {
        setVaishnavaPosts(data.data ? data.data.slice(0, 3) : []);
        setIsVaishnavaLoading(false);
      })
      .catch(console.error);

    // Fetch Mega Events
    fetch('/api/iyf/mega-events')
      .then(res => res.json())
      .then(data => {
        setMegaEventsPosts(data.data ? data.data.slice(0, 3) : []);
        setIsMegaEventsLoading(false);
      })
      .catch(console.error);
  }, []);

  // Helper: extract Instagram permalink from embed code or direct URL
  const getInstagramEmbedUrl = (content: string, type: string) => {
    if (!content) return null;

    // Auto-detect if it's an embed code or a link regardless of the 'type' field
    if (content.includes('<blockquote') || content.includes('data-instgrm-permalink')) {
      const match = content.match(/data-instgrm-permalink="([^"]+)"/);
      if (match) return `${match[1].split('?')[0].replace(/\/$/, '')}/embed`;
      const hrefMatch = content.match(/href="(https:\/\/www\.instagram\.com\/(?:p|reel)\/[^"/?]+)/);
      if (hrefMatch) return `${hrefMatch[1].replace(/\/$/, '')}/embed`;
    }

    // Treat as direct link if it starts with http
    const trimmedContent = content.trim();
    if (trimmedContent.startsWith('http')) {
      const baseUrl = trimmedContent.split('?')[0].replace(/\/$/, '');
      return `${baseUrl}/embed`;
    }

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

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30 selection:text-orange-500 flex flex-col items-center font-sans overflow-x-hidden">
      <Header onlyLogo={true} />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/[0.03] rounded-none blur-[180px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-none blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-orange-600/[0.02] rounded-none blur-[220px]" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 1 — HERO                                           */}
        {/* ═══════════════════════════════════════════════════════════ */}

        {/* Hero Content */}
        <section className="max-w-[1200px] mx-auto w-full px-6 md:px-12 pb-48 pt-64 md:pt-72 flex flex-col items-center text-center mt-8">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center relative z-10"
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-orange-500/50" />
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-orange-400 text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold">
                  ISKCON Youth Forum
                </span>
              </div>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-orange-500/50" />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-serif text-white mb-8 leading-[1.05] tracking-tight">
              Awaken Your
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-600 italic">
                Inner Potential
              </span>
            </h1>

            <p className="text-base md:text-xl text-white/50 font-light leading-relaxed max-w-2xl mb-16">
              Empowering young men with spiritual wisdom, dynamic kirtans, and a vibrant community of like-minded individuals striving for higher consciousness.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="https://wa.link/r2mel6"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-8 py-4 rounded-none bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white transition-all duration-500 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_50px_rgba(249,115,22,0.5)]"
              >
                <span className="text-sm uppercase tracking-[0.15em] font-bold">
                  Join the Community
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </section>

        <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-white/25 to-transparent my-64" />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION — WEEKLY ANNOUNCEMENT                              */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <section className="w-full py-24 md:py-32 bg-[#050505]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Animated Glow Background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-orange-500/20 rounded-none blur-2xl group-hover:opacity-100 opacity-50 transition duration-1000 group-hover:duration-200" />

              <div className="relative bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-none p-12 md:p-16 flex flex-col items-center justify-center gap-12 overflow-hidden shadow-2xl">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 blur-[80px] pointer-events-none" />

                <div className="flex-1 text-center">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-none text-orange-400 text-[10px] uppercase tracking-[0.4em] font-bold mb-8 mx-auto">
                    <Sparkles size={12} />
                    Weekly Gathering
                  </div>
                  <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight text-center">
                    Sunday <span className="italic text-orange-400">Youth Class</span>
                  </h2>
                  <p className="text-white/40 text-lg md:text-xl font-light max-w-xl leading-relaxed mx-auto text-center">
                    A weekly sanctuary for the soul. Dive deep into Vedic wisdom, vibrant kirtans, and practical spirituality for modern life.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-8 shrink-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-none p-6 text-center backdrop-blur-md">
                      <Calendar className="w-6 h-6 text-orange-400 mx-auto mb-3" />
                      <p className="text-white font-medium">Every Sunday</p>
                      <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">Weekly</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-none p-6 text-center backdrop-blur-md">
                      <Flame className="w-6 h-6 text-orange-400 mx-auto mb-3" />
                      <p className="text-white font-medium">5 PM - 6 PM</p>
                      <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">Evening</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-orange-300 font-serif italic text-lg md:text-xl">
                    <UtensilsCrossed size={20} className="text-orange-500" />
                    Followed by Mahaprasadam
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <section className="w-full py-32 md:py-48 bg-[#050505]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <h2 className="text-4xl md:text-6xl font-serif text-white">
                IYF <span className="text-orange-400 italic">Classes</span>
              </h2>
            </motion.div>

            {/* Regular Online Classes Announcements */}
            <div className="flex flex-wrap justify-center gap-8 w-full max-w-[1400px]">
              {/* Bhagavad Gita Class */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative group bg-[#0a0a0a] border border-orange-500/10 rounded-none py-12 px-8 overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[50px] pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-none bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] uppercase tracking-widest font-bold mb-6">
                    <BookOpen size={12} />
                    Daily Wisdom
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
                    Bhagavad Gita <span className="text-orange-400 italic">Class</span>
                  </h3>
                  <div className="flex flex-col items-center gap-2 mb-8">
                    <div className="flex items-center gap-3 text-white/60">
                      <Calendar size={16} className="text-orange-500/50" />
                      <span className="text-sm">Monday to Saturday</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/60">
                      <Flame size={16} className="text-orange-500/50" />
                      <span className="text-sm font-bold text-orange-300">8:30 PM</span>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-none bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 text-orange-400 text-xs uppercase tracking-widest font-bold transition-all"
                  >
                    <MessageCircle size={16} />
                    Join WhatsApp
                  </a>
                </div>
              </motion.div>

              {/* Prabhupada Lilamrta Class */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative group bg-[#0a0a0a] border border-amber-500/10 rounded-none py-12 px-8 overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[50px] pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-none bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] uppercase tracking-widest font-bold mb-6">
                    <Sparkles size={12} />
                    Morning Nectar
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
                    Prabhupada <span className="text-amber-400 italic">Lilamrta</span>
                  </h3>
                  <div className="flex flex-col items-center gap-2 mb-8">
                    <div className="flex items-center gap-3 text-white/60">
                      <Calendar size={16} className="text-amber-500/50" />
                      <span className="text-sm">Monday to Saturday</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/60">
                      <Flame size={16} className="text-amber-500/50" />
                      <span className="text-sm font-bold text-amber-300">6:30 AM</span>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-none bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 text-xs uppercase tracking-widest font-bold transition-all"
                  >
                    <MessageCircle size={16} />
                    Join WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>

            {isClassesLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-pulse text-orange-500 tracking-[0.3em] text-sm font-bold uppercase">Loading Archive...</div>
              </div>
            ) : !classesPosts || classesPosts.length === 0 ? (
              <div className="flex justify-center py-20 border border-dashed border-white/10 rounded-none max-w-4xl mx-auto">
                <div className="text-white/30 text-sm tracking-widest uppercase">No memories posted yet.</div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                  {classesPosts.map((post, i) => {
                    const embedUrl = getInstagramEmbedUrl(post.content, post.type);
                    if (!embedUrl) return null;
                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="group relative bg-[#0a0a0a] border border-white/5 rounded-none overflow-hidden shadow-2xl"
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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex justify-center mt-12"
                >
                  <Link
                    href="/iyf/classes"
                    className="group flex items-center gap-3 px-8 py-4 rounded-none bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-orange-500/30 transition-all duration-300"
                  >
                    <span className="text-white text-sm uppercase tracking-[0.15em] font-medium group-hover:text-orange-300 transition-colors">
                      View Classes Archive
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </section>

        <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-white/25 to-transparent my-64" />



        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION — NAGAR SANKIRTAN                                  */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <section className="max-w-[1400px] mx-auto w-full px-6 md:px-12 py-48 md:py-72 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-orange-500 text-[10px] uppercase tracking-[0.4em] font-bold flex justify-center items-center gap-2">
              <Music size={12} />
              Weekly Outreach
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mt-5 mb-4">
              Nagar <span className="text-orange-400 italic">Sankirtan</span>
            </h2>

            <div className="w-full max-w-4xl mx-auto mb-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group bg-gradient-to-br from-[#121212] to-[#080808] border border-white/10 rounded-none.5rem] p-10 md:p-16 text-center shadow-2xl overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 blur-[80px] rounded-none" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/10 blur-[80px] rounded-none" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-none bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] uppercase tracking-[0.3em] font-bold mb-10">
                    <Sparkles size={12} className="animate-pulse" />
                    Weekly Gathering
                  </div>

                  <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
                    Every <span className="text-orange-400 italic">Sunday Morning</span>
                  </h3>

                  <div className="text-4xl md:text-6xl font-bold text-[#C5A059] tracking-tight mb-10">
                    6:00 <span className="text-2xl md:text-4xl font-light text-white/30 mx-2">to</span> 7:00 AM
                  </div>

                  <a
                    href="https://maps.app.goo.gl/y5ernwXYHpj7C6RA7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-col items-center gap-4 group"
                  >
                    <div className="flex items-center gap-3 text-xl md:text-2xl text-white/80 group-hover:text-white transition-colors">
                      <MapPin size={24} className="text-orange-500 group-hover:animate-bounce" />
                      <span className="border-b-2 border-orange-500/20 group-hover:border-orange-500 transition-all pb-1">
                        Company Bagh, Amritsar
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 group-hover:text-orange-400/60 transition-colors">
                      Tap to open in Maps
                    </span>
                  </a>
                </div>
              </motion.div>
            </div>

            <p className="text-white/40 max-w-xl mx-auto font-light">
              Taking the Holy Name to the streets. Every week, rain or shine.
            </p>
          </motion.div>

          <div className="w-full">
            {isSankirtanLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-pulse text-orange-500 tracking-[0.3em] text-sm font-bold uppercase">Loading...</div>
              </div>
            ) : sankirtanPosts.length === 0 ? (
              <div className="flex justify-center py-20 border border-dashed border-white/10 rounded-none max-w-4xl mx-auto">
                <div className="text-white/30 text-sm tracking-widest uppercase">No Sankirtan posts yet.</div>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full">
                {sankirtanPosts[0]?.date && (
                <div className="mb-10 text-center flex flex-col items-center">
                  {sankirtanPosts[0]?.is_pinned && <Pin size={16} className="text-orange-500 fill-orange-500 mb-2" />}
                  {sankirtanPosts[0]?.date && (
                    <>
                      <h3 className="text-2xl font-serif text-white/80">{sankirtanPosts[0].date}</h3>
                      <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent mx-auto mt-4" />
                    </>
                  )}
                </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1400px]">
                  {sankirtanPosts.map((post, i) => {
                    const embedUrl = getInstagramEmbedUrl(post.content, post.type);
                    if (!embedUrl) return null;
                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="group relative bg-[#0a0a0a] border border-white/5 rounded-none overflow-hidden shadow-2xl"
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

                {!isSankirtanLoading && sankirtanPosts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-12"
                  >
                    <Link
                      href="/iyf/sankirtan"
                      className="group flex items-center gap-3 px-8 py-4 rounded-none bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-orange-500/30 transition-all duration-300"
                    >
                      <span className="text-white text-sm uppercase tracking-[0.15em] font-medium group-hover:text-orange-300 transition-colors">
                        View Sankirtan Archive
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </section>

        <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-white/25 to-transparent my-64" />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 2 — BOOK DISTRIBUTION (DYNAMIC)                    */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <section className="max-w-[1400px] mx-auto w-full px-6 md:px-12 py-32 md:py-48 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-orange-500 text-[10px] uppercase tracking-[0.4em] font-bold flex justify-center items-center gap-2">
              <BookHeart size={12} />
              Transcendental Knowledge
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mt-5 mb-8">
              Book <span className="text-orange-400 italic">Distribution</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto font-light">
              Sharing the profound wisdom of Srila Prabhupada's books to uplift society and spread spiritual consciousness.
            </p>
          </motion.div>

          {/* PERMANENT ANNOUNCEMENT BANNER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl mx-auto mb-48 md:mb-64 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 rounded-none blur-xl group-hover:opacity-100 opacity-50 transition-opacity duration-500" />
            <div className="relative bg-[#0a0a0a]/80 backdrop-blur-md border border-orange-500/20 rounded-none p-8 md:p-12 text-center flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

              <Calendar className="w-8 h-8 text-orange-400 mb-6 opacity-80" />

              <h3 className="text-xl md:text-2xl font-serif text-white mb-4">
                Join our Weekly Book Distribution
              </h3>
              <div className="inline-block border border-orange-500/30 bg-orange-500/10 px-8 py-4 rounded-none mb-5 shadow-[0_0_20px_rgba(249,115,22,0.15)] group-hover:scale-105 transition-transform duration-500">
                <span className="text-orange-400 font-bold uppercase tracking-widest text-sm md:text-base">
                  Every Sunday • 1:00 PM to 4:00 PM
                </span>
              </div>
              <p className="text-white/50 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
                Step out and share the ultimate wisdom of the Bhagavad-gita. Experience the profound joy of changing lives through Srila Prabhupada's books.
              </p>
            </div>
          </motion.div>

          {/* DYNAMIC GRID FOR BOOK DISTRIBUTION (Latest Only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 w-full max-w-[1400px] px-6 md:px-12 mb-20 mt-20 md:mt-32">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-20">
                <div className="animate-pulse text-orange-500 tracking-[0.3em] text-sm font-bold uppercase">Loading Updates...</div>
              </div>
            ) : updates.length === 0 ? (
              <div className="col-span-full flex justify-center py-20">
                <div className="text-white/30 text-sm tracking-widest uppercase">No updates yet.</div>
              </div>
            ) : (
              updates.map((update, i) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative bg-[#0a0a0a] border border-white/5 rounded-none overflow-hidden shadow-2xl flex flex-col"
                >

                  <div className="p-6 border-b border-white/5 flex items-center justify-end bg-white/[0.01] gap-3">
                    {update.is_pinned && <Pin size={12} className="text-orange-500 fill-orange-500" />}
                    {update.date && (
                      <div className="flex items-center gap-2 text-white/30 text-xs tracking-wider uppercase">
                        <Calendar size={12} />
                        {update.date}
                      </div>
                    )}
                  </div>

                  {/* Content of the update card based on Type */}
                  <div className="p-6 flex-1 flex flex-col justify-center items-center relative min-h-[300px]">

                    {update.type === "text" && (
                      <div className="text-center w-full max-w-md">
                        <BookHeart className="w-10 h-10 text-orange-500/30 mx-auto mb-6" />
                        <p className="text-lg text-white/70 font-light leading-relaxed">
                          {update.content}
                        </p>
                      </div>
                    )}

                    {update.type === "image" && (
                      <div className="relative w-full h-full min-h-[350px] rounded-none overflow-hidden border border-white/5 bg-black/20">
                        <Image
                          src={update.content}
                          alt={update.title}
                          fill
                          className="object-contain object-center group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}

                    {(update.type === "instagram" || update.type === "instagram_link") && (() => {
                      const embedUrl = getInstagramEmbedUrl(update.content, update.type);
                      if (!embedUrl) return null;
                      return (
                        <div className="relative w-full rounded-none overflow-hidden border border-white/5 bg-[#0a0a0a]" style={{ minHeight: 500 }}>
                          <iframe
                            src={embedUrl}
                            className="w-full border-0"
                            style={{ height: 500 }}
                            allowTransparency={true}
                            scrolling="no"
                            frameBorder="0"
                          />
                        </div>
                      );
                    })()}

                  </div>
                </motion.div>
              ))
            )}
          </div>

          {!isLoading && updates.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mt-4"
            >
              <Link
                href="/iyf/gallery"
                className="group flex items-center gap-3 px-8 py-4 rounded-none bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-orange-500/30 transition-all duration-300"
              >
                <span className="text-white text-sm uppercase tracking-[0.15em] font-medium group-hover:text-orange-300 transition-colors">
                  Know More
                </span>
                <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          )}
        </section>

        <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-white/25 to-transparent my-64" />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION — PRASADAM MAKING                                  */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <section className="w-full py-32 md:py-48 bg-[#050505]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-serif text-white">
                Prasadam <span className="text-orange-400 italic">Making</span>
              </h2>
            </motion.div>

            {isPrasadamLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-pulse text-orange-500 tracking-[0.3em] text-sm font-bold uppercase">Loading Archive...</div>
              </div>
            ) : !prasadamPosts || prasadamPosts.length === 0 ? (
              <div className="flex justify-center py-20 border border-dashed border-white/10 rounded-none max-w-4xl mx-auto">
                <div className="text-white/30 text-sm tracking-widest uppercase">No memories posted yet.</div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                  {prasadamPosts.map((post, i) => {
                    const embedUrl = getInstagramEmbedUrl(post.content, post.type);
                    if (!embedUrl) return null;
                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="group relative bg-[#0a0a0a] border border-white/5 rounded-none overflow-hidden shadow-2xl"
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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex justify-center mt-12"
                >
                  <Link
                    href="/iyf/prasadam"
                    className="group flex items-center gap-3 px-8 py-4 rounded-none bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-orange-500/30 transition-all duration-300"
                  >
                    <span className="text-white text-sm uppercase tracking-[0.15em] font-medium group-hover:text-orange-300 transition-colors">
                      View Prasadam Archive
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </section>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION — CAMPS                                            */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <section className="max-w-[1400px] mx-auto w-full px-6 md:px-12 py-48 md:py-72 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-orange-500 text-[10px] uppercase tracking-[0.4em] font-bold flex justify-center items-center gap-2">
              <Tent size={12} />
              Spiritual Retreats
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mt-5 mb-8">
              IYF <span className="text-orange-400 italic">Camps</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto font-light">
              Unplug from the world and plug into the divine. Experiencing life-changing spiritual retreats.
            </p>
          </motion.div>

          <div className="w-full">
            {isCampsLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-pulse text-orange-500 tracking-[0.3em] text-sm font-bold uppercase">Loading Camps...</div>
              </div>
            ) : campsPosts.length === 0 ? (
              <div className="flex justify-center py-20 border border-dashed border-white/10 rounded-none max-w-4xl mx-auto">
                <div className="text-white/30 text-sm tracking-widest uppercase">No camps posted yet.</div>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full">
                <div className="mb-10 text-center">
                  <h3 className="text-3xl font-serif text-white">{featuredCampName}</h3>
                  <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent mx-auto mt-6" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1400px]">
                  {campsPosts.map((post, i) => {
                    const embedUrl = getInstagramEmbedUrl(post.content, post.type);
                    if (!embedUrl) return null;
                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="group relative bg-[#0a0a0a] border border-white/5 rounded-none overflow-hidden shadow-2xl"
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

                {!isCampsLoading && campsPosts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-12"
                  >
                    <Link
                      href="/iyf/camps"
                      className="group flex items-center gap-3 px-8 py-4 rounded-none bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-orange-500/30 transition-all duration-300"
                    >
                      <span className="text-white text-sm uppercase tracking-[0.15em] font-medium group-hover:text-orange-300 transition-colors">
                        View Camps Archive
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </section>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 3 — FEATURED YATRA                                 */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <section className="max-w-[1400px] mx-auto w-full px-6 md:px-12 py-48 md:py-72 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-orange-500 text-[10px] uppercase tracking-[0.4em] font-bold flex justify-center items-center gap-2">
              <Compass size={12} />
              Spiritual Journeys
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mt-5 mb-8">
              Our <span className="text-orange-400 italic">Yatras</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto font-light">
              Experience profound spiritual immersion by joining us on pilgrimages to holy places.
            </p>
          </motion.div>

          <div className="w-full">
            {isYatraLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-pulse text-orange-500 tracking-[0.3em] text-sm font-bold uppercase">Loading Featured Yatra...</div>
              </div>
            ) : featuredYatras.length === 0 ? (
              <div className="flex justify-center py-20 border border-dashed border-white/10 rounded-none max-w-4xl mx-auto">
                <div className="text-white/30 text-sm tracking-widest uppercase">No Yatras posted yet.</div>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full">
                <div className="mb-10 text-center">
                  <h3 className="text-3xl font-serif text-white">{featuredYatraName}</h3>
                  <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent mx-auto mt-6" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1400px]">
                  {featuredYatras.map((update, i) => (
                    <motion.div
                      key={update.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="group relative bg-[#0a0a0a] border border-white/5 rounded-none overflow-hidden shadow-2xl flex flex-col h-full"
                    >
                      {/* Header */}
                      <div className="p-5 border-b border-white/5 flex items-center justify-end bg-white/[0.01] gap-3">
                        {update.is_pinned && <Pin size={12} className="text-orange-500 fill-orange-500" />}
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
                            <Compass className="w-8 h-8 text-orange-500/20 mx-auto mb-4" />
                            <p className="text-base text-white/70 font-light leading-relaxed">
                              {update.content}
                            </p>
                          </div>
                        )}

                        {update.type === "image" && (
                          <div className="relative w-full aspect-square rounded-none overflow-hidden border border-white/5 bg-black/20">
                            <Image
                              src={update.content}
                              alt={update.yatra_name}
                              fill
                              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                        )}

                        {(update.type === "instagram" || update.type === "instagram_link") && (() => {
                          const embedUrl = getInstagramEmbedUrl(update.content, update.type);
                          if (!embedUrl) return null;
                          return (
                            <div className="relative w-full rounded-none overflow-hidden border border-white/5 bg-[#0a0a0a] group/embed" style={{ minHeight: 500 }}>
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
            )}
          </div>

          {!isYatraLoading && featuredYatras.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mt-12"
            >
              <Link
                href="/iyf/yatras"
                className="group flex items-center gap-3 px-8 py-4 rounded-none bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-orange-500/30 transition-all duration-300"
              >
                <span className="text-white text-sm uppercase tracking-[0.15em] font-medium group-hover:text-orange-300 transition-colors">
                  View All Yatras
                </span>
                <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          )}
        </section>

        <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-white/25 to-transparent my-64" />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION — MEGA EVENTS                                      */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <section className="w-full py-32 md:py-48 bg-[#050505]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-serif text-white">
                Mega <span className="text-orange-400 italic">Events</span>
              </h2>
            </motion.div>

            {isMegaEventsLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-pulse text-orange-500 tracking-[0.3em] text-sm font-bold uppercase">Loading Archive...</div>
              </div>
            ) : !megaEventsPosts || megaEventsPosts.length === 0 ? (
              <div className="flex justify-center py-20 border border-dashed border-white/10 rounded-none max-w-4xl mx-auto">
                <div className="text-white/30 text-sm tracking-widest uppercase">No memories posted yet.</div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                  {megaEventsPosts.map((post, i) => {
                    const embedUrl = getInstagramEmbedUrl(post.content, post.type);
                    if (!embedUrl) return null;
                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="group relative bg-[#0a0a0a] border border-white/5 rounded-none overflow-hidden shadow-2xl"
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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex justify-center mt-12"
                >
                  <Link
                    href="/iyf/mega-events"
                    className="group flex items-center gap-3 px-8 py-4 rounded-none bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-orange-500/30 transition-all duration-300"
                  >
                    <span className="text-white text-sm uppercase tracking-[0.15em] font-medium group-hover:text-orange-300 transition-colors">
                      View Mega Events Archive
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </section>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION — VAISHNAVA VISITS                                 */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <section className="w-full py-32 md:py-48 bg-[#050505]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-serif text-white">
                Vaishnava <span className="text-orange-400 italic">Visits</span>
              </h2>
            </motion.div>

            {isVaishnavaLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-pulse text-orange-500 tracking-[0.3em] text-sm font-bold uppercase">Loading Archive...</div>
              </div>
            ) : !vaishnavaPosts || vaishnavaPosts.length === 0 ? (
              <div className="flex justify-center py-20 border border-dashed border-white/10 rounded-none max-w-4xl mx-auto">
                <div className="text-white/30 text-sm tracking-widest uppercase">No memories posted yet.</div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                  {vaishnavaPosts.map((post, i) => {
                    const embedUrl = getInstagramEmbedUrl(post.content, post.type);
                    if (!embedUrl) return null;
                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="group relative bg-[#0a0a0a] border border-white/5 rounded-none overflow-hidden shadow-2xl"
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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex justify-center mt-12"
                >
                  <Link
                    href="/iyf/vaishnava-visits"
                    className="group flex items-center gap-3 px-8 py-4 rounded-none bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-orange-500/30 transition-all duration-300"
                  >
                    <span className="text-white text-sm uppercase tracking-[0.15em] font-medium group-hover:text-orange-300 transition-colors">
                      View Visits Archive
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </section>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 4 — CONTACT / CTA                                  */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <section className="relative w-full py-32 md:py-48 overflow-hidden flex flex-col items-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/[0.04] rounded-none blur-[150px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full max-w-4xl mx-auto px-6"
          >
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-none p-10 md:p-20 flex flex-col items-center text-center relative overflow-hidden">

              <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/20 blur-[80px]" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-500/20 blur-[80px]" />

              <Flame className="w-12 h-12 text-orange-500 mb-8 opacity-80" />

              <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 text-center">
                Ready to <span className="italic text-orange-400">Begin?</span>
              </h2>

              <p className="text-lg text-white/50 font-light mb-12 max-w-xl mx-auto">
                Take the first step towards a vibrant, purposeful life. Join our WhatsApp group to stay updated on upcoming youth festivals, seminars, and retreats.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="https://wa.link/r2mel6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-none bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 hover:border-[#25D366]/50 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <span className="text-[#25D366] text-sm uppercase tracking-widest font-bold">
                    Join WhatsApp
                  </span>
                </a>

                <a
                  href="tel:+919646968900"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-none bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <Phone className="w-5 h-5 text-orange-400" />
                  <span className="text-white/80 text-sm tracking-widest font-medium">
                    Call Us
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}
