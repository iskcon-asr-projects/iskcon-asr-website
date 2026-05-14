"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Landmark,
  Utensils,
  Flame,
  ArrowLeft,
  Quote,
  Globe,
  Heart,
  Sparkles,
} from "lucide-react";
import Header from "@/Components/Header";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { icon: BookOpen, count: "80+", label: "Books Authored" },
  { icon: Landmark, count: "108", label: "Temples Established Before Going to Spiritual World" },
  { icon: Utensils, count: "Millions", label: "Meals Served Daily" },
  { icon: Flame, count: "14×", label: "Circled the Globe" },
];

const timeline = [
  {
    year: "1896",
    title: "Birth in Calcutta",
    text: "Born Abhay Charan De on Nandotsava, the day after Krishna Janmashtami, in a devout Vaishnava family in Calcutta.",
  },
  {
    year: "1922",
    title: "Meeting His Guru",
    text: "Met Srila Bhaktisiddhanta Sarasvati Thakura in Calcutta, who asked him to spread Vedic knowledge in the English language.",
  },
  {
    year: "1944",
    title: "Back to Godhead",
    text: "Single-handedly launched Back to Godhead magazine, writing, editing, printing, and distributing it himself.",
  },
  {
    year: "1959",
    title: "Sannyasa",
    text: "Accepted the renounced order of life (sannyasa) at the Radha-Damodara temple in Vrindavan, dedicating his life fully to his mission.",
  },
  {
    year: "1965",
    title: "Journey to the West",
    text: "At age 69, boarded the cargo ship Jaladuta to New York City with just forty rupees and a trunk of Srimad-Bhagavatam volumes.",
  },
  {
    year: "1966",
    title: "ISKCON Founded",
    text: "Formally incorporated the International Society for Krishna Consciousness in New York City, beginning a worldwide movement.",
  },
  {
    year: "1977",
    title: "Eternal Legacy",
    text: "Departed this world in Vrindavan, having established a global movement with over 100 temples, thousands of disciples, and millions of followers.",
  },
];

const teachings = [
  {
    icon: Sparkles,
    title: "We Are Not This Body",
    text: "The soul is eternal, full of knowledge and bliss. The body is temporary, but the soul within is indestructible and transcendental.",
  },
  {
    icon: Heart,
    title: "Bhakti-Yoga",
    text: "The highest form of yoga is devotional service to the Supreme Lord Krishna, performed with love and without any selfish motive.",
  },
  {
    icon: Globe,
    title: "Universal Brotherhood",
    text: "Every living entity is a spirit soul, part and parcel of God. True equality comes from seeing every being with equal spiritual vision.",
  },
  {
    icon: BookOpen,
    title: "Vedic Wisdom",
    text: "The ancient Vedic scriptures contain the science of self-realization, offering timeless solutions to the problems of material existence.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PrabhupadaPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#C5A059]/30 selection:text-[#C5A059] flex flex-col items-center font-sans overflow-x-hidden">
      <Header onlyLogo={true} />

      {/* ── Ambient background glows ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#C5A059]/[0.04] rounded-none blur-[180px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#C5A059]/[0.03] rounded-none blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-[#C5A059]/[0.03] rounded-none blur-[220px]" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 1 — HERO                                           */}
        {/* ═══════════════════════════════════════════════════════════ */}

        {/* Back button */}
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 pt-40 md:pt-48 pb-6 relative z-20 flex justify-center md:justify-start">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-white/40 hover:text-[#C5A059] transition-all duration-300 text-xs uppercase tracking-[0.3em] font-medium"
          >
            <div className="w-8 h-8 rounded-none border border-white/10 group-hover:border-[#C5A059]/50 flex items-center justify-center bg-white/[0.02] backdrop-blur-sm transition-all duration-300 group-hover:-translate-x-1">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Back to Home
          </Link>
        </div>

        {/* Hero Content - Centered Layout */}
        <section className="max-w-[1200px] mx-auto w-full px-6 md:px-12 pb-32 md:pb-44 flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center relative z-10 mb-16"
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-[#C5A059]" />
              <span className="text-[#C5A059] text-[10px] md:text-xs uppercase tracking-[0.4em] font-semibold">
                Founder-Acharya • ISKCON
              </span>
              <div className="w-12 h-[1px] bg-[#C5A059]" />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif text-white mb-8 leading-[1.05] tracking-tight">
              His Divine Grace
              <br />
              <span className="text-[#C5A059] italic">
                A.C. Bhaktivedanta
              </span>
              <br />
              Swami Prabhupāda
            </h1>

            <p className="text-base md:text-xl text-white/50 font-light leading-relaxed max-w-2xl mb-12">
              At an age when most retire, he crossed an ocean to change the
              world — carrying nothing but unshakeable faith, forty rupees,
              and a trunk of sacred books.
            </p>
          </motion.div>

          {/* Hero Image - Centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.15 }}
            className="relative w-full aspect-[4/3] max-w-4xl mx-auto"
          >
            {/* Glow behind frame */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-[#C5A059]/10 via-transparent to-[#C5A059]/5 rounded-none blur-2xl opacity-60" />

            {/* Frame */}
            <div className="relative w-full h-full rounded-none overflow-hidden border border-white/10 p-[6px] bg-white/[0.02] backdrop-blur-sm">
              <div className="relative w-full h-full rounded-none overflow-hidden">
                <Image
                  src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/images/prabhupada_writing.png"
                  alt="Srila Prabhupada"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating quote card - Centered below or overlapping nicely */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#0c0c0c]/95 border border-white/10 p-6 sm:p-8 rounded-none shadow-2xl backdrop-blur-xl w-[90%] max-w-[400px] z-20 text-center">
              <Quote className="text-[#C5A059] w-8 h-8 mb-4 opacity-50 mx-auto" />
              <p className="font-serif italic text-white/80 text-lg sm:text-xl leading-relaxed">
                &quot;Chant Hare Krishna and your life will be sublime.&quot;
              </p>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 2 — FULL-WIDTH DIVIDER IMAGE                       */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden mt-20">
          <Image
            src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/images/prabhupada_bg1.png"
            alt="Srila Prabhupada teaching"
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/40 to-[#050505]" />

          {/* Centered quote overlay */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl"
            >
              <div className="text-[#C5A059] text-[10px] md:text-xs tracking-[0.6em] uppercase font-bold mb-8 opacity-60">Sacred Wisdom</div>
              <p className="text-3xl md:text-5xl lg:text-[5rem] font-serif italic text-white leading-tight drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                &quot;YOU ARE NOT THIS BODY. YOU ARE A SPIRIT SOUL.&quot;
              </p>
              <span className="block mt-10 text-[#C5A059] text-xs tracking-[0.4em] uppercase font-bold">
                — Śrīla Prabhupāda
              </span>
            </motion.blockquote>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 3 — BIOGRAPHY                                      */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <section className="max-w-[1000px] mx-auto w-full px-6 md:px-12 py-28 md:py-40 flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-4 mb-10">
              <div className="w-10 h-[1px] bg-[#C5A059]/60" />
              <span className="text-[#C5A059]/80 text-[10px] uppercase tracking-[0.35em] font-bold">
                The Journey
              </span>
              <div className="w-10 h-[1px] bg-[#C5A059]/60" />
            </div>

            <div className="text-lg md:text-2xl text-white/70 font-light leading-[2] md:leading-[2.2] space-y-12 max-w-4xl mx-auto">
              <p className="first-letter:text-8xl first-letter:font-serif first-letter:text-[#C5A059] first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8] text-justify md:text-center">
                At the age of 69, when most people are retired, Srila
                Prabhupada boarded the Jaladuta — a small, weather-beaten
                cargo ship bound for New York City. He carried with him just
                forty rupees and a trunk full of his translations of the
                Srimad-Bhagavatam. He suffered two heart attacks on the
                thirty-five-day journey, yet his determination remained
                unshaken.
              </p>

              {/* Stats row instead of sidebar for centered look */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-16 border-y border-white/5">
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col items-center gap-4">
                    <stat.icon className="text-[#C5A059] w-8 h-8" />
                    <div>
                      <div className="text-3xl md:text-4xl font-serif text-white">{stat.count}</div>
                      <div className="text-[9px] text-white/30 uppercase tracking-widest font-bold mt-1 max-w-[120px] mx-auto">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <p>
                Upon arriving in America in September 1965, he struggled
                alone for nearly a year. Sleeping in doorways, depending on
                the kindness of strangers, he never lost faith. Gradually, a
                few young people — seekers disillusioned with material
                pursuits — began to gather around him, drawn by his profound
                scholarship, his uncompromising purity, and his deep,
                fatherly compassion.
              </p>

              {/* Centered Pull quote */}
              <div className="py-16 md:py-24 flex flex-col items-center">
                <Quote className="text-[#C5A059]/20 w-16 h-16 mb-8" />
                <p className="text-3xl md:text-5xl font-serif italic text-white leading-snug max-w-2xl">
                  &quot;He built a house in which the whole world can
                  live.&quot;
                </p>
                <div className="w-16 h-[2px] bg-[#C5A059] mt-12" />
              </div>

              <p>
                In July 1966, in a tiny storefront at 26 Second Avenue in
                New York&apos;s Lower East Side, he formally registered the
                International Society for Krishna Consciousness. From this
                humble beginning, a worldwide spiritual movement was born.
              </p>

              <p>
                In just twelve years, despite his advanced age, Srila
                Prabhupada circled the globe fourteen times on lecture tours
                that took him to six continents. He established over 100
                temples, farm communities, and gurukulas. Most remarkably, he
                authored over 80 volumes of authoritative translations and
                commentaries on India&apos;s classic spiritual texts —
                including the celebrated{" "}
                <em className="text-white/90">Bhagavad-gītā As It Is</em>,{" "}
                <em className="text-white/90">Śrīmad-Bhāgavatam</em>, and{" "}
                <em className="text-white/90">Caitanya-caritāmṛta</em>.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 4 — TIMELINE                                       */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <section className="relative w-full py-28 md:py-40 bg-[#080808] border-y border-white/[0.04] flex flex-col items-center">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12 w-full flex flex-col items-center">
            {/* Section heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-28"
            >
              <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.4em] font-bold">
                1896 — 1977
              </span>
              <h2 className="text-4xl md:text-7xl font-serif text-white mt-5 mb-8">
                A Life of <span className="text-[#C5A059] italic">Devotion</span>
              </h2>
              <div className="w-16 h-[1px] bg-[#C5A059]/40 mx-auto" />
            </motion.div>

            {/* Timeline items - Centered vertical line */}
            <div className="relative w-full">
              {/* Central vertical line */}
              <div className="absolute left-1/2 -translate-x-[0.5px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#C5A059]/30 to-transparent" />

              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className={`relative flex items-center mb-24 last:mb-0 w-full ${
                      isLeft ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    {/* Dot on the line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-4 h-4 rounded-none bg-[#C5A059] shadow-[0_0_20px_8px_rgba(197,160,89,0.3)]" />
                    </div>

                    {/* Content card */}
                    <div
                      className={`w-[45%] ${
                        isLeft ? "text-right pr-12" : "text-left pl-12"
                      }`}
                    >
                      <span className="text-[#C5A059] font-serif text-3xl md:text-5xl font-bold block mb-2">
                        {item.year}
                      </span>
                      <h3 className="text-xl md:text-2xl text-white font-medium mb-4">
                        {item.title}
                      </h3>
                      <p className="text-base md:text-lg text-white/50 font-light leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                    {/* Empty space for the other side */}
                    <div className="w-[45%]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 5 — CORE TEACHINGS                                 */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <section className="max-w-[1400px] mx-auto w-full px-6 md:px-12 py-28 md:py-40 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-28"
          >
            <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.4em] font-bold">
              The Essence
            </span>
            <h2 className="text-4xl md:text-7xl font-serif text-white mt-5 mb-8">
              Core <span className="text-[#C5A059] italic">Teachings</span>
            </h2>
            <div className="w-16 h-[1px] bg-[#C5A059]/40 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
            {teachings.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-[#0a0a0a] border border-white/5 hover:border-[#C5A059]/25 rounded-none p-10 md:p-14 transition-all duration-500 overflow-hidden text-center flex flex-col items-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <t.icon className="relative z-10 text-[#C5A059] w-12 h-12 mb-8 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="relative z-10 text-2xl md:text-3xl font-serif text-white mb-6">
                  {t.title}
                </h3>
                <p className="relative z-10 text-base md:text-lg text-white/45 font-light leading-relaxed">
                  {t.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 6 — CLOSING QUOTE                                  */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <section className="relative w-full py-40 md:py-60 overflow-hidden flex flex-col items-center">
          {/* Second full-width image as background */}
          <Image
            src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/prabhupada.png"
            alt="Srila Prabhupada"
            fill
            className="object-cover object-top opacity-20 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <Quote className="text-[#C5A059]/30 w-20 h-20 mb-12" />

              <blockquote className="text-3xl md:text-6xl font-serif italic text-white leading-tight mb-12">
                &quot;I have not come to take, but to give.&quot;
              </blockquote>

              <p className="text-[#C5A059] text-xs md:text-sm tracking-[0.5em] uppercase font-bold mb-20">
                — Śrīla Prabhupāda —
              </p>

              <div className="w-20 h-[1px] bg-[#C5A059]/30 mb-20" />

              <p className="text-lg md:text-2xl text-white/50 font-light leading-relaxed max-w-3xl">
                Today, the International Society for Krishna Consciousness
                stands in every corner of the world as a living testament to his
                tireless dedication, boundless humility, and unshakeable faith
                in sharing the path of Bhakti-yoga with every soul on earth.
              </p>

              <Link
                href="/"
                className="group inline-flex items-center gap-3 mt-24 px-12 py-5 border border-[#C5A059]/30 hover:border-[#C5A059] text-[#C5A059] text-xs uppercase tracking-[0.4em] font-bold rounded-none transition-all duration-500 hover:bg-[#C5A059] hover:text-black hover:shadow-[0_0_50px_rgba(197,160,89,0.4)]"
              >
                Return Home
                <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </section>

      </div>
    </main>
  );
}
