"use client";

import { motion } from "framer-motion";

type Option = {
  label: string;
};

type Seva = {
  title: string;
  highlight?: boolean;
  options: Option[];
};

const SEVAS: Seva[] = [
  {
    title: "Janmashtami Maha Mahotsav Seva",
    options: [
      { label: "Phool Bangla Seva" },
      { label: "Langar Prasadam Seva" },
      { label: "Thakur Dress & Shringar" },
      { label: "Prasadam Seva" },
      { label: "Deities 108 Bhoga" },
      { label: "Kalash Abhishek" },
    ],
  },
  {
    title: "Anna Daan Seva",
    options: [
      { label: "50 Meals" },
      { label: "100 Meals" },
      { label: "Sunday Feast" },
    ],
  },
  {
    title: "Special Occasion Seva",
    options: [
      { label: "Mangal & Bal Bhog" },
      { label: "Raj Bhog" },
      { label: "Anna Daan" },
      { label: "Brahman Bhojan" },
    ],
  },
  {
    title: "Brahman Bhojan Seva",
    options: [
      { label: "5 Brahman" },
      { label: "10 Brahman" },
      { label: "15 Brahman" },
    ],
  },
  {
    title: "Deity Worship Seva",
    options: [
      { label: "Mangal Bhoga" },
      { label: "Shringar Seva" },
      { label: "Bal Bhoga" },
      { label: "Raj Bhoga" },
      { label: "Sandhya Bhoga" },
      { label: "Shayan Bhoga" },
      { label: "Ekadashi Bhoga" },
    ],
  },
  {
    title: "Life Patron Membership",
    options: [{ label: "Life Patron Membership" }],
  },
  {
    title: "Gaur Purnima Seva",
    options: [
      { label: "Kalash Abhishek" },
      { label: "108 Bhoga Seva" },
      { label: "Deity Dress" },
      { label: "Flower Decoration" },
      { label: "Langar Prasadam" },
    ],
  },
  {
    title: "Vidya Daan",
    options: [
      { label: "5 Bhagavad Gita" },
      { label: "11 Bhagavad Gita" },
      { label: "5 Krishna Book" },
      { label: "11 Krishna Book" },
      { label: "Srimad Bhagavatam" },
      { label: "Chaitanya Charitamrit Set" },
    ],
  },
];

export default function DonatePage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen pt-[76px] pb-32 flex flex-col items-center w-full overflow-x-hidden relative">
      {/* Soft Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C5A059]/10 blur-[150px] rounded-none pointer-events-none z-0"></div>

      {/* 🎬 MAIN HERO */}
      <section className="w-full aspect-video md:aspect-auto md:h-[60vh] overflow-hidden bg-black flex-shrink-0 flex items-center justify-center relative z-10">
        <video
          src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/construction.mp4"
          controls
          autoPlay
          loop
          playsInline
          className="w-full h-full object-contain md:object-cover"
        />
        {/* Subtle bottom vignette to blend into bg */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none"></div>
      </section>

      {/* 🧩 SEVAS */}
      <section className="w-full flex flex-col items-center px-4 pt-16 pb-12 relative z-20">
        <div className="text-center mb-16 px-4 w-full max-w-4xl mx-auto flex flex-col items-center relative z-20">
          <h2 className="text-xs md:text-sm font-serif text-[#C5A059] mb-4 tracking-[0.4em] uppercase drop-shadow-md">
            Hare Krishna
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white mb-6 tracking-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)] leading-tight">
            Support Our <span className="text-[#C5A059]">Divine Mission</span>
          </h3>
          <p className="text-sm md:text-[17px] leading-loose text-white/60 font-medium md:px-10 mb-8 max-w-3xl text-balance">
            Your generous offering helps us worship the Lord gorgeously, celebrate grand festivals, distribute free Prasadam to hundreds daily, and preserve our glorious Ancient Vedic Culture for future generations.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 rounded-none bg-gradient-to-r from-[#C5A059]/10 via-[#C5A059]/5 to-transparent border border-[#C5A059]/20 text-[#E2C792] text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold shadow-[0_0_30px_rgba(197,160,89,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)] block">
            <span className="text-[#C5A059] text-sm md:text-base">✨</span>
            <span className="opacity-90">80G Tax Exemption Available</span>
          </div>
        </div>

        {/* 🏗️ TEMPLE CONSTRUCTION HERO */}
        <div className="w-full max-w-6xl mb-24 flex flex-col items-center bg-gradient-to-br from-[#C5A059]/20 to-black border border-[#C5A059]/50 shadow-[0_0_50px_rgba(197,160,89,0.2)] rounded-none p-8 md:p-12 relative">
          <div className="absolute inset-0 overflow-hidden rounded-none pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/10 blur-[80px] rounded-none"></div>
          </div>
          
          <h3 className="text-3xl md:text-5xl font-serif text-[#C5A059] mb-6 text-center drop-shadow-md relative z-10">
            ✨ Temple Construction ✨
          </h3>
          
          <ul className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 text-white/90 text-sm md:text-base tracking-wide font-medium relative z-10">
            {["1 sq ft", "5 sq ft", "11 sq ft", "21 sq ft"].map((opt, i) => (
              <li key={i} className="flex items-center gap-2 bg-black/40 px-6 py-3 rounded-none border border-white/5 shadow-sm hover:border-[#C5A059]/40 transition-colors">
                <span className="w-2 h-2 rounded-none bg-[#C5A059]"></span>
                {opt}
              </li>
            ))}
          </ul>

          <div className="w-full bg-black/50 border border-white/10 rounded-none p-6 md:p-10 flex flex-col items-center backdrop-blur-sm relative z-10 text-center">
            <h4 className="text-xl md:text-2xl font-serif text-[#C5A059] mb-8 uppercase tracking-[0.2em] text-center w-full">Account Details</h4>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 w-full max-w-4xl">
              <div className="flex flex-col gap-2 items-center">
                <span className="text-xs text-[#C5A059]/80 uppercase tracking-widest font-semibold">Account Name</span>
                <span className="text-sm md:text-base font-bold text-white/90">ISKCON CONSTRUCTION</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-xs text-[#C5A059]/80 uppercase tracking-widest font-semibold">Account Number</span>
                <span className="text-sm md:text-base font-bold text-white/90 font-mono tracking-wider">0978000106220157</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-xs text-[#C5A059]/80 uppercase tracking-widest font-semibold">Bank Name</span>
                <span className="text-sm md:text-base font-bold text-white/90">Punjab National Bank</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-xs text-[#C5A059]/80 uppercase tracking-widest font-semibold">IFSC Code</span>
                <span className="text-sm md:text-base font-bold text-white/90 font-mono tracking-wider">PUNB0341100</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-xs text-[#C5A059]/80 uppercase tracking-widest font-semibold">Branch Name</span>
                <span className="text-sm md:text-base font-bold text-white/90">QUEENS ROAD, AMRITSAR</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl mb-16">
          {SEVAS.map((seva, index) => (
            <div
              key={index}
              className={`flex flex-col p-8 rounded-none transition-all duration-300 ${seva.highlight
                ? "bg-gradient-to-br from-[#C5A059]/20 to-black border border-[#C5A059]/40 shadow-[0_0_30px_rgba(197,160,89,0.15)]"
                : "bg-white/[0.02] border border-white/5"
                }`}
            >
              <h4 className="text-xl md:text-2xl font-serif text-[#C5A059] mb-4 text-center">
                {seva.highlight && "✨ "}
                {seva.title}
                {seva.highlight && " ✨"}
              </h4>
              <ul className="flex flex-col gap-2 items-center text-white/70 text-sm tracking-wide">
                {seva.options.map((opt, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-none bg-[#C5A059]/50"></span>
                    {opt.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <a
          href="https://give.iskconamritsar.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-[#C5A059] to-[#a3844a] text-black px-16 py-6 md:px-32 md:py-8 rounded-none font-black shadow-[0_0_40px_rgba(197,160,89,0.5)] hover:shadow-[0_0_60px_rgba(197,160,89,0.7)] hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center gap-2 group w-full max-w-xl mx-auto"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl md:text-2xl">✨</span>
            <span className="text-2xl md:text-3xl tracking-[0.1em] uppercase group-hover:tracking-[0.15em] transition-all">Donate Now</span>
            <span className="text-xl md:text-2xl">✨</span>
          </div>
          <span className="text-sm md:text-base font-bold opacity-80 lowercase tracking-widest">give.iskconamritsar.com</span>
        </a>
      </section>

      {/* 🌊 Seamless Gradient Transition */}
      <div className="w-full h-24 bg-gradient-to-b from-[#050505] to-black"></div>

      {/* 🏛️ BLENDED PREMIUM FOOTER */}
      <footer className="w-full relative z-10 bg-gradient-to-b from-[#050505] to-black overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-none">

        {/* Subtle background glow centered on the footer edge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#C5A059]/10 blur-[130px] rounded-none pointer-events-none"></div>

        <div className="relative w-full px-8 lg:px-16 xl:px-24 pt-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/5 items-start">

            {/* Column 1: Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left gap-3 lg:pr-6 pt-4 lg:pt-0"
            >
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide mb-1 drop-shadow-md">ISKCON Amritsar</h3>
                <p className="text-gray-400 leading-relaxed text-xs max-w-[240px]">
                  ISKCON Temple, Main Road, Vrindavan Gardens, Fatehgarh Churian Rd, Amritsar, Punjab 143001
                </p>
              </div>

              <div className="flex flex-col gap-2 text-xs font-medium w-full mt-1">
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center sm:gap-3 gap-1">
                  <span className="text-gray-500 uppercase tracking-widest text-[9px] w-12 lg:text-left text-center">Phone</span>
                  <a href="tel:+917740052036" className="text-gray-300 hover:text-[#C5A059] transition-all">+91 77400 52036</a>
                  <span className="text-white/40 text-[9px] uppercase tracking-wider font-bold ml-2">(10 AM - 7 PM, Mon-Sat)</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center sm:gap-3 gap-1">
                  <span className="text-gray-500 uppercase tracking-widest text-[9px] w-12 lg:text-left text-center">Email</span>
                  <a href="mailto:iskconamritsaroffice@gmail.com" className="text-gray-300 hover:text-[#C5A059] transition-all">iskconamritsaroffice@gmail.com</a>
                </div>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center sm:gap-3 gap-1">
                  <span className="text-gray-500 uppercase tracking-widest text-[9px] w-12 lg:text-left text-center">Web</span>
                  <a href="https://iskconamritsar.com" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-[#C5A059] transition-all">iskconamritsar.com</a>
                </div>
              </div>
            </motion.div>

            {/* Column 2: Donors */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center text-center gap-3 lg:px-6 pt-6 lg:pt-0"
            >
              <div className="flex flex-col items-center">
                <h3 className="text-base font-bold text-[#C5A059] tracking-wide mb-1 uppercase drop-shadow-md">Thank You To Our Donors</h3>
              </div>

              <p className="text-gray-200 text-sm leading-relaxed max-w-lg font-medium opacity-95 text-balance">
                Saikat Sarkar, Yogesh Asthana, Natarajan R, Kaustav Chatterji, Radha rani, Saurabh Devgun, Hare Krishna
              </p>

              <button className="group mt-1 text-[#C5A059] hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                See Full List <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </motion.div>

            {/* Column 3: Founder */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center lg:items-end text-center lg:text-right gap-4 lg:pl-6 pt-6 lg:pt-0"
            >
              <div className="flex flex-col items-center lg:items-end w-full">
                <p className="text-[#C5A059] text-[9px] font-bold tracking-[0.2em] uppercase mb-1 drop-shadow-md">
                  Official Website
                </p>
                <h3 className="text-sm font-semibold text-gray-300 w-full leading-relaxed mx-auto lg:mr-0">
                  International Society for Krishna Consciousness (ISKCON)
                </h3>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:hidden my-2"></div>

              <div className="flex flex-col items-center lg:items-end gap-1 mt-1 w-full">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold flex items-center justify-center lg:justify-end gap-2">
                  <span className="w-1.5 h-1.5 rounded-none bg-[#C5A059]"></span>
                  Founder-Acarya
                </p>
                <p className="text-sm font-bold text-white/90 group-hover:text-[#C5A059] transition-colors leading-relaxed drop-shadow-md w-full">
                  His Divine Grace A.C. Bhaktivedanta Swami Prabhupada
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </footer>
    </main>
  );
}
