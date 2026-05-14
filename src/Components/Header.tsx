"use client";

import React, { useEffect, useState, startTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Megaphone,
  Images,
  Sparkles,
  Mail,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Home,
  Heart,
  Users
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

/* ================= TYPES ================= */

type IconItem = {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  id?: string;
  href?: string;
  url?: string;
};

type HeaderIconButtonProps = {
  item: IconItem;
  pathname: string;
  router: ReturnType<typeof useRouter>;
  scrollToSection: (id: string) => void;
  closeMenu: () => void;
};

/* ================= COMPONENT ================= */

export default function Header({ onlyLogo = false }: { onlyLogo?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarshanOpen, setIsDarshanOpen] = useState(false);
  const [isCommunitiesOpen, setIsCommunitiesOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  const scrollToSection = (id: string) => {
    closeMenu();
    if (pathname !== "/") {
      startTransition(() => {
        router.push("/");
      });
      // Longer timeout for cross-page navigation to ensure SSR and hydration complete
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 500);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    closeMenu();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      startTransition(() => {
        router.push("/");
      });
    }
  };

  const icons: IconItem[] = [
    { Icon: Megaphone, id: "events-section", label: "Announcements" },
    {
      Icon: ShoppingBag,
      url: "https://www.instagram.com/matchless_vedic_corner/",
      label: "Matchless Gifts",
    },
    { Icon: Mail, href: "/contact", label: "Contact Us" },
  ];

  if (!mounted) return (
    <header className="fixed top-0 left-0 w-full z-[100] h-[80px] bg-gradient-to-b from-black/50 to-transparent flex items-center px-4 md:px-10">
      <div className={`w-full flex ${onlyLogo ? 'justify-start' : 'justify-start'}`}>
        <img src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/logo.png" alt="ISKCON Logo" className="h-[58px]" />
      </div>
    </header>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
          onlyLogo
            ? "h-[90px] bg-transparent pointer-events-none"
            : scrolled
              ? "h-[70px] bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
              : "h-[90px] bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none"
        }`}
      >
        <div className={`h-full px-4 md:px-12 flex items-center pointer-events-auto ${onlyLogo ? 'justify-start w-full' : 'justify-between lg:grid lg:grid-cols-[300px_1fr_320px]'}`}>
          {/* LOGO */}
          <button onClick={handleLogoClick} className="relative group">
            <img
              src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/logo.png"
              alt="ISKCON Logo"
              className={`transition-all duration-500 object-contain ${scrolled ? "h-[45px]" : "h-[55px]"
                }`}
            />
            <div className="absolute -bottom-1 left-0 w-0 h-px bg-[#C5A059] group-hover:w-full transition-all duration-500" />
          </button>

          {!onlyLogo && (
            <nav className="hidden lg:flex items-center justify-center gap-12">
              <button
                onClick={() => scrollToSection("iskcon-section")}
                className="text-white/80 text-xs font-serif uppercase tracking-[0.3em] font-medium hover:text-[#C5A059] hover:drop-shadow-[0_0_8px_rgba(197,160,89,0.5)] transition-all"
              >
                ISKCON
              </button>

              <button
                onClick={() => scrollToSection("social-section")}
                className="text-white/80 text-xs font-serif uppercase tracking-[0.3em] font-medium hover:text-[#C5A059] hover:drop-shadow-[0_0_8px_rgba(197,160,89,0.5)] transition-all"
              >
                Media
              </button>

              {/* FIXED: Added router navigation */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(197, 160, 89, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => startTransition(() => router.push("/donate"))}
                className="min-w-[200px] h-[48px] rounded-none bg-[#C5A059] text-black text-[12px] font-sans !font-black uppercase tracking-[0.4em] hover:bg-[#E2C792] transition-all shadow-[0_0_20px_rgba(197,160,89,0.3)]"
              >
                Donate
              </motion.button>

              {/* DARSHAN DROPDOWN */}
              <div
                className="relative group"
                onMouseEnter={() => setIsDarshanOpen(true)}
                onMouseLeave={() => setIsDarshanOpen(false)}
              >
                <button
                  className="flex items-center gap-2 text-white/80 text-xs font-serif uppercase tracking-[0.3em] font-medium hover:text-[#C5A059] transition-all"
                >
                  Darshan
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isDarshanOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isDarshanOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-[#121212]/95 backdrop-blur-xl border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] rounded-none py-3 z-[110]"
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[#121212]/95"></div>

                      <button
                        onClick={() => { router.push("/daily-darshan"); setIsDarshanOpen(false); }}
                        className="w-full text-left px-6 py-3 text-white/70 hover:text-[#C5A059] hover:bg-white/5 transition-all text-[11px] uppercase tracking-widest font-medium"
                      >
                        Daily Darshan
                      </button>
                      <button
                        onClick={() => { router.push("/festive"); setIsDarshanOpen(false); }}
                        className="w-full text-left px-6 py-3 text-white/70 hover:text-[#C5A059] hover:bg-white/5 transition-all text-[11px] uppercase tracking-widest font-medium"
                      >
                        Festive Darshan
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* COMMUNITIES DROPDOWN */}
              <div
                className="relative group"
                onMouseEnter={() => setIsCommunitiesOpen(true)}
                onMouseLeave={() => setIsCommunitiesOpen(false)}
              >
                <button
                  className="flex items-center gap-2 text-white/80 text-xs font-serif uppercase tracking-[0.3em] font-medium hover:text-[#C5A059] transition-all"
                >
                  Communities
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isCommunitiesOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isCommunitiesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-60 bg-[#121212]/95 backdrop-blur-xl border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] rounded-none py-3 z-[110]"
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[#121212]/95"></div>

                      <button
                        onClick={() => { router.push("/iyf"); setIsCommunitiesOpen(false); }}
                        className="w-full text-left px-6 py-3 text-white/70 hover:text-[#C5A059] hover:bg-white/5 transition-all text-[11px] uppercase tracking-widest font-medium"
                      >
                        ISKCON Youth Forum
                      </button>
                      <button
                        onClick={() => { router.push("/igf"); setIsCommunitiesOpen(false); }}
                        className="w-full text-left px-6 py-3 text-white/70 hover:text-[#C5A059] hover:bg-white/5 transition-all text-[11px] uppercase tracking-widest font-medium"
                      >
                        ISKCON Girls Forum
                      </button>
                      <button
                        onClick={() => { router.push("/home-sankirtan"); setIsCommunitiesOpen(false); }}
                        className="w-full text-left px-6 py-3 text-white/70 hover:text-[#C5A059] hover:bg-white/5 transition-all text-[11px] uppercase tracking-widest font-medium"
                      >
                        Home Sankirtan
                      </button>
                      <button
                        onClick={() => { router.push("/bhakti-vriksha"); setIsCommunitiesOpen(false); }}
                        className="w-full text-left px-6 py-3 text-white/70 hover:text-[#C5A059] hover:bg-white/5 transition-all text-[11px] uppercase tracking-widest font-medium"
                      >
                        Bhakti Vriksha
                      </button>
                      <button
                        onClick={() => { router.push("/bps"); setIsCommunitiesOpen(false); }}
                        className="w-full text-left px-6 py-3 text-white/70 hover:text-[#C5A059] hover:bg-white/5 transition-all text-[11px] uppercase tracking-widest font-medium"
                      >
                        Bhakt Prahlad (Kids)
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => scrollToSection("temple-section")}
                className="text-white/80 text-xs font-serif uppercase tracking-[0.3em] font-medium hover:text-[#C5A059] hover:drop-shadow-[0_0_8px_rgba(197,160,89,0.5)] transition-all"
              >
                Temple
              </button>
            </nav>
          )}

          {!onlyLogo && (
            <div className="hidden lg:flex justify-end items-center gap-2 pr-8">
              {icons.map((item, idx) => (
                <HeaderIconButton
                  key={idx}
                  item={item}
                  pathname={pathname}
                  router={router}
                  scrollToSection={scrollToSection}
                  closeMenu={closeMenu}
                />
              ))}
            </div>
          )}

          {/* REMOVED MOBILE MENU BUTTON FROM TOP */}
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION */}
      {!onlyLogo && (
        <nav className="lg:hidden fixed bottom-0 left-0 w-full z-[100] bg-[#050505]/80 backdrop-blur-2xl border-t border-white/10 h-[72px] flex items-center justify-around px-2 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          <button
            onClick={handleLogoClick}
            className={`flex flex-col items-center gap-1 transition-all ${pathname === "/" ? "text-[#C5A059]" : "text-white/40"}`}
          >
            <Home size={20} />
            <span className="text-[10px] uppercase tracking-widest font-bold">Home</span>
          </button>

          <button
            onClick={() => startTransition(() => router.push("/daily-darshan"))}
            className={`flex flex-col items-center gap-1 transition-all ${pathname.includes("darshan") ? "text-[#C5A059]" : "text-white/40"}`}
          >
            <Sparkles size={20} />
            <span className="text-[10px] uppercase tracking-widest font-bold">Darshan</span>
          </button>

          {/* Center Donate Button */}
          <button
            onClick={() => startTransition(() => router.push("/donate"))}
            className="flex flex-col items-center justify-center -translate-y-4"
          >
            <div className="w-14 h-14 bg-[#C5A059] rounded-none flex items-center justify-center shadow-[0_0_30px_rgba(197,160,89,0.5)] text-black mb-1">
              <Heart size={24} fill="currentColor" />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#C5A059]">Donate</span>
          </button>

          <button
            onClick={() => startTransition(() => router.push("/iyf"))}
            className={`flex flex-col items-center gap-1 transition-all ${pathname === "/iyf" ? "text-[#C5A059]" : "text-white/40"}`}
          >
            <Users size={20} />
            <span className="text-[10px] uppercase tracking-widest font-bold">Join Us</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center gap-1 text-white/40"
          >
            <Menu size={20} />
            <span className="text-[10px] uppercase tracking-widest font-bold">More</span>
          </button>
        </nav>
      )}

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            onClick={closeMenu}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105]"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="absolute right-0 top-0 h-full w-[88%] bg-[#121212] px-6 pt-14 pb-10 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-[#C5A059] text-xs tracking-[0.4em] uppercase">
                  Menu
                </span>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-none bg-white/5 border border-white/10"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-full flex flex-col gap-6">
                  <button
                    onClick={() => scrollToSection("iskcon-section")}
                    className="text-white text-xl tracking-[0.35em] uppercase border-b border-white/10 pb-4"
                  >
                    ISKCON
                  </button>

                  <button
                    onClick={() => scrollToSection("social-section")}
                    className="text-white text-xl tracking-[0.35em] uppercase border-b border-white/10 pb-4"
                  >
                    MEDIA
                  </button>

                  {/* FIXED: Added router navigation and menu close */}
                  <button
                    onClick={() => {
                      router.push("/donate");
                      closeMenu();
                    }}
                    className="mt-2 w-full py-4 rounded-none bg-[#C5A059] text-black text-sm font-bold tracking-[0.35em] uppercase active:scale-95 transition-transform shadow-[0_0_25px_rgba(197,160,89,0.4)]"
                  >
                    DONATE NOW
                  </button>

                  <div className="flex flex-col gap-4 py-2">
                    <p className="text-[#C5A059] text-[10px] tracking-[0.4em] uppercase text-center">Darshan</p>
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => { router.push("/daily-darshan"); closeMenu(); }}
                        className="text-white text-base tracking-[0.2em] font-light uppercase py-2 hover:text-[#C5A059] transition-colors"
                      >
                        Daily Darshan
                      </button>
                      <button
                        onClick={() => { router.push("/festive"); closeMenu(); }}
                        className="text-white text-base tracking-[0.2em] font-light uppercase py-2 hover:text-[#C5A059] transition-colors"
                      >
                        Festive Darshan
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 py-2">
                    <p className="text-[#C5A059] text-[10px] tracking-[0.4em] uppercase text-center">Communities</p>
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => { router.push("/iyf"); closeMenu(); }}
                        className="text-white text-base tracking-[0.2em] font-light uppercase py-2 hover:text-[#C5A059] transition-colors"
                      >
                        Youth Forum
                      </button>
                      <button
                        onClick={() => { router.push("/igf"); closeMenu(); }}
                        className="text-white text-base tracking-[0.2em] font-light uppercase py-2 hover:text-[#C5A059] transition-colors"
                      >
                        Girls Forum
                      </button>
                      <button
                        onClick={() => { router.push("/home-sankirtan"); closeMenu(); }}
                        className="text-white text-base tracking-[0.2em] font-light uppercase py-2 hover:text-[#C5A059] transition-colors"
                      >
                        Home Sankirtan
                      </button>
                      <button
                        onClick={() => { router.push("/bhakti-vriksha"); closeMenu(); }}
                        className="text-white text-base tracking-[0.2em] font-light uppercase py-2 hover:text-[#C5A059] transition-colors"
                      >
                        Bhakti Vriksha
                      </button>
                      <button
                        onClick={() => { router.push("/bps"); closeMenu(); }}
                        className="text-white text-base tracking-[0.2em] font-light uppercase py-2 hover:text-[#C5A059] transition-colors"
                      >
                        Bhakt Prahlad (Kids)
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => scrollToSection("temple-section")}
                    className="text-white text-xl tracking-[0.35em] uppercase border-b border-white/10 pb-4"
                  >
                    TEMPLE
                  </button>
                </div>

                <div className="w-full mt-10">
                  <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-5">
                    QUICK ACCESS
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {icons.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (item.url) window.open(item.url, "_blank");
                          else if (item.href) startTransition(() => router.push(item.href!));
                          else if (item.id) scrollToSection(item.id);
                          closeMenu();
                        }}
                        className="flex items-center gap-3 px-3 py-3 rounded-none bg-white/5 border border-white/10"
                      >
                        <item.Icon size={16} className="text-[#C5A059]" />
                        <span className="text-white text-xs">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HeaderIconButton({
  item,
  pathname,
  router,
  scrollToSection,
  closeMenu,
}: HeaderIconButtonProps) {
  const isActive = item.href && pathname === item.href;

  return (
    <button
      onClick={() => {
        if (item.url) window.open(item.url, "_blank");
        else if (item.href) startTransition(() => router.push(item.href!));
        else if (item.id) scrollToSection(item.id);
        closeMenu();
      }}
      className="group flex flex-col items-center gap-1"
    >
      <div
        className={`w-10 h-10 rounded-none flex items-center justify-center border transition-all duration-300 ${
          isActive
            ? "text-[#C5A059] border-[#C5A059] bg-[#C5A059]/10 shadow-[0_0_15px_rgba(197,160,89,0.3)]"
            : "text-white/40 border-white/10 group-hover:text-[#C5A059] group-hover:border-[#C5A059]/50 group-hover:bg-[#C5A059]/5 group-hover:-translate-y-0.5 group-hover:shadow-[0_4px_12px_rgba(197,160,89,0.15)]"
        }`}
      >
        <item.Icon size={18} />
      </div>
      <span className="text-[7px] text-white/30 group-hover:text-white/50 uppercase tracking-widest font-bold transition-colors duration-300 whitespace-nowrap">
        {item.label}
      </span>
    </button>
  );
}
