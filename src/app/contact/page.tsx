"use client";

import React, { useState } from "react";

import StaggeredEntry from "@/Components/StaggeredEntry";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  Clock, 
  Camera, 
  Video, 
  Globe 
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState)
      });

      const result = await res.json();

      if (!result.success) throw new Error(result.error || "Failed to send message");

      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      alert(error.message || "Failed to send message. Please try again later.");
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="relative min-h-screen w-full bg-[#050505] flex flex-col selection:bg-[#C5A059]/30 selection:text-[#C5A059] overflow-clip">
      {/* --- LOGO ONLY --- */}
      <div className="absolute top-8 left-4 md:left-10 z-[100]">
        <Link href="/">
          <img src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/logo.png" alt="ISKCON Logo" className="h-[58px] hover:scale-105 transition-transform" />
        </Link>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-4 md:px-10 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-[#C5A059]/10 blur-[120px] rounded-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-[#C5A059]/10 blur-[120px] rounded-none" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <StaggeredEntry delay={0.1}>
            <span className="text-[#C5A059] text-xs font-serif uppercase tracking-[0.5em] mb-4 block">Get in Touch</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white uppercase tracking-tighter mb-6">
              Connect With <span className="text-[#C5A059]">Us</span>
            </h1>
            <p className="text-white/50 max-w-2xl mx-auto text-sm md:text-base leading-relaxed tracking-wide font-light">
              Whether you have a question about our temple, want to volunteer, or are looking for spiritual guidance, we are here to help you on your journey.
            </p>
          </StaggeredEntry>
        </div>
      </section>

      {/* --- CONTACT INFO & FORM --- */}
      <section className="pb-24 px-4 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* LEFT: Contact Info */}
          <StaggeredEntry delay={0.3} className="space-y-12">
            <div>
              <h2 className="text-2xl font-serif text-white uppercase tracking-widest mb-10 border-b border-white/10 pb-4 inline-block">
                Contact Details
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059]/10 group-hover:border-[#C5A059]/30 transition-all">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-serif uppercase tracking-widest text-sm mb-2">Location</h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      Sri Sri Gaur Nitai Temple, Vrindavan Gardens,<br />
                      Fatehgarh Churian Road, Amritsar,<br />
                      Punjab — 143008
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059]/10 group-hover:border-[#C5A059]/30 transition-all">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-serif uppercase tracking-widest text-sm mb-2">Phone</h3>
                    <p className="text-white/50 text-sm tracking-widest">+91 77400 52036</p>
                    <p className="text-white/30 text-[10px] uppercase tracking-wider mt-1">(10 AM - 7 PM, Mon-Sat)</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059]/10 group-hover:border-[#C5A059]/30 transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-serif uppercase tracking-widest text-sm mb-2">Email</h3>
                    <p className="text-white/50 text-sm">iskconamritsaroffice@gmail.com</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059]/10 group-hover:border-[#C5A059]/30 transition-all">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-serif uppercase tracking-widest text-sm mb-2">Darshan Timing</h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      Morning: 4:30 AM – 1:00 PM<br />
                      Evening: 4:30 PM – 8:30 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-serif text-white uppercase tracking-widest mb-6">Follow Our Journey</h2>
              <div className="flex gap-4">
                {[
                  { Icon: Camera, href: "https://www.instagram.com/iskcon_amritsar/", label: "Instagram" },
                  { Icon: Video, href: "https://www.youtube.com/@iskcon_amritsar", label: "YouTube" },
                  { Icon: Globe, href: "https://www.facebook.com/IskconTemplesAmritsar/", label: "Facebook" },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="flex items-center gap-3 px-5 py-3 rounded-none bg-white/5 border border-white/10 text-white/60 hover:text-[#C5A059] hover:border-[#C5A059]/30 transition-all"
                  >
                    <social.Icon size={18} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </StaggeredEntry>

          {/* RIGHT: Contact Form */}
          <StaggeredEntry delay={0.5} className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-none backdrop-blur-sm shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 blur-3xl rounded-none" />
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-none bg-[#C5A059]/20 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] mx-auto mb-6">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-serif text-white uppercase tracking-widest mb-4">Message Received</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  Thank you for reaching out. We will get back to you shortly.<br/>Hare Krishna!
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-[#C5A059] text-xs font-bold uppercase tracking-[0.3em] hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">Your Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-4 text-white text-sm focus:outline-none focus:border-[#C5A059]/50 transition-all placeholder:text-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-4 text-white text-sm focus:outline-none focus:border-[#C5A059]/50 transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">Subject</label>
                  <input
                    required
                    type="text"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-4 text-white text-sm focus:outline-none focus:border-[#C5A059]/50 transition-all placeholder:text-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">Your Message</label>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-4 text-white text-sm focus:outline-none focus:border-[#C5A059]/50 transition-all placeholder:text-white/20 resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(197, 160, 89, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className={`w-full py-5 rounded-none bg-[#C5A059] text-black font-bold uppercase tracking-[0.4em] text-xs transition-all flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#E2C792]'}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-none animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </StaggeredEntry>
        </div>
      </section>

      {/* --- MAP SECTION --- */}
      <section className="px-4 md:px-10 pb-24">
        <StaggeredEntry delay={0.7} className="max-w-7xl mx-auto rounded-none overflow-hidden border border-white/10 h-[450px] relative grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.243452243452!2d74.87123456789!3d31.634567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391964aa569c735d%3A0x3fd7b080517452e!2sISKCON%20Temple%20Amritsar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="ISKCON Amritsar Location"
          />
          <div className="absolute top-6 left-6 bg-[#050505]/80 backdrop-blur-md border border-white/10 px-4 py-3 rounded-none pointer-events-none">
            <p className="text-[#C5A059] text-[10px] uppercase tracking-[0.2em] font-bold">Visit the Temple</p>
            <p className="text-white text-xs mt-1">Open 4:30 AM — 8:30 PM</p>
          </div>
        </StaggeredEntry>
      </section>

    </main>
  );
};

export default ContactPage;
