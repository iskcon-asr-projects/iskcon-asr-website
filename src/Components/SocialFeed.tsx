"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Radio, ExternalLink, RefreshCw } from "lucide-react";

/* ---- Inline brand icons (lucide-react doesn't include these) ---- */
function YoutubeLogo({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function InstagramLogo({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

/* ============================================================
   TYPES
============================================================ */
interface VideoItem {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
}

interface LiveStatus {
  isLive: boolean;
  videoId?: string;
  title?: string;
  thumbnail?: string;
}

// Session-level cache to prevent loading flicker on navigation
let cachedVideos: VideoItem[] | null = null;
let cachedLiveStatus: LiveStatus | null = null;
let cachedLastUpdated: Date | null = null;

/* ============================================================
   HELPERS
============================================================ */
function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

/* ============================================================
   LIVE BADGE
============================================================ */
function LiveBadge({ liveStatus }: { liveStatus: LiveStatus }) {
  if (!liveStatus.isLive) return null;

  return (
    <motion.a
      href={`https://www.youtube.com/watch?v=${liveStatus.videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="group col-span-full flex items-stretch gap-0 rounded-none overflow-hidden border border-red-500/40 shadow-[0_0_40px_rgba(239,68,68,0.2)] hover:shadow-[0_0_60px_rgba(239,68,68,0.35)] transition-all duration-500 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative w-56 sm:w-72 shrink-0 overflow-hidden">
        {liveStatus.thumbnail ? (
          <img
            src={liveStatus.thumbnail}
            alt="Live stream thumbnail"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-900/60 to-black" />
        )}
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors duration-300">
          <div className="w-14 h-14 rounded-none bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Play size={22} className="text-white ml-1" fill="white" />
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 flex flex-col justify-center py-5 px-6 bg-gradient-to-r from-red-950/40 via-[#0a0a0a] to-[#0a0a0a] backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          {/* Pulsing dot */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-none h-3 w-3 bg-red-500" />
          </span>
          <span className="text-red-400 text-[11px] font-bold uppercase tracking-[0.35em]">Live Now</span>
        </div>
        <h3 className="text-white text-base sm:text-lg font-semibold leading-snug mb-2 line-clamp-2">
          {liveStatus.title || "Live Stream in Progress"}
        </h3>
        <p className="text-white/50 text-xs uppercase tracking-widest">
          ISKCON Amritsar · Tap to watch live
        </p>
      </div>
    </motion.a>
  );
}

/* ============================================================
   VIDEO CARD
============================================================ */
function VideoCard({ video, index }: { video: VideoItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={`https://www.youtube.com/watch?v=${video.videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group flex flex-col rounded-none overflow-hidden border border-white/5 bg-white/[0.02] hover:border-[#C5A059]/30 hover:bg-white/[0.04] hover:shadow-[0_8px_30px_rgba(197,160,89,0.12)] transition-all duration-500 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-black">
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Play button */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-14 h-14 rounded-none bg-[#C5A059] flex items-center justify-center shadow-[0_0_30px_rgba(197,160,89,0.5)]">
                <Play size={20} className="text-black ml-1" fill="black" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* YouTube icon (always visible) */}
        <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-none bg-red-600/80 flex items-center justify-center">
          <YoutubeLogo size={13} className="text-white" />
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5 flex flex-col gap-1 flex-1">
        <h3 className="text-white/90 text-sm font-medium leading-snug line-clamp-2 group-hover:text-[#C5A059] transition-colors duration-300">
          {video.title}
        </h3>
        <p className="text-white/35 text-[11px] mt-auto pt-1.5">{timeAgo(video.publishedAt)}</p>
      </div>
    </motion.a>
  );
}

/* ============================================================
   INSTAGRAM CARD
============================================================ */
function InstagramCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative overflow-hidden rounded-none border border-white/5 bg-gradient-to-br from-[#833ab4]/10 via-[#fd1d1d]/8 to-[#fcb045]/10 backdrop-blur-sm p-8 flex flex-col items-center text-center gap-6"
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-16 -left-16 w-48 h-48 rounded-none bg-[#833ab4]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 w-48 h-48 rounded-none bg-[#fcb045]/10 blur-3xl" />

      {/* Icon */}
      <div className="relative z-10 w-20 h-20 rounded-none bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center shadow-[0_8px_30px_rgba(131,58,180,0.3)]">
        <InstagramLogo size={36} className="text-white" />
      </div>

      <div className="relative z-10">
        <p className="text-white/50 text-[11px] uppercase tracking-[0.4em] mb-2">Follow us on</p>
        <h3 className="text-2xl font-serif text-white mb-1">Instagram</h3>
        <p className="text-white/40 text-sm">@iskcon_amritsar</p>
      </div>

      <p className="relative z-10 text-white/60 text-sm leading-relaxed max-w-xs">
        Stay connected with our latest darshans, festivals, kirtans, and spiritual moments — updated daily.
      </p>

      <a
        href="https://www.instagram.com/iskcon_amritsar/"
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 group flex items-center gap-2 px-8 py-3 rounded-none border border-[#fd1d1d]/40 text-white/80 text-sm font-medium tracking-wide hover:bg-gradient-to-r hover:from-[#833ab4]/20 hover:to-[#fcb045]/20 hover:border-[#fd1d1d]/70 hover:text-white hover:shadow-[0_0_30px_rgba(253,29,29,0.2)] transition-all duration-400"
      >
        <InstagramLogo size={16} className="text-[#fd1d1d] group-hover:scale-110 transition-transform" />
        View Profile
        <ExternalLink size={13} className="opacity-50" />
      </a>

      {/* Note about automation */}
      <p className="relative z-10 text-white/25 text-[10px] leading-relaxed">
        Instagram's API no longer supports public<br />feed embedding — follow us directly.
      </p>
    </motion.div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */
export default function SocialFeed() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [liveStatus, setLiveStatus] = useState<LiveStatus>({ isLive: false });
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Load from cache ONCE on client mount to avoid hydration mismatch
  useEffect(() => {
    if (cachedVideos) setVideos(cachedVideos);
    if (cachedLiveStatus) setLiveStatus(cachedLiveStatus);
    if (cachedLastUpdated) setLastUpdated(cachedLastUpdated);
    if (cachedVideos) setLoadingVideos(false);
  }, []);

  const fetchVideos = useCallback(async (signal?: AbortSignal) => {
    try {
      const res = await fetch("/api/youtube/videos", { signal });
      if (res.ok) {
        const data = await res.json();
        const videoData = data.videos || [];
        setVideos(videoData);
        cachedVideos = videoData;
        const now = new Date();
        setLastUpdated(now);
        cachedLastUpdated = now;
      }
    } catch (e) {
      if (e instanceof Error && e.name !== 'AbortError') {
        console.error("Failed to fetch videos:", e);
      }
    } finally {
      setLoadingVideos(false);
    }
  }, []);

  const fetchLiveStatus = useCallback(async (signal?: AbortSignal) => {
    try {
      const res = await fetch("/api/youtube/live", { signal });
      if (res.ok) {
        const data = await res.json();
        setLiveStatus(data);
        cachedLiveStatus = data;
      }
    } catch (e) {
      if (e instanceof Error && e.name !== 'AbortError') {
        console.error("Failed to fetch live status:", e);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    // Initial fetch
    fetchVideos(controller.signal);
    fetchLiveStatus(controller.signal);

    // Auto-refresh: videos every 5 minutes, live every 60 seconds
    const videosInterval = setInterval(() => {
      fetchVideos(controller.signal);
    }, 5 * 60 * 1000);
    
    const liveInterval = setInterval(() => {
      fetchLiveStatus(controller.signal);
    }, 60 * 1000);

    return () => {
      controller.abort();
      clearInterval(videosInterval);
      clearInterval(liveInterval);
    };
  }, [fetchVideos, fetchLiveStatus]);

  return (
    <section
      id="social-section"
      className="w-full py-20 md:py-32 scroll-mt-[100px] overflow-clip"
    >
      {/* ——— SECTION HEADER ——— */}
      <div className="px-4 md:px-10 mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center gap-4"
        >
          <p className="text-[#C5A059]/60 text-[11px] uppercase tracking-[0.45em] font-medium">
            Connect With Us
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight">
            Latest from ISKCON Amritsar
          </h2>

          {/* Ornamental divider */}
          <div className="flex items-center gap-3 mt-1">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C5A059]/60" />
            <div className="w-1.5 h-1.5 bg-[#C5A059] rotate-45 shadow-[0_0_8px_rgba(197,160,89,0.8)]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C5A059]/60" />
          </div>

          {/* Live indicator + refresh time */}
          <div className="flex items-center gap-4 mt-1">
            <AnimatePresence mode="wait">
              {liveStatus.isLive ? (
                <motion.div
                  key="live"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-none bg-red-500/10 border border-red-500/30"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-red-500 opacity-75" />
                    <span className="relative inline-flex rounded-none h-2 w-2 bg-red-500" />
                  </span>
                  <span className="text-red-400 text-[11px] font-bold uppercase tracking-widest">Live Now</span>
                </motion.div>
              ) : (
                <motion.div
                  key="offline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-none bg-white/5 border border-white/10"
                >
                  <Radio size={12} className="text-white/30" />
                  <span className="text-white/30 text-[11px] uppercase tracking-widest">Offline</span>
                </motion.div>
              )}
            </AnimatePresence>

            {lastUpdated && (
              <div className="flex items-center gap-1.5 text-white/25 text-[10px]" suppressHydrationWarning>
                <RefreshCw size={10} />
                Updated {timeAgo(lastUpdated.toISOString())}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ——— CONTENT GRID ——— */}
      <div className="px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 xl:gap-12">

          {/* LEFT: YouTube */}
          <div className="flex flex-col gap-6">

            {/* Live banner (animated in/out) */}
            <AnimatePresence>
              {liveStatus.isLive && <LiveBadge liveStatus={liveStatus} />}
            </AnimatePresence>

            {/* Videos grid header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-none bg-red-600 flex items-center justify-center">
                  <YoutubeLogo size={16} className="text-white" />
                </div>
                <h3 className="text-white font-medium text-sm tracking-wide">Latest Videos</h3>
              </div>
              <a
                href="https://www.youtube.com/@iskcon_amritsar/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#C5A059]/70 hover:text-[#C5A059] text-xs uppercase tracking-widest transition-colors duration-300"
              >
                View all <ExternalLink size={11} />
              </a>
            </div>

            {/* Videos — 3 col grid */}
            {loadingVideos ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-none overflow-hidden border border-white/5 bg-white/[0.02] animate-pulse">
                    <div className="aspect-video bg-white/5" />
                    <div className="p-3.5 space-y-2">
                      <div className="h-3 bg-white/5 rounded w-full" />
                      <div className="h-3 bg-white/5 rounded w-3/4" />
                      <div className="h-2.5 bg-white/5 rounded w-1/4 mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : videos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {videos.map((video, i) => (
                  <VideoCard key={video.videoId} video={video} index={i} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-white/30 gap-3">
                <YoutubeLogo size={36} className="opacity-30" />
                <p className="text-sm">No videos found</p>
              </div>
            )}
          </div>

          {/* RIGHT: Instagram */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-none bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center">
                <InstagramLogo size={16} className="text-white" />
              </div>
              <h3 className="text-white font-medium text-sm tracking-wide">Instagram</h3>
            </div>
            <InstagramCard />
          </div>

        </div>
      </div>

    </section>
  );
}
