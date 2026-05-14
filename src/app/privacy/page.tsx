"use client";

import React from "react";
import StaggeredEntry from "@/Components/StaggeredEntry";
import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Info, Lock, Eye, Mail, Phone } from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <main className="relative min-h-screen w-full bg-[#050505] flex flex-col selection:bg-[#C5A059]/30 selection:text-[#C5A059] overflow-clip">
      {/* --- LOGO ONLY --- */}
      <div className="absolute top-8 left-4 md:left-10 z-[100]">
        <Link href="/">
          <img src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/logo.png" alt="ISKCON Logo" className="h-[58px] hover:scale-105 transition-transform" />
        </Link>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 px-4 md:px-10 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-[#C5A059]/10 blur-[120px] rounded-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-[#C5A059]/10 blur-[120px] rounded-none" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <StaggeredEntry delay={0.1}>
            <span className="text-[#C5A059] text-xs font-serif uppercase tracking-[0.5em] mb-4 block">Legal Notice</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white uppercase tracking-tighter mb-8">
              Privacy <span className="text-[#C5A059]">Policy</span>
            </h1>
            <div className="w-20 h-px bg-[#C5A059] mb-12" />
            <p className="text-white/70 text-sm md:text-base leading-relaxed tracking-wide font-light max-w-2xl">
              This privacy notice discloses the privacy practices for <span className="text-white font-medium">www.iskconamritsar.com</span>. 
              This privacy notice applies solely to information collected by this website.
            </p>
          </StaggeredEntry>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="pb-32 px-4 md:px-10">
        <div className="max-w-4xl mx-auto space-y-20">
          
          {/* Overview */}
          <StaggeredEntry delay={0.2} className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
            <div className="md:col-span-1">
              <h2 className="text-[#C5A059] text-[10px] uppercase tracking-[0.3em] font-bold">Overview</h2>
            </div>
            <div className="md:col-span-3">
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Our commitment to your privacy is paramount. This notice will notify you of the following:
              </p>
              <ul className="space-y-4">
                {[
                  "What personally identifiable information is collected from you through the website, how it is used and with whom it may be shared.",
                  "What choices are available to you regarding the use of your data.",
                  "The security procedures in place to protect the misuse of your information.",
                  "How you can correct any inaccuracies in the information."
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start text-white/50 text-sm">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-[#C5A059] rounded-none shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggeredEntry>

          {/* Collection, Use, and Sharing */}
          <StaggeredEntry delay={0.3} className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
            <div className="md:col-span-1 text-[#C5A059]">
              <Info size={24} className="mb-4 opacity-50" />
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold">Information Collection</h2>
            </div>
            <div className="md:col-span-3">
              <h3 className="text-white font-serif uppercase tracking-widest text-lg mb-6">Use and Sharing</h3>
              <div className="space-y-6 text-white/60 text-sm leading-relaxed">
                <p>
                  We are the sole owners of the information collected on this site. We only have access to collect information that you voluntarily give us via email or other direct contact from you. We will not sell or rent this information to anyone.
                </p>
                <p>
                  We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization, other than as necessary to fulfil your request, e.g. to ship an order.
                </p>
                <p>
                  Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy.
                </p>
              </div>
            </div>
          </StaggeredEntry>

          {/* Access and Control */}
          <StaggeredEntry delay={0.4} className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
            <div className="md:col-span-1 text-[#C5A059]">
              <Eye size={24} className="mb-4 opacity-50" />
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold">Your Control</h2>
            </div>
            <div className="md:col-span-3">
              <h3 className="text-white font-serif uppercase tracking-widest text-lg mb-6">Access Over Information</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address or phone number given on our website:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "See what data we have about you, if any.",
                  "Change/correct any data we have about you.",
                  "Have us delete any data we have about you.",
                  "Express any concern you have about our use of your data."
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-none hover:border-[#C5A059]/30 transition-colors">
                    <p className="text-white/50 text-[11px] uppercase tracking-wider">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </StaggeredEntry>

          {/* Security */}
          <StaggeredEntry delay={0.5} className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
            <div className="md:col-span-1 text-[#C5A059]">
              <Lock size={24} className="mb-4 opacity-50" />
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold">Security</h2>
            </div>
            <div className="md:col-span-3">
              <h3 className="text-white font-serif uppercase tracking-widest text-lg mb-6">Data Protection</h3>
              <div className="space-y-6 text-white/60 text-sm leading-relaxed">
                <p>
                  We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline.
                </p>
                <div className="bg-[#C5A059]/5 border-l-2 border-[#C5A059] p-6 mb-6">
                  <p className="text-white/80 italic">
                    While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information.
                  </p>
                </div>
                <p>
                  The computer servers in which we store personally identifiable information are kept in a highly secure environment.
                </p>
              </div>
            </div>
          </StaggeredEntry>

          {/* Contact */}
          <StaggeredEntry delay={0.6} className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-white/5 pt-12 pb-12">
            <div className="md:col-span-1 text-[#C5A059]">
              <Shield size={24} className="mb-4 opacity-50" />
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold">Compliance</h2>
            </div>
            <div className="md:col-span-3">
              <h3 className="text-white font-serif uppercase tracking-widest text-lg mb-6">Reporting Concerns</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                If you feel that we are not abiding by this privacy policy, you should contact our business head immediately via telephone or via email mentioned on our website.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-3 px-6 py-3 bg-[#C5A059] text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#E2C792] transition-colors rounded-none">
                  <Mail size={14} />
                  Contact Us
                </Link>
                <a href="tel:+911832543456" className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-colors rounded-none">
                  <Phone size={14} />
                  Call Now
                </a>
              </div>
            </div>
          </StaggeredEntry>

        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
