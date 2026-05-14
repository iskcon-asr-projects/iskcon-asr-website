"use client";

import React, { useState, useEffect, useMemo } from "react";
import { supabase, uploadImage } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Pin, Trash2 } from "lucide-react";

type YatraUpdate = {
  id: string;
  type: string;
  yatra_name: string;
  date: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
};

export default function AdminYatras() {
  const [updates, setUpdates] = useState<YatraUpdate[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [form, setForm] = useState({
    yatra_name: "",
    date: "",
    type: "image",
    content: "",
    is_pinned: false,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isNewYatra, setIsNewYatra] = useState(false);
  const router = useRouter();

  // Derive unique yatra names from existing updates
  const existingYatraNames = useMemo(() => {
    const names = new Map<string, { date: string; count: number }>();
    updates.forEach((u) => {
      if (names.has(u.yatra_name)) {
        names.get(u.yatra_name)!.count++;
      } else {
        names.set(u.yatra_name, { date: u.date || "", count: 1 });
      }
    });
    return names;
  }, [updates]);

  // Group updates by yatra name for the right panel
  const groupedUpdates = useMemo(() => {
    const groups = new Map<string, YatraUpdate[]>();
    updates.forEach((u) => {
      if (!groups.has(u.yatra_name)) {
        groups.set(u.yatra_name, []);
      }
      groups.get(u.yatra_name)!.push(u);
    });
    return groups;
  }, [updates]);

  // Protect the route
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        setIsCheckingAuth(false);
        fetchUpdates();
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

  const fetchUpdates = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/iyf/yatras");
      const data = await res.json();
      setUpdates(data.data || []);
    } catch (error) {
      console.error("Error fetching updates:", error);
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

  const selectExistingYatra = (name: string) => {
    setIsNewYatra(false);
    // Also grab the date from the first entry for this yatra
    const existing = updates.find((u) => u.yatra_name === name);
    setForm({ ...form, yatra_name: name, date: existing?.date || form.date });
  };

  const addUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.yatra_name) {
      return alert("Please fill Yatra Name!");
    }

    if (form.type === "image" && !imageFile) {
      return alert("Please select an image!");
    }

    if (form.type !== "image" && !form.content) {
      return alert("Please provide content!");
    }

    setIsUploading(true);
    try {
      let finalContent = form.content;

      // 1. Upload Image if type is image
      if (form.type === "image" && imageFile) {
        const imageUrl = await uploadImage(imageFile, "events");
        if (!imageUrl) throw new Error("Image upload failed");
        finalContent = imageUrl;
      }

      // 2. Save to DB
      const res = await fetch("/api/iyf/yatras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          yatra_name: form.yatra_name,
          date: form.date,
          type: form.type,
          content: finalContent,
          is_pinned: form.is_pinned,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save update");
      }

      // 3. Reset form but KEEP the yatra_name and date for quick multi-upload
      const keepName = form.yatra_name;
      const keepDate = form.date;
      setForm({ yatra_name: keepName, date: keepDate, type: "image", content: "", is_pinned: false });
      setImageFile(null);
      setPreviewUrl(null);
      fetchUpdates();
      alert("Yatra update added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding update. Check console.");
    } finally {
      setIsUploading(false);
    }
  };

  const deleteUpdate = async (id: string) => {
    if (!confirm("Are you sure you want to delete this update?")) return;

    try {
      const res = await fetch("/api/iyf/yatras", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete");
      fetchUpdates();
    } catch (error) {
      console.error(error);
      alert("Error deleting update.");
    }
  };

  const togglePin = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/iyf/yatras", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_pinned: !currentStatus }),
      });

      if (!res.ok) throw new Error("Failed to toggle pin");
      fetchUpdates();
    } catch (error) {
      console.error(error);
      alert("Error toggling pin.");
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

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl text-[#C5A059] font-serif mb-2 tracking-tight">Manage Yatras</h1>
            <p className="text-white/40 text-sm tracking-wide">Upload images, Instagram videos, and text updates for Yatras.</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => router.push('/admin/iyf')}
              className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors"
            >
              Book Distribution
            </button>
            <button
              onClick={() => router.push('/admin/iyf/sankirtan')}
              className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors"
            >
              Sankirtan
            </button>
            <button
              onClick={() => router.push('/admin/iyf/camps')}
              className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors"
            >
              Camps
            </button>
            <button
              onClick={() => router.push('/admin/iyf/prasadam')}
              className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors"
            >
              Prasadam
            </button>
            <button
              onClick={() => router.push('/admin/iyf/classes')}
              className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors"
            >
              Classes
            </button>
            <button
              onClick={() => router.push('/admin/iyf/vaishnava-visits')}
              className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors"
            >
              Visits
            </button>
            <button
              onClick={() => router.push('/admin/iyf/mega-events')}
              className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors"
            >
              Mega Events
            </button>
            <button
              onClick={() => router.push('/admin/events')}
              className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors"
            >
              Events
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          {/* CREATE FORM */}
          <section className="xl:col-span-5">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-none p-8 sticky top-12 shadow-2xl">
              <h2 className="text-xl font-serif text-[#C5A059] mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#C5A059]/40"></span>
                Add Yatra Update
              </h2>

              {/* ── YATRA SELECTOR ── */}
              {existingYatraNames.size > 0 && (
                <div className="mb-8">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3 px-1">
                    Select Existing Yatra
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {Array.from(existingYatraNames.entries()).map(([name, info]) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => selectExistingYatra(name)}
                        className={`
                          text-xs px-4 py-2 rounded-none border transition-all duration-300
                          ${form.yatra_name === name && !isNewYatra
                            ? "bg-[#C5A059]/20 border-[#C5A059]/60 text-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.15)]"
                            : "bg-white/[0.03] border-white/10 text-white/50 hover:border-[#C5A059]/30 hover:text-white/70"
                          }
                        `}
                      >
                        {name}
                        <span className="ml-2 text-[10px] opacity-60">({info.count})</span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsNewYatra(true);
                      setForm({ ...form, yatra_name: "", date: "" });
                    }}
                    className={`
                      text-[10px] uppercase tracking-[0.15em] px-4 py-2 rounded-none border transition-all duration-300
                      ${isNewYatra
                        ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                        : "bg-white/[0.02] border-white/10 text-white/30 hover:border-emerald-500/30 hover:text-emerald-400/70"
                      }
                    `}
                  >
                    + New Yatra
                  </button>
                </div>
              )}

              <form onSubmit={addUpdate} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 px-1">
                    Update Type
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors appearance-none"
                  >
                    <option value="image" className="bg-[#0A0A0A]">Image Photo</option>
                    <option value="instagram" className="bg-[#0A0A0A]">Instagram Embed Code</option>
                    <option value="instagram_link" className="bg-[#0A0A0A]">Instagram Link (URL)</option>
                    <option value="text" className="bg-[#0A0A0A]">Text Announcement</option>
                  </select>
                </div>

                {/* Show yatra name input: always if no existing yatras, or when "New Yatra" is selected, or when no yatra is selected yet */}
                {(existingYatraNames.size === 0 || isNewYatra || (!form.yatra_name && !isNewYatra)) && (
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 px-1">
                      Yatra Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vrindavan Yatra"
                      value={form.yatra_name}
                      onChange={(e) => setForm({ ...form, yatra_name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors"
                      required
                    />
                  </div>
                )}

                {/* Show selected yatra badge when an existing yatra is selected */}
                {form.yatra_name && !isNewYatra && existingYatraNames.size > 0 && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#C5A059]/10 border border-[#C5A059]/20 rounded-none">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Adding to:</span>
                    <span className="text-[#C5A059] font-serif text-lg">{form.yatra_name}</span>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 px-1">
                    Date (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. June 2026"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors"
                  />
                </div>

                {form.type === "image" && (
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 px-1">
                      Upload Image
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
                )}

                {(form.type === "text" || form.type === "instagram" || form.type === "instagram_link") && (
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 px-1">
                      {form.type === "instagram" ? "Instagram Embed Code" : form.type === "instagram_link" ? "Instagram Post URL" : "Announcement Text"}
                    </label>
                    <textarea
                      rows={5}
                      placeholder={form.type === "instagram" ? "Paste <blockquote class='instagram-media'>...</blockquote>" : form.type === "instagram_link" ? "e.g. https://www.instagram.com/p/XXXXX/" : "Type your message..."}
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors resize-none"
                      required
                    />
                  </div>
                )}

                <div className="flex items-center gap-3 px-1 py-2">
                  <input
                    type="checkbox"
                    id="is_pinned"
                    checked={form.is_pinned}
                    onChange={(e) => setForm({ ...form, is_pinned: e.target.checked })}
                    className="w-4 h-4 bg-white/5 border border-white/10 rounded-none accent-[#C5A059]"
                  />
                  <label htmlFor="is_pinned" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 cursor-pointer">
                    Pin to Top
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-5 bg-gradient-to-r from-[#C5A059] to-[#8A6D3B] text-black font-bold uppercase tracking-[0.3em] text-xs rounded-none hover:scale-[1.02] transition-all active:scale-[0.98] disabled:opacity-50 shadow-[0_10px_30px_rgba(197,160,89,0.2)]"
                >
                  {isUploading ? "Publishing..." : `Add to ${form.yatra_name || "Yatra"}`}
                </button>
              </form>
            </div>
          </section>

          {/* GROUPED LIST */}
          <section className="xl:col-span-7">
            <h2 className="text-xl font-serif text-[#C5A059] mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#C5A059]/40"></span>
              Live Yatra Updates ({updates.length})
            </h2>

            <div className="space-y-10">
              {isLoading ? (
                <div className="text-white/20 text-center py-20 text-sm tracking-widest animate-pulse">LOADING...</div>
              ) : groupedUpdates.size === 0 ? (
                <div className="text-white/20 text-center py-20 text-sm tracking-widest border border-dashed border-white/5 rounded-none">NO YATRA UPDATES PUBLISHED</div>
              ) : (
                Array.from(groupedUpdates.entries()).map(([yatraName, items]) => (
                  <div key={yatraName} className="bg-[#0A0A0A] border border-white/5 rounded-none overflow-hidden shadow-2xl">
                    {/* Group Header */}
                    <div className="px-6 py-5 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <h3 className="text-xl font-serif text-white">{yatraName}</h3>
                        <span className="text-[10px] px-3 py-1 rounded-none bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] font-bold tracking-[0.15em] uppercase">
                          {items.length} {items.length === 1 ? "post" : "posts"}
                        </span>
                      </div>
                      {items[0]?.date && (
                        <span className="text-white/30 text-[10px] tracking-widest">{items[0].date}</span>
                      )}
                    </div>

                    {/* Group Items */}
                    <div className="p-4 space-y-3">
                      <AnimatePresence mode="popLayout">
                        {items.map((update) => (
                          <motion.div
                            key={update.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="group flex gap-4 items-center p-3 rounded-none hover:bg-white/[0.02] transition-colors"
                          >
                            {update.type === "image" ? (
                              <div className="w-16 h-16 rounded-none overflow-hidden shrink-0 bg-white/5 border border-white/5">
                                <img src={update.content} alt={update.yatra_name} className="w-full h-full object-cover" />
                              </div>
                            ) : (
                              <div className="w-16 h-16 rounded-none shrink-0 bg-white/5 flex items-center justify-center text-white/30 text-[9px] uppercase tracking-wider border border-white/5">
                                {update.type === "instagram_link" ? "IG" : update.type === "instagram" ? "Embed" : "Text"}
                              </div>
                            )}

                            <div className="flex-grow min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[#C5A059] text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 bg-[#C5A059]/10 rounded-none border border-[#C5A059]/20">
                                  {update.type}
                                </span>
                              </div>
                              {update.type === "text" && (
                                <p className="text-xs text-white/40 line-clamp-1 leading-relaxed mt-1">{update.content}</p>
                              )}
                              {(update.type === "instagram" || update.type === "instagram_link") && (
                                <p className="text-[10px] text-white/20 italic mt-1">Instagram Content</p>
                              )}
                              {update.type === "image" && (
                                <p className="text-[10px] text-white/20 italic mt-1">Image uploaded</p>
                              )}
                            </div>

                            <div className="flex items-center gap-2 pr-2">
                              <button
                                onClick={() => togglePin(update.id, update.is_pinned)}
                                className={`w-8 h-8 rounded-none flex items-center justify-center transition-all ${
                                  update.is_pinned 
                                    ? "bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30 opacity-100" 
                                    : "bg-white/[0.03] text-white/15 hover:bg-[#C5A059]/10 hover:text-[#C5A059]/60 opacity-0 group-hover:opacity-100"
                                }`}
                                title={update.is_pinned ? "Unpin Post" : "Pin to Top"}
                              >
                                <Pin size={14} className={update.is_pinned ? "fill-current" : ""} />
                              </button>
                              <button
                                onClick={() => deleteUpdate(update.id)}
                                className="w-8 h-8 rounded-none bg-white/[0.03] flex items-center justify-center text-white/15 hover:bg-red-500/20 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100 shrink-0"
                                title="Delete Update"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
