"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutIskcon() {
  return (
    <section
      id="iskcon-section"
      className="w-full bg-transparent flex items-center pt-20 pb-16 md:pt-32 md:pb-24 scroll-mt-[100px] overflow-clip"
    >
      <div className="w-full flex flex-col md:flex-row items-stretch justify-start px-4 md:px-10 relative z-10">

        {/* LEFT IMAGE CONTAINER */}
        <motion.div 
          initial={{ opacity: 0, x: -80, rotateY: -15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="w-full md:w-auto flex justify-center shrink-0 mb-8 md:mb-0 perspective-[1000px]"
        >
          <div className="relative h-[260px] sm:h-[300px] md:h-[650px] w-auto aspect-[3/4]">
            <Image
              src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/prabhupada.png"
              alt="Srila Prabhupada"
              fill
              className="object-contain rounded-none border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu"
            />
          </div>
        </motion.div>

        {/* PROMINENT GOLD DIVIDER — centered between image and box */}
        <div className="hidden md:flex flex-col items-center justify-center px-10">
          <div className="relative flex flex-col items-center h-4/5">
            {/* Top fade */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-[2px] flex-1 bg-gradient-to-b from-transparent to-[#C5A059]" 
            />
            {/* Central diamond ornament */}
            <motion.div 
              initial={{ scale: 0, rotate: 0 }}
              whileInView={{ scale: 1, rotate: 45 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
              className="w-3 h-3 bg-[#C5A059] shadow-[0_0_14px_6px_rgba(197,160,89,0.7)] my-2 shrink-0" 
            />
            {/* Bottom fade */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-[2px] flex-1 bg-gradient-to-t from-transparent to-[#C5A059]" 
            />
          </div>
        </div>

        {/* TEXT GLASS PANEL */}
        <motion.div 
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          className="flex-1 flex justify-end"
        >
          <div
            className="
              group
              w-full md:w-[96%]
              rounded-none
              bg-white/[0.02]
              backdrop-blur-xl
              border border-white/5
              shadow-2xl
              hover:shadow-[0_0_60px_rgba(197,160,89,0.3),0_0_120px_rgba(197,160,89,0.1)]
              hover:border-[#C5A059]/40
              transition-all duration-700 ease-in-out
              py-8 px-5 md:py-16 md:px-24
              flex flex-col justify-center
            "
          >
            {/* TITLE — centered */}
            <h2 className="text-3xl sm:text-4xl md:text-6xl text-[#C5A059] mb-4 font-serif tracking-tight text-center drop-shadow-md">
              Śrīla Prabhupāda
            </h2>

            {/* SUBTITLE — centered */}
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.5em] text-[#C5A059]/60 font-medium mb-12 text-center">
              Founder-Acharya of ISKCON
            </p>

            {/* PARAGRAPH CONTENT */}
            <div className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed md:leading-[2.2] space-y-6 font-light text-center">
              <p>
                His Divine Grace A.C. Bhaktivedanta Swami Prabhupada arrived in the West in 1965 with nothing but a trunk of books and a mission of compassion. At the age of 69, he founded the International Society for Krishna Consciousness (ISKCON), sparking a global spiritual renaissance that would touch every corner of the world.
              </p>

              <p>
                In just twelve years, he circled the globe fourteen times, establishing over 100 temples and authoring over 80 volumes of Vedic literature — a feat unparalleled in spiritual history. His translations of the Bhagavad-gītā, Śrīmad-Bhāgavatam, and Caitanya-caritāmṛta remain the most widely read and respected works of Vaishnava philosophy in the world.
              </p>

              <p>
                He trained thousands of disciples across six continents, instilling in them a deep love for Śrī Kṛṣṇa and the timeless wisdom of the Vedic tradition. His farm communities, gurukulas, and prasādam distribution programs demonstrated that spiritual life and practical compassion go hand in hand.
              </p>

              <p className="text-[#C5A059]/90 italic pt-6 text-xl md:text-2xl border-t border-white/5">
                Today, ISKCON stands as a living testament to his tireless dedication, boundless humility, and unshakeable faith in sharing the path of Bhakti-yoga with every soul on earth.
              </p>
            </div>

            {/* KNOW MORE BUTTON */}
            <div className="mt-12 flex justify-center">
              <Link href="/prabhupada" className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm uppercase tracking-[0.3em] font-bold text-[#C5A059] transition-all duration-500 hover:text-black overflow-hidden rounded-none border border-[#C5A059]/40 shadow-[0_0_20px_rgba(197,160,89,0.1)] hover:shadow-[0_0_40px_rgba(197,160,89,0.4)]">
                <span className="absolute inset-0 bg-[#C5A059] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.25,1,0.5,1]"></span>
                <span className="relative z-10 flex items-center gap-3">
                  Know More
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </Link>
            </div>

          </div>

          {/* 2% REMAINING GAP ON FAR RIGHT */}
          <div className="hidden md:block w-[2%]" />
        </motion.div>

      </div>
    </section>
  );
}
