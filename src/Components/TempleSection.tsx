"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { 
  MapPin, 
  Plane, 
  Train, 
  Bus,
  Map as MapIcon,
  Sparkle
} from "lucide-react";

const timings = [
  { id: "01", title: "Mangala Aarti", time: "04:30 AM" },
  { id: "02", title: "Tulasi Aarti", time: "05:15 AM" },
  { id: "03", title: "Japa Session", time: "05:30 AM" },
  { id: "04", title: "Sringar Aarti", time: "07:30 AM" },
  { id: "05", title: "Guru Puja", time: "07:45 AM" },
  { id: "06", title: "Bhagavatam Class", time: "08:00 AM" },
  { id: "07", title: "Raj Bhoga Aarti", time: "12:00 PM" },
  { id: "08", title: "Darshan Close", time: "12:30 PM", muted: true },
  { id: "09", title: "Dhoop Aarti", time: "04:30 PM" },
  { id: "10", title: "Sandhya Aarti", time: "07:00 PM" },
  { id: "11", title: "Bhagavad Gita class", time: "07:30 PM" },
  { id: "12", title: "Shayan Aarti", time: "08:15 PM" },
  { id: "13", title: "Darshan Close", time: "08:45 PM", muted: true },
  { id: "14", title: "Hall Close", time: "09:00 PM", muted: true },
];

/* 3D TILT WRAPPER COMPONENT */
function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function TempleSection() {
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section id="temple-section" className="relative w-full bg-[#050505] py-20 lg:py-60 overflow-hidden scroll-mt-20 flex flex-col items-center">
      
      {/* 1. HERO BANNER - CENTERED (Static as requested) */}
      <div className="relative w-full h-[60vh] lg:h-[70vh] min-h-[400px] lg:min-h-[600px] mb-16 lg:mb-32 flex items-center justify-center overflow-hidden">
        <Image 
          src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/images/temple_hero_bg1.png" 
          alt="Temple Silhouette" 
          fill
          className="object-cover opacity-60 grayscale-[0.3]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-[1px] bg-gold/50 mb-8"></div>
            <span className="text-gold text-xs tracking-[0.5em] uppercase font-bold">Plan Your Visit</span>
            <div className="w-16 h-[1px] bg-gold/50 mt-8 md:hidden"></div>
          </div>
          <h2 className="text-4xl md:text-7xl lg:text-[7rem] font-serif text-white leading-[1.1] mb-8">
            Temple Timings & <br/>
            <span className="italic text-gold italic">Location</span>
          </h2>
          <div className="flex items-center justify-center space-x-4 mt-12 opacity-40">
            <div className="w-8 h-[1px] bg-gold"></div>
            <p className="text-[10px] md:text-xs tracking-[0.8em] uppercase font-light">
               Topography Discovery
            </p>
            <div className="w-8 h-[1px] bg-gold"></div>
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-[1280px] px-6 md:px-12 flex flex-col items-center">
        
        {/* 2. SUNDAY FEAST CARD - 3D TILT */}
        <div className="w-full max-w-5xl mb-24 lg:mb-48 perspective-[1000px]">
          <TiltCard className="relative w-full p-8 lg:p-24 border border-gold/10 bg-white/[0.01] backdrop-blur-3xl rounded-none text-center group transition-all duration-300">
            {/* Decorative Corner Accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-gold/40 rounded-none opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-gold/40 rounded-none opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>

            <div style={{ transform: "translateZ(50px)" }} className="relative z-10 flex flex-col items-center">
              <span className="text-gold/40 text-[10px] uppercase tracking-[0.5em] font-semibold mb-8 block transition-colors group-hover:text-gold/80">The Weekly Special</span>
              <h3 className="text-gold font-serif text-4xl md:text-6xl font-bold mb-8 drop-shadow-2xl">Sunday Feast Program</h3>
              <p className="text-white/40 text-base md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light text-center">
                Experience the nectar of Vedic culture through soul-stirring Kirtan, profound discourse, and sacred Prasadam.
              </p>
              <div className="flex flex-col items-center">
                <div className="h-[1px] w-24 lg:w-32 bg-gradient-to-r from-transparent via-gold/40 to-transparent group-hover:via-gold transition-all duration-700 mb-8"></div>
                <div style={{ transform: "translateZ(80px)" }}>
                    <p className="text-gold text-3xl md:text-7xl font-serif italic tracking-wider drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">7:00 P.M. Onwards</p>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* 3. TIMINGS GRID - BEAUTIFIED & CENTERED */}
        <div className="w-full max-w-4xl mb-32 lg:mb-60">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16 lg:mb-24"
          >
            <div className="w-1 h-8 bg-gold/30 mx-auto mb-8"></div>
            <h3 className="text-3xl md:text-5xl font-serif text-white mb-6">Daily Schedule</h3>
            <div className="flex items-center justify-center space-x-4 opacity-30">
                <Sparkle size={12} className="text-gold" />
                <div className="w-24 h-[1px] bg-gold/50"></div>
                <Sparkle size={12} className="text-gold" />
            </div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:gap-x-20 gap-x-12 gap-y-4"
          >
            {timings.map((time) => (
              <motion.div 
                key={time.id}
                variants={fadeIn}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`flex items-center justify-between py-6 px-6 md:px-10 border-b border-white/[0.03] group transition-all duration-500 rounded-none hover:bg-white/[0.03] ${time.muted ? 'opacity-30' : ''}`}
              >
                <div className="flex items-center space-x-5">
                  <div className="w-2 h-2 rounded-none border border-gold/40 group-hover:bg-gold shadow-[0_0_12px_rgba(197,160,89,0)] group-hover:shadow-[0_0_15px_rgba(197,160,89,0.5)] transition-all"></div>
                  <span className={`text-lg md:text-xl font-serif tracking-wide ${time.muted ? 'italic' : 'text-white/80 group-hover:text-gold transition-colors'}`}>
                    {time.title}
                  </span>
                </div>
                <span className={`text-lg md:text-xl font-mono tracking-wider ${time.muted ? 'text-white/40' : 'text-white group-hover:text-gold transition-colors'}`}>
                  {time.time}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 4. TRAVEL & LOCATION - 3D TILT */}
        <div className="w-full flex flex-col items-center pt-16 lg:pt-32 border-t border-white/5">
           
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={fadeIn}
             className="text-center mb-16 lg:mb-32"
           >
              <h3 className="text-3xl md:text-6xl font-serif text-white mb-6 lg:mb-8">
                Travel <span className="italic text-gold italic italic">Information</span>
              </h3>
              <p className="text-white/30 text-[9px] md:text-xs tracking-[0.2em] md:tracking-[0.4em] font-light max-w-xl mx-auto uppercase lg:whitespace-nowrap text-center">Finding the path to Sri Sri Gaur Nitai Temple</p>
           </motion.div>

           <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 gap-12 items-stretch w-full">
              {/* ADDRESS CARD - 3D TILT */}
              <TiltCard className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[500px] rounded-none group shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex items-center justify-center p-8 lg:p-12 bg-[#080808]">
                 <div className="absolute inset-0 rounded-none overflow-hidden">
                    <Image 
                      src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/images/map_card_bg.png" 
                      alt="Map Texture" 
                      fill 
                      className="object-cover opacity-20 transition-all duration-[2s] group-hover:opacity-40"
                    />
                 </div>
                 <div style={{ transform: "translateZ(70px)" }} className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-gold/5 rounded-none flex items-center justify-center mb-10 border border-gold/10 group-hover:border-gold/30 group-hover:scale-110 transition-all duration-700 shadow-inner perspective-[500px]">
                       <MapPin style={{ transform: "translateZ(40px)" }} className="text-gold w-10 h-10 animate-pulse" />
                    </div>
                    <h4 className="text-white text-lg md:text-3xl lg:text-4xl font-serif font-bold mb-4 drop-shadow-2xl whitespace-normal lg:whitespace-nowrap">Sri Sri Gaur Nitai Temple</h4>
                    <p className="text-gold/80 text-lg lg:text-xl font-serif italic mb-6">Vrindavan Gardens</p>
                    <p className="text-white/40 text-xs lg:text-base max-w-[340px] mb-12 lg:mb-16 leading-relaxed font-light">
                      Fatehgarh Churian Road, Amritsar, Punjab 143008
                    </p>
                    
                    <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: "#C5A059", color: "#000", translateZ: "20px" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.open('https://maps.app.goo.gl/vdSQbRvej4wvDLR99', '_blank')}
                      className="flex items-center space-x-4 px-12 py-5 border border-gold/30 rounded-none text-xs text-gold uppercase tracking-[0.5em] transition-all font-bold backdrop-blur-md hover:shadow-[0_0_30px_rgba(197,160,89,0.3)]"
                    >
                      <MapIcon className="w-4 h-4" />
                      <span>Open in Maps</span>
                    </motion.button>
                 </div>
              </TiltCard>

              {/* DISTANCE INFO - CLEAN CENTERED */}
              {/* DISTANCE INFO - CLEAN CENTERED */}
              <div className="bg-white/[0.01] border border-white/5 rounded-none p-8 lg:p-16 flex flex-col justify-center items-center text-center space-y-16 lg:space-y-20 backdrop-blur-sm">
                 
                 <div className="relative flex flex-col items-center group cursor-default">
                    <div className="absolute -top-6 lg:-top-10 text-gold/[0.03] group-hover:text-gold/[0.07] text-[4rem] lg:text-[6rem] font-serif select-none pointer-events-none group-hover:scale-125 transition-all duration-1000 italic font-bold">AIR</div>
                    <Plane className="text-gold/20 w-6 lg:w-8 h-6 lg:h-8 mb-6 lg:mb-8 group-hover:text-gold transition-all duration-500 group-hover:-translate-y-2" />
                    <span className="text-white/30 text-[9px] lg:text-[10px] uppercase tracking-[0.4em] mb-2 font-bold italic">SGRDJ International Airport</span>
                    <h5 className="text-white text-3xl lg:text-4xl font-serif font-light tracking-tighter">12km Distance</h5>
                    <div className="h-[1px] w-12 lg:w-16 bg-gold/10 group-hover:w-32 group-hover:bg-gold/40 transition-all duration-700 mt-6"></div>
                 </div>

                 <div className="relative flex flex-col items-center group cursor-default">
                    <div className="absolute -top-6 lg:-top-10 text-gold/[0.03] group-hover:text-gold/[0.07] text-[4rem] lg:text-[6rem] font-serif select-none pointer-events-none group-hover:scale-125 transition-all duration-1000 italic font-bold">BUS</div>
                    <Bus className="text-gold/20 w-6 lg:w-8 h-6 lg:h-8 mb-6 lg:mb-8 group-hover:text-gold transition-all duration-500 group-hover:-translate-y-2" />
                    <span className="text-white/30 text-[9px] lg:text-[10px] uppercase tracking-[0.4em] mb-2 font-bold italic">Amritsar Bus Stand</span>
                    <h5 className="text-white text-3xl lg:text-4xl font-serif font-light tracking-tighter">9km Distance</h5>
                    <div className="h-[1px] w-12 lg:w-16 bg-gold/10 group-hover:w-32 group-hover:bg-gold/40 transition-all duration-700 mt-6"></div>
                 </div>

                 <div className="relative flex flex-col items-center group cursor-default">
                    <div className="absolute -top-6 lg:-top-10 text-gold/[0.03] group-hover:text-gold/[0.07] text-[4rem] lg:text-[6rem] font-serif select-none pointer-events-none group-hover:scale-125 transition-all duration-1000 italic font-bold">RAIL</div>
                    <Train className="text-gold/20 w-6 lg:w-8 h-6 lg:h-8 mb-6 lg:mb-8 group-hover:text-gold transition-all duration-500 group-hover:-translate-y-2" />
                    <span className="text-white/30 text-[9px] lg:text-[10px] uppercase tracking-[0.4em] mb-2 font-bold italic">Amritsar Junction</span>
                    <h5 className="text-white text-3xl lg:text-4xl font-serif font-light tracking-tighter">7km Distance</h5>
                    <div className="h-[1px] w-12 lg:w-16 bg-gold/10 group-hover:w-32 group-hover:bg-gold/40 transition-all duration-700 mt-6"></div>
                 </div>

              </div>
           </div>

           {/* FINAL QUOTE - CENTERED */}
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="mt-24 lg:mt-48 text-center"
           >
              <div className="flex items-center justify-center space-x-6 mb-12">
                 <div className="w-12 h-[1px] bg-gold/20"></div>
                 <Sparkle className="text-gold/40 w-10 h-10 animate-spin-slow" />
                 <div className="w-12 h-[1px] bg-gold/20"></div>
              </div>
              <p className="text-white/40 text-lg md:text-3xl font-serif italic leading-relaxed max-w-3xl px-6">
                &quot;The journey to the divine is as sacred as the destination itself. Approach with a heart of devotion and a mind of peace.&quot;
              </p>
              <div className="w-1 h-12 bg-gradient-to-b from-gold/30 to-transparent mx-auto mt-16"></div>
           </motion.div>

        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
}
