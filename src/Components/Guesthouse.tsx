"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bed, Phone } from "lucide-react";

export default function Guesthouse() {
  return (
    <section className="relative w-full bg-[#050505] py-24 lg:py-32 overflow-hidden flex flex-col items-center">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#C5A059]/[0.02] rounded-none blur-[100px]" />
      </div>

      <div className="w-full max-w-[1280px] px-6 md:px-12 relative z-10">
        <div className="w-full bg-[#0a0a0a] border border-white/5 rounded-none overflow-hidden flex flex-col items-center shadow-2xl p-10 md:p-16 lg:p-24 text-center mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[#C5A059]" />
            <span className="text-[#C5A059] text-xs uppercase tracking-[0.4em] font-bold">Stay With Us</span>
            <div className="w-8 h-[1px] bg-[#C5A059]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">
            Temple <span className="italic text-[#C5A059]">Guesthouse</span>
          </h2>

          <p className="text-white/50 text-base md:text-lg font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            Experience the serene and spiritual atmosphere of the temple by staying at our guesthouse. Our rooms are designed for comfort and peace, providing a perfect retreat for pilgrims and visitors. Stay close to the daily spiritual programs and immerse yourself in the divine energy of the temple.
          </p>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24 justify-center items-start">
            <div className="flex flex-col items-center text-center gap-5 w-full md:w-auto">
              <div className="w-16 h-16 rounded-none bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
                <Bed className="text-[#C5A059] w-7 h-7" />
              </div>
              <div>
                <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-2">Comfortable Rooms</h4>
                <p className="text-white/30 text-xs max-w-[200px] mx-auto leading-relaxed">Clean, peaceful, and well-maintained rooms for a restful stay.</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-5 w-full md:w-auto">
              <div className="w-16 h-16 rounded-none bg-[#C5A059]/10 border border-[#C5A059]/20 flex items-center justify-center shadow-lg">
                <Phone className="text-[#C5A059] w-7 h-7" />
              </div>
              <div>
                <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-2">Book Your Room</h4>
                <p className="text-white/30 text-xs mb-4 max-w-[200px] mx-auto leading-relaxed">For availability and bookings, please contact us at:</p>
                <span className="text-2xl md:text-3xl font-serif text-[#C5A059] tracking-wider block mb-2">
                  +91 77400 52036
                </span>
                <span className="text-[#C5A059]/60 text-[9px] uppercase tracking-widest font-bold bg-[#C5A059]/10 px-3 py-1">
                  (10 AM - 7 PM, Mon-Sat)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
