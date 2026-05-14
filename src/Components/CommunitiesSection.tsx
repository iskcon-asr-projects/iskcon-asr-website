"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Users, Flame, Flower2, Sparkles, MessageCircle, Phone, ArrowRight } from "lucide-react";

const communities = [
  {
    id: "iyf",
    title: "ISKCON Youth Forum",
    short: "IYF",
    description: "Empowering young men with spiritual wisdom and dynamic kirtans. IYF offers weekly classes, transformative camps, and sacred yatras to help youth find purpose and joy in a vibrant community.",
    icon: Flame,
    gradient: "from-orange-500 to-amber-600",
    glowColor: "rgba(249,115,22,0.15)",
    whatsappLink: "https://wa.link/r2mel6",
    contactNo: "+91 96469 68900",
    pageLink: "/iyf"
  },
  {
    id: "igf",
    title: "ISKCON Girls Forum",
    short: "IGF",
    description: "A nurturing space for young women to explore Krishna consciousness, develop spiritual character, and forge lifelong friendships in devotion.",
    icon: Flower2,
    gradient: "from-pink-500 to-rose-600",
    glowColor: "rgba(236,72,153,0.15)",
    whatsappLink: "https://wa.link/m1mdd8",
    contactNo: "+91 88728 45687",
    pageLink: "/igf"
  },
  {
    id: "bps",
    title: "Bhakta Prahlad School",
    short: "BPS",
    description: "Cultivating profound Vedic values and joyful devotion in children through engaging stories, arts, and playful learning environments.",
    icon: Sparkles,
    gradient: "from-sky-400 to-blue-600",
    glowColor: "rgba(56,189,248,0.15)",
    whatsappLink: "https://wa.link/bei9ip",
    contactNo: "+91 96469 68900",
    pageLink: "/bps"
  },
  {
    id: "bhakti_vriksha",
    title: "Bhakti Vriksha",
    short: "Groups",
    description: "Bringing families together in Krishna consciousness through regular home programs, festivals, and deep, supportive community bonds.",
    icon: Users,
    gradient: "from-[#C5A059] to-[#8B6914]",
    glowColor: "rgba(197,160,89,0.15)",
    whatsappLink: "#",
    contactNo: "+91 98550 81754",
    pageLink: "/bhakti-vriksha"
  }
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function CommunitiesSection() {
  return (
    <section
      id="communities-section"
      className="relative w-full bg-[#050505] py-32 lg:py-48 overflow-hidden flex flex-col items-center"
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-none bg-gold/[0.03] blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-none bg-orange-500/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-none bg-pink-500/[0.03] blur-[120px]" />
      </div>

      <div className="w-full max-w-[1280px] px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 lg:mb-28"
        >
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-12 h-[1px] bg-gold/30" />
            <span className="text-gold text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold">
              Our Spiritual Family
            </span>
            <div className="w-12 h-[1px] bg-gold/30" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6">
            Community <span className="italic text-gold">Wings</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-sm md:text-base font-light leading-relaxed">
            Find your spiritual family — from nurturing the young seeds of devotion to empowering youth and strengthening families.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {communities.map((community, index) => {
            const Icon = community.icon;

            return (
              <motion.div
                key={community.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="group relative"
              >
                {/* Hover Glow */}
                <div
                  className="absolute -inset-[1px] rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top, ${community.glowColor}, transparent 70%)` }}
                />

                {/* Card */}
                <div className="relative h-full bg-[#0a0a0a] border border-white/[0.06] rounded-none hover:border-white/[0.12] transition-all duration-700 flex flex-col">

                  {/* Top Accent Bar */}
                  <div className={`h-[2px] w-full rounded-none bg-gradient-to-r ${community.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-700`} />

                  {/* Card Content */}
                  <div className="flex flex-col flex-1 p-8 pb-10 lg:p-10 lg:pb-12">
                    
                    {/* Icon + Short tag row */}
                    <div className="flex items-center justify-between mb-8">
                      <div className={`w-14 h-14 rounded-none bg-gradient-to-br ${community.gradient} bg-opacity-10 flex items-center justify-center shadow-lg`}
                        style={{ background: `linear-gradient(135deg, ${community.glowColor}, transparent)` }}
                      >
                        <Icon className="w-7 h-7 text-white/80" />
                      </div>
                      <span className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold group-hover:text-white/40 transition-colors duration-500">
                        {community.short}
                      </span>
                    </div>

                    {/* Title & Description */}
                    {community.pageLink ? (
                      <Link href={community.pageLink} className="inline-block w-fit">
                        <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 hover:text-gold group-hover:text-gold transition-colors duration-500 leading-tight flex items-center gap-2">
                          {community.title}
                          <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
                        </h3>
                      </Link>
                    ) : (
                      <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 group-hover:text-gold transition-colors duration-500 leading-tight">
                        {community.title}
                      </h3>
                    )}
                    <p className="text-white/35 text-sm md:text-[15px] leading-relaxed font-light mb-10">
                      {community.description}
                    </p>

                    {/* Contact Actions */}
                    <div className="mt-auto flex flex-wrap items-center gap-4 pt-7 border-t border-white/[0.05]">
                      {/* Know More (if pageLink exists) */}
                      {community.pageLink && (
                        <Link
                          href={community.pageLink}
                          className="flex items-center gap-3 px-6 py-3.5 rounded-none bg-[#C5A059]/[0.1] hover:bg-[#C5A059] border border-[#C5A059]/30 hover:border-[#C5A059] text-[#C5A059] hover:text-black transition-all duration-500 group/btn"
                        >
                          <span className="text-sm uppercase tracking-[0.15em] font-bold">
                            Know More
                          </span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      )}

                      {/* WhatsApp */}
                      <a
                        href={community.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3.5 rounded-none bg-[#25D366]/[0.08] hover:bg-[#25D366]/25 border border-[#25D366]/15 hover:border-[#25D366]/40 transition-all duration-500 hover:shadow-[0_0_20px_rgba(37,211,102,0.15)]"
                      >
                        <MessageCircle className="w-5 h-5 text-[#25D366]" />
                        <span className="text-[#25D366] text-sm uppercase tracking-[0.15em] font-bold">
                          Join WhatsApp
                        </span>
                      </a>

                      {/* Phone */}
                      <a
                        href={`tel:${community.contactNo.replace(/\s+/g, '')}`}
                        className="flex items-center gap-3 px-6 py-3.5 rounded-none bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-500"
                      >
                        <Phone className="w-5 h-5 text-gold/70" />
                        <span className="text-white/60 text-sm tracking-wide font-medium">
                          {community.contactNo}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
