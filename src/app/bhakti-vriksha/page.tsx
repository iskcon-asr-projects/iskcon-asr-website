"use client";

import React from "react";
import Link from "next/link";
import { Users, Heart, Home, Music } from "lucide-react";
import Header from "@/Components/Header";
import StaggeredEntry from "@/Components/StaggeredEntry";

export default function BhaktiVrikshaCommunityPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#C5A059]/30 selection:text-[#C5A059] overflow-x-hidden">
      <Header onlyLogo={true} />

      {/* HERO SECTION WITH AI IMAGE */}
      <section className="relative w-full h-[65vh] md:h-[80vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/bhakti_vriksha.png" 
            alt="Bhakti Vriksha Gathering" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <StaggeredEntry delay={0}>
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-[#C5A059]/10 border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059] backdrop-blur-md">
                <Users size={32} />
              </div>
            </div>
            <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 tracking-tight drop-shadow-2xl">
              Bhakti <span className="text-[#C5A059] italic">Vriksha</span>
            </h1>
            <p className="text-white/80 max-w-2xl text-lg md:text-xl font-light leading-relaxed mx-auto drop-shadow-md">
              Cultivating the tree of devotion through local community groups. Join a Bhakti Vriksha near you to grow spiritually in a supportive, family-like environment.
            </p>
          </StaggeredEntry>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto relative z-10 pb-32 flex flex-col items-center justify-center -mt-10 md:-mt-24">
        
        {/* Contact Banner */}
        <StaggeredEntry delay={0.2} className="w-full max-w-4xl">
          <div className="bg-gradient-to-br from-[#121212]/95 to-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 p-12 md:p-16 relative overflow-hidden group hover:border-[#C5A059]/30 transition-all duration-700 text-center shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-1 bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
            
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Join a Local <span className="italic text-[#C5A059]">Class</span></h2>
            <p className="text-white/60 mb-10 font-light leading-relaxed max-w-2xl mx-auto text-lg">
              We hold regular congregational chanting and spiritual classes at various homes in our community. Experience the joy of Krishna consciousness with your family today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <a 
                href="tel:+919855081754"
                className="inline-flex items-center gap-4 px-10 py-5 bg-[#C5A059] text-black text-xs uppercase tracking-widest font-bold hover:bg-white hover:scale-105 transition-all shadow-xl shadow-[#C5A059]/20"
              >
                Contact: 9855081754
              </a>
              <Link 
                href="/"
                className="inline-flex items-center gap-4 px-10 py-5 bg-white/5 text-white border border-white/10 text-xs uppercase tracking-widest font-bold hover:bg-white/10 transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </StaggeredEntry>
      </div>
    </main>
  );
}
