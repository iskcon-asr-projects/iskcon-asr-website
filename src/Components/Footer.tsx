"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Camera, 
  Video, 
  Globe, 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin, 
  Heart
} from "lucide-react";
import Link from "next/link";

const MAHAMANTRA_ROMAN = "HARE KRISHNA HARE KRISHNA KRISHNA KRISHNA HARE HARE ✦ HARE RAMA HARE RAMA RAMA RAMA HARE HARE ✦";
const MAHAMANTRA_SANSKRIT = "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे ✦ हरे राम हरे राम राम राम हरे हरे ✦";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full flex flex-col items-center justify-center bg-[#050505] overflow-hidden border-t border-white/5">

      {/* ─── MAHAMANTRA SCROLLING MARQUEE ─── */}
      <div className="relative w-full py-8 border-b border-[#C5A059]/10 bg-gradient-to-r from-[#C5A059]/[0.02] via-[#C5A059]/[0.05] to-[#C5A059]/[0.02] overflow-hidden">
        <div className="footer-marquee-track">
          {/* Two identical halves for a perfect seamless loop */}
          {[0, 1].map((half) => (
            <div key={half} className="footer-marquee-half gap-6 pr-6">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="inline-flex items-center whitespace-nowrap gap-6">
                  <span className="text-[26px] md:text-[34px] font-serif uppercase tracking-[0.3em] text-[#C5A059]/80">
                    {MAHAMANTRA_ROMAN}
                  </span>
                  <span className="text-[30px] md:text-[38px] font-serif text-[#C5A059]/50">
                    {MAHAMANTRA_SANSKRIT}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ─── AMBIENT GLOW ─── */}
      <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-[#C5A059]/[0.03] blur-[150px] rounded-none pointer-events-none" />

      {/* ─── MAIN FOOTER CONTENT ─── */}
      <div className="w-full flex justify-center py-24 relative z-10">
        <div className="w-[90%] max-w-[1200px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-12 place-items-center">
            
            {/* ── COL 1: TEMPLE ── */}
            <div className="flex flex-col items-center text-center gap-8 w-full max-w-[280px]">
              <img src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/logo.png" alt="ISKCON Amritsar" className="h-20 brightness-110" />
              <p className="text-white/40 text-[12px] leading-[2] tracking-wider">
                A spiritual oasis dedicated to Krishna Consciousness, following the path of Srila Prabhupada.
              </p>
              <div className="flex items-center justify-center gap-5 pt-2">
                {[
                  { Icon: Camera, href: "https://www.instagram.com/iskcon_amritsar/" },
                  { Icon: Video, href: "https://www.youtube.com/@iskcon_amritsar" },
                  { Icon: Globe, href: "https://www.facebook.com/IskconTemplesAmritsar/" },
                  { Icon: MessageSquare, href: "#" },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15 }}
                    className="w-10 h-10 rounded-none border border-white/10 hover:border-[#C5A059]/50 flex items-center justify-center text-[#C5A059]/70 hover:text-[#C5A059] hover:bg-[#C5A059]/10 transition-all duration-300"
                  >
                    <social.Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* ── COL 2: QUICK LINKS ── */}
            <div className="flex flex-col items-center text-center gap-8 w-full">
              <h4 className="text-[#C5A059] text-[11px] font-serif uppercase tracking-[0.4em] font-bold pb-3 border-b border-[#C5A059]/30 inline-block">
                Quick Links
              </h4>
              <ul className="flex flex-col items-center gap-5">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Iskcon", href: "/#iskcon-section" },
                  { label: "Daily Darshan", href: "/daily-darshan" },
                  { label: "Festive Darshan", href: "/festive" },
                  { label: "Donate Now", href: "/donate" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      href={link.href}
                      className="text-white/50 hover:text-[#C5A059] text-[11px] uppercase tracking-[0.3em] transition-all duration-300 hover:scale-105 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── COL 3: CONTACT ── */}
            <div className="flex flex-col items-center text-center gap-8 w-full max-w-[280px]">
              <h4 className="text-[#C5A059] text-[11px] font-serif uppercase tracking-[0.4em] font-bold pb-3 border-b border-[#C5A059]/30 inline-block">
                Visit Us
              </h4>
              <ul className="flex flex-col items-center gap-6">
                <li className="flex flex-col items-center gap-3">
                  <MapPin size={18} className="text-[#C5A059]/50" />
                  <span className="text-white/50 text-[11px] leading-[2] tracking-wider">
                    Sri Sri Gaur Nitai Temple,<br/>Vrindavan Gardens, Fatehgarh Churian Road,<br/>Amritsar, Punjab — 143008
                  </span>
                </li>
                <li className="flex flex-col items-center gap-3">
                  <Phone size={18} className="text-[#C5A059]/50" />
                  <span className="text-white/50 text-[11px] tracking-[0.2em]">+91 77400 52036</span>
                  <span className="text-white/30 text-[9px] uppercase tracking-wider -mt-2">(10 AM - 7 PM, Mon-Sat)</span>
                </li>
                <li className="flex flex-col items-center gap-3">
                  <Mail size={18} className="text-[#C5A059]/50" />
                  <span className="text-white/50 text-[11px] tracking-wider">iskconamritsaroffice@gmail.com</span>
                </li>
              </ul>
            </div>

            {/* ── COL 4: INITIATIVES ── */}
            <div className="flex flex-col items-center text-center gap-8 w-full">
              <h4 className="text-[#C5A059] text-[11px] font-serif uppercase tracking-[0.4em] font-bold pb-3 border-b border-[#C5A059]/30 inline-block">
                Initiatives
              </h4>
              <div className="flex flex-wrap justify-center gap-3 max-w-[260px]">
                {[
                  { name: "Food for Life", href: null },
                  { name: "Home Sankirtan", href: "/home-sankirtan" },
                  { name: "Iskcon Youth Forum", href: "/iyf" },
                  { name: "Bhakti Vriksha", href: "/bhakti-vriksha" },
                  { name: "Srila Prabhupada", href: "/prabhupada" },
                  { name: "Matchless Gifts", href: null }
                ].map((item, idx) => {
                  if (item.href) {
                    return (
                      <Link 
                        key={idx}
                        href={item.href}
                        className="px-4 py-2 rounded-none bg-white/[0.04] border border-white/10 text-white/40 text-[9px] uppercase tracking-[0.2em] transition-all duration-300 hover:text-[#C5A059] hover:bg-[#C5A059]/10 hover:border-[#C5A059]/40 cursor-pointer"
                      >
                        {item.name}
                      </Link>
                    );
                  }
                  return (
                    <span 
                      key={idx}
                      className="px-4 py-2 rounded-none bg-white/[0.04] border border-white/10 text-white/40 text-[9px] uppercase tracking-[0.2em] transition-all duration-300 cursor-default"
                    >
                      {item.name}
                    </span>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ─── BOTTOM BAR ─── */}
      <div className="w-full border-t border-white/10 flex justify-center">
        <div className="w-[90%] max-w-[1200px] py-8 flex flex-col md:flex-row items-center justify-center gap-6 md:justify-between">
          <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] text-center md:text-left">
            © {currentYear} ISKCON Amritsar
          </p>
          <div className="flex items-center justify-center gap-3 text-white/40 text-[10px] uppercase tracking-[0.2em]">
            <span>Made with</span>
            <Heart size={12} className="text-[#C5A059] fill-[#C5A059]/40 animate-pulse" />
            <span>for Krishna</span>
          </div>
          <div className="flex justify-center gap-10">
            <Link href="/privacy" className="text-white/30 hover:text-[#C5A059] text-[10px] uppercase tracking-[0.25em] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/30 hover:text-[#C5A059] text-[10px] uppercase tracking-[0.25em] transition-colors">Terms</Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
