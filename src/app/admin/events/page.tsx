"use client";

import React, { useState, useEffect } from "react";
import { supabase, uploadImage } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
};

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();

  // Protect the route
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        setIsCheckingAuth(false);
        fetchEvents();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/admin/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data.data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const addEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date || !imageFile) {
      return alert("Please fill title, date and select an image!");
    }

    setIsUploading(true);
    try {
      // 1. Upload Image
      const imageUrl = await uploadImage(imageFile, "events");
      if (!imageUrl) throw new Error("Image upload failed");

      // 2. Save to DB
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image: imageUrl,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save event");
      }

      // 3. Reset form
      setForm({ title: "", description: "", date: "" });
      setImageFile(null);
      setPreviewUrl(null);
      fetchEvents();
      alert("Event added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding event. Check console.");
    } finally {
      setIsUploading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch("/api/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete");
      fetchEvents();
    } catch (error) {
      console.error(error);
      alert("Error deleting event.");
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#C5A059] font-sans">
        Verifying Admin Access...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 md:p-12 font-sans relative overflow-x-hidden">
      {/* Decorative Orbs */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#C5A059]/5 blur-[120px] rounded-none pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#8A6D3B]/5 blur-[100px] rounded-none pointer-events-none" />

      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/admin/login");
        }}
        className="absolute top-8 right-12 text-white/50 hover:text-red-400 text-xs tracking-widest uppercase transition-colors z-20"
      >
        Sign Out
      </button>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-12 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl text-[#C5A059] font-serif mb-2 tracking-tight">Manage Events</h1>
            <p className="text-white/40 text-sm tracking-wide">Create and manage upcoming temple festivals and programs.</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/admin/darshan')}
              className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors"
            >
              Daily Darshan
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* CREATE EVENT FORM */}
          <section className="lg:col-span-12 xl:col-span-5">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-none p-8 sticky top-12 shadow-2xl">
              <h2 className="text-xl font-serif text-[#C5A059] mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#C5A059]/40"></span>
                Add New Event
              </h2>

              <form onSubmit={addEvent} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 px-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Gaura Purnima Festival"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 px-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors [color-scheme:dark]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 px-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Brief details about the event..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 px-1">
                    Event Poster
                  </label>
                  <div className="relative group">
                    <div className={`
                      aspect-[16/9] bg-white/[0.02] border-2 border-dashed border-white/10 rounded-none flex flex-col items-center justify-center overflow-hidden transition-all
                      ${!previewUrl ? 'hover:border-[#C5A059]/30 hover:bg-white/[0.04]' : 'border-none'}
                    `}>
                      {previewUrl ? (
                        <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                      ) : (
                        <div className="text-center p-6">
                          <svg className="w-8 h-8 text-white/20 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-[10px] uppercase tracking-widest text-white/30">Select Image</p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-5 bg-gradient-to-r from-[#C5A059] to-[#8A6D3B] text-black font-bold uppercase tracking-[0.3em] text-xs rounded-none hover:scale-[1.02] transition-all active:scale-[0.98] disabled:opacity-50 shadow-[0_10px_30px_rgba(197,160,89,0.2)]"
                >
                  {isUploading ? "Publishing..." : "Add Event"}
                </button>
              </form>
            </div>
          </section>

          {/* EVENTS LIST */}
          <section className="lg:col-span-12 xl:col-span-7">
            <h2 className="text-xl font-serif text-[#C5A059] mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#C5A059]/40"></span>
              Live Events ({events.length})
            </h2>

            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  <div className="text-white/20 text-center py-20 text-sm tracking-widest animate-pulse">LOADING EVENTS...</div>
                ) : events.length === 0 ? (
                  <div className="text-white/20 text-center py-20 text-sm tracking-widest border border-dashed border-white/5 rounded-none">NO UPCOMING EVENTS</div>
                ) : (
                  events.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="group bg-[#0A0A0A] border border-white/5 rounded-none p-4 flex gap-6 items-center hover:border-[#C5A059]/20 transition-all shadow-xl"
                    >
                      <div className="w-32 h-32 rounded-none overflow-hidden shrink-0 bg-white/5">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                          {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <h3 className="text-lg font-serif mb-1 truncate">{event.title}</h3>
                        <p className="text-sm text-white/40 line-clamp-2 leading-relaxed">{event.description}</p>
                      </div>
                      <div className="pr-4">
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="w-10 h-10 rounded-none bg-white/[0.03] flex items-center justify-center text-white/20 hover:bg-red-500/20 hover:text-red-400 transition-all"
                          title="Delete Event"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
