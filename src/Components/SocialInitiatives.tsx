"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Heart, Phone } from "lucide-react";

export default function SocialInitiatives() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative w-full bg-[#050505] py-24 lg:py-40 overflow-hidden flex flex-col items-center">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-none bg-[#C5A059]/[0.02] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-none bg-orange-500/[0.02] blur-[150px]" />
      </div>

      <div className="w-full max-w-[1280px] px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-20 lg:mb-32"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-12 h-[1px] bg-gold/30" />
            <span className="text-gold text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold">
              Compassion in Action
            </span>
            <div className="w-12 h-[1px] bg-gold/30" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6">
            Social <span className="italic text-gold">Initiatives</span>
          </h2>
        </motion.div>

        {/* ISKCON Sri Gokul Gaushala */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-32"
        >
          {/* Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[4/3] rounded-none overflow-hidden relative border border-white/10 group">
              <Image 
                src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/images/gaushala.jpeg" 
                alt="ISKCON Sri Gokul Gaushala" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            {/* Decorative corners */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-gold/40 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-gold/40 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <span className="text-gold/60 text-sm uppercase tracking-widest font-bold mb-4">Cow Protection</span>
            <h3 className="text-3xl md:text-5xl font-serif text-white mb-6">
              ISKCON Sri Gokul Gaushala
            </h3>
            <p className="text-white/40 text-base md:text-lg leading-relaxed font-light mb-8">
              In the Vedic tradition, cows are respected as mothers, providing humanity with the miracle of milk. Our Gaushala provides a loving, lifelong sanctuary for cows and bulls, protecting them and allowing them to live peacefully in a clean, nurturing environment.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 border border-gold/20 px-6 py-4 rounded-none">
              <Phone className="text-gold w-5 h-5 shrink-0" />
              <div>
                <p className="text-white text-sm font-bold tracking-widest">+91 77400 52036</p>
                <p className="text-white/40 text-[10px] uppercase tracking-wider">(10 AM - 7 PM, Mon-Sat)</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Food for Life */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="w-full flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20 mb-24"
        >
          {/* Images Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 relative">
            <div className="col-span-2 aspect-[21/9] rounded-none overflow-hidden relative border border-white/10 group">
              <Image 
                src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/images/food_for_life_1.jpg" 
                alt="Food for Life Distribution" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="aspect-[4/3] rounded-none overflow-hidden relative border border-white/10 group">
              <Image 
                src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/images/food_for_life_2.jpeg" 
                alt="Food for Life Cooking" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="aspect-[4/3] rounded-none overflow-hidden relative border border-white/10 group">
              <Image 
                src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/images/food_for_life_3.jpeg" 
                alt="Food for Life Meal" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            
            <div className="absolute -top-4 -right-4 w-12 h-12 border-t border-r border-orange-500/40 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b border-l border-orange-500/40 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <span className="text-orange-500/60 text-sm uppercase tracking-widest font-bold mb-4">Free Prasadam Distribution</span>
            <h3 className="text-3xl md:text-5xl font-serif text-white mb-6">
              Food For Life
            </h3>
            <p className="text-white/40 text-base md:text-lg leading-relaxed font-light mb-10">
              Food for Life is the world's largest vegan and vegetarian food relief organization. We believe that no one should go hungry. Our dedicated volunteers prepare and distribute thousands of pure, sanctified meals (Prasadam) daily to the underprivileged, bringing nourishment and joy to those who need it most.
            </p>
          </div>
        </motion.div>

        {/* Donation Message */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="w-full max-w-4xl mx-auto mt-24 lg:mt-40 bg-white/[0.02] border border-gold/20 rounded-none p-8 md:p-16 text-center relative overflow-hidden group flex flex-col items-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
          
          <div className="relative z-10 flex flex-col items-center w-full">
            <Heart className="w-12 h-12 text-gold mb-8 opacity-80" />
            <h4 className="text-2xl md:text-5xl font-serif text-white mb-6 uppercase tracking-wider">Support Our Initiatives</h4>
            <p className="text-white/60 text-base md:text-lg font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              Your generous contributions help us sustain the Gaushala and feed thousands of people through the Food for Life program. If you want to donate, kindly contact the number below.
            </p>
            
            <div className="flex flex-col items-center gap-2">
              <div className="inline-flex items-center justify-center gap-4 bg-white/[0.05] border border-white/10 rounded-none px-10 py-5 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300">
                <Phone className="w-5 h-5 text-gold" />
                <span className="text-white text-xl md:text-2xl font-medium tracking-widest">+91 77400 52036</span>
              </div>
              <span className="text-white/40 text-[10px] uppercase tracking-wider font-bold">(10 AM - 7 PM, Mon-Sat)</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
