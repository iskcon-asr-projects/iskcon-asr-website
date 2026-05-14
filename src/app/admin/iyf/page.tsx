"use client";

import React, { useState, useEffect } from "react";
import { supabase, uploadImage } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Pin, Trash2 } from "lucide-react";

type IyfUpdate = {
  id: string;
  type: string;
  title: string;
  date: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
};

export default function AdminIyf() {
  const [updates, setUpdates] = useState<IyfUpdate[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [form, setForm] = useState({
    title: "",
    date: "",
    type: "image",
    content: "",
    is_pinned: false,
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
      const res = await fetch("/api/iyf");
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

  const addUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

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
        const imageUrl = await uploadImage(imageFile, "events"); // reusing events bucket or maybe darshan
        if (!imageUrl) throw new Error("Image upload failed");
        finalContent = imageUrl;
      }

      // 2. Save to DB
      const res = await fetch("/api/iyf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Update",
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

      // 3. Reset form
      setForm({ title: "", date: "", type: "image", content: "", is_pinned: false });
      setImageFile(null);
      setPreviewUrl(null);
      fetchUpdates();
      alert("Update added successfully!");
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
      const res = await fetch("/api/iyf", {
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
      const res = await fetch("/api/iyf", {
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

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-12 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl text-[#C5A059] font-serif mb-2 tracking-tight">Manage IYF Book Distribution</h1>
            <p className="text-white/40 text-sm tracking-wide">Upload images, Instagram videos, and text updates.</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <button onClick={() => router.push('/admin/iyf/yatras')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Yatras</button>
            <button onClick={() => router.push('/admin/iyf/sankirtan')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Sankirtan</button>
            <button onClick={() => router.push('/admin/iyf/camps')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Camps</button>
            <button onClick={() => router.push('/admin/iyf/prasadam')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Prasadam</button>
            <button onClick={() => router.push('/admin/iyf/classes')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Classes</button>
            <button onClick={() => router.push('/admin/iyf/vaishnava-visits')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Visits</button>
            <button onClick={() => router.push('/admin/iyf/mega-events')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Mega Events</button>
            <button onClick={() => router.push('/admin/events')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Events</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* CREATE FORM */}
          <section className="lg:col-span-12 xl:col-span-5">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-none p-8 sticky top-12 shadow-2xl">
              <h2 className="text-xl font-serif text-[#C5A059] mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#C5A059]/40"></span>
                Add New Update
              </h2>

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

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 px-1">
                    Date (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. May 2026"
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
                  {isUploading ? "Publishing..." : "Add Update"}
                </button>
              </form>
            </div>
          </section>

          {/* LIST */}
          <section className="lg:col-span-12 xl:col-span-7">
            <h2 className="text-xl font-serif text-[#C5A059] mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#C5A059]/40"></span>
              Live Updates ({updates.length})
            </h2>

            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  <div className="text-white/20 text-center py-20 text-sm tracking-widest animate-pulse">LOADING...</div>
                ) : updates.length === 0 ? (
                  <div className="text-white/20 text-center py-20 text-sm tracking-widest border border-dashed border-white/5 rounded-none">NO UPDATES PUBLISHED</div>
                ) : (
                  updates.map((update) => (
                    <motion.div
                      key={update.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="group bg-[#0A0A0A] border border-white/5 rounded-none p-6 flex gap-6 items-center hover:border-[#C5A059]/20 transition-all shadow-xl"
                    >
                      {update.type === "image" ? (
                        <div className="w-24 h-24 rounded-none overflow-hidden shrink-0 bg-white/5">
                          <img src={update.content} alt={update.title} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-24 h-24 rounded-none shrink-0 bg-white/5 flex items-center justify-center text-white/30 text-[10px] uppercase tracking-wider">
                          {update.type}
                        </div>
                      )}

                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 bg-[#C5A059]/10 rounded-none border border-[#C5A059]/20">
                            {update.type}
                          </span>
                          {update.date && <span className="text-white/30 text-[10px] tracking-widest">{update.date}</span>}
                        </div>
                        {update.type === "text" && (
                          <p className="text-sm text-white/40 line-clamp-2 leading-relaxed mt-2">{update.content}</p>
                        )}
                        {(update.type === "instagram" || update.type === "instagram_link") && (
                          <p className="text-xs text-white/20 italic">Instagram Content Hidden</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 pr-2">
                        <button
                          onClick={() => togglePin(update.id, update.is_pinned)}
                          className={`w-10 h-10 rounded-none flex items-center justify-center transition-all ${
                            update.is_pinned 
                              ? "bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30" 
                              : "bg-white/[0.03] text-white/15 hover:bg-[#C5A059]/10 hover:text-[#C5A059]/60"
                          }`}
                          title={update.is_pinned ? "Unpin Post" : "Pin to Top"}
                        >
                          <Pin size={18} className={update.is_pinned ? "fill-current" : ""} />
                        </button>
                        <button
                          onClick={() => deleteUpdate(update.id)}
                          className="w-10 h-10 rounded-none bg-white/[0.03] flex items-center justify-center text-white/15 hover:bg-red-500/20 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20"
                          title="Delete Update"
                        >
                          <Trash2 size={18} />
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
