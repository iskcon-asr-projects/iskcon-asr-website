"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Pin, Trash2 } from "lucide-react";

type SankirtanPost = {
  id: string;
  date: string;
  type: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
};

export default function AdminSankirtan() {
  const [posts, setPosts] = useState<SankirtanPost[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [form, setForm] = useState({
    date: "",
    type: "instagram_link",
    content: "",
    is_pinned: false,
  });

  const router = useRouter();

  // Protect the route
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        setIsCheckingAuth(false);
        fetchPosts();
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

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/iyf/sankirtan");
      const data = await res.json();
      setPosts(data.data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.content) {
      return alert("Please provide an Instagram link!");
    }

    setIsUploading(true);
    try {
      const res = await fetch("/api/iyf/sankirtan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: form.date,
          type: form.type,
          content: form.content,
          is_pinned: form.is_pinned,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save post");
      }

      // Keep date for quick multi-upload, clear content
      setForm({ ...form, content: "", is_pinned: false });
      fetchPosts();
      alert("Sankirtan post added!");
    } catch (error) {
      console.error(error);
      alert("Error adding post. Check console.");
    } finally {
      setIsUploading(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this sankirtan post?")) return;

    try {
      const res = await fetch("/api/iyf/sankirtan", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete");
      fetchPosts();
    } catch (error) {
      console.error(error);
      alert("Error deleting post.");
    }
  };

  const togglePin = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/iyf/sankirtan", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_pinned: !currentStatus }),
      });

      if (!res.ok) throw new Error("Failed to toggle pin");
      fetchPosts();
    } catch (error) {
      console.error(error);
      alert("Error toggling pin.");
    }
  };

  // Group posts by date
  const groupedPosts = React.useMemo(() => {
    const groups = new Map<string, SankirtanPost[]>();
    posts.forEach((p) => {
      if (!groups.has(p.date)) groups.set(p.date, []);
      groups.get(p.date)!.push(p);
    });
    return groups;
  }, [posts]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#C5A059] font-sans">
        Verifying Admin Access...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 md:p-12 font-sans relative overflow-x-hidden">
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
            <h1 className="text-4xl text-[#C5A059] font-serif mb-2 tracking-tight">Nagar Sankirtan</h1>
            <p className="text-white/40 text-sm tracking-wide">Add Instagram posts from weekly Nagar Sankirtan sessions.</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <button onClick={() => router.push('/admin/iyf')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Book Distribution</button>
            <button onClick={() => router.push('/admin/iyf/sankirtan')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-[#C5A059]/40 rounded-none text-[#C5A059] transition-colors">Sankirtan</button>
            <button onClick={() => router.push('/admin/iyf/camps')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Camps</button>
            <button onClick={() => router.push('/admin/iyf/prasadam')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Prasadam</button>
            <button onClick={() => router.push('/admin/iyf/classes')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Classes</button>
            <button onClick={() => router.push('/admin/iyf/vaishnava-visits')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Visits</button>
            <button onClick={() => router.push('/admin/iyf/mega-events')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Mega Events</button>
            <button onClick={() => router.push('/admin/events')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Events</button>
            <button onClick={() => router.push('/admin/iyf/yatras')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Yatras</button>

          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          {/* FORM */}
          <section className="xl:col-span-5">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-none p-8 sticky top-12 shadow-2xl">
              <h2 className="text-xl font-serif text-[#C5A059] mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#C5A059]/40"></span>
                Add Sankirtan Post
              </h2>

              <form onSubmit={addPost} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 px-1">
                    Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. May 4, 2026"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 px-1">
                    Post Type
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors appearance-none"
                  >
                    <option value="instagram_link" className="bg-[#0A0A0A]">Instagram Link (URL)</option>
                    <option value="instagram" className="bg-[#0A0A0A]">Instagram Embed Code</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 px-1">
                    {form.type === "instagram" ? "Embed Code" : "Instagram Post URL"}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={form.type === "instagram" ? "Paste <blockquote>...</blockquote>" : "https://www.instagram.com/p/XXXXX/"}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors resize-none"
                    required
                  />
                </div>

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
                  {isUploading ? "Publishing..." : `Add Post — ${form.date || "Sankirtan"}`}
                </button>
              </form>
            </div>
          </section>

          {/* LIST — grouped by date */}
          <section className="xl:col-span-7">
            <h2 className="text-xl font-serif text-[#C5A059] mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#C5A059]/40"></span>
              Sankirtan Posts ({posts.length})
            </h2>

            <div className="space-y-8">
              {isLoading ? (
                <div className="text-white/20 text-center py-20 text-sm tracking-widest animate-pulse">LOADING...</div>
              ) : groupedPosts.size === 0 ? (
                <div className="text-white/20 text-center py-20 text-sm tracking-widest border border-dashed border-white/5 rounded-none">NO SANKIRTAN POSTS YET</div>
              ) : (
                Array.from(groupedPosts.entries()).map(([date, items]) => (
                  <div key={date || "no-date"} className="bg-[#0A0A0A] border border-white/5 rounded-none overflow-hidden shadow-2xl">
                    <div className="px-6 py-4 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                      <h3 className="text-lg font-serif text-white">{date || "Recent Uploads"}</h3>
                      <span className="text-[10px] px-3 py-1 rounded-none bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] font-bold tracking-[0.15em] uppercase">
                        {items.length} {items.length === 1 ? "post" : "posts"}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <AnimatePresence mode="popLayout">
                        {items.map((post) => (
                          <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="group flex gap-4 items-center p-3 rounded-none hover:bg-white/[0.02] transition-colors"
                          >
                            <div className="w-14 h-14 rounded-none shrink-0 bg-white/5 flex items-center justify-center text-white/30 text-[9px] uppercase tracking-wider border border-white/5">
                              IG
                            </div>

                            <div className="flex-grow min-w-0">
                              <span className="text-[#C5A059] text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 bg-[#C5A059]/10 rounded border border-[#C5A059]/20">
                                {post.type === "instagram_link" ? "link" : "embed"}
                              </span>
                              <p className="text-[10px] text-white/20 italic mt-1 truncate">{post.content.substring(0, 60)}...</p>
                            </div>

                            <div className="flex items-center gap-2 pr-2">
                              <button
                                onClick={() => togglePin(post.id, post.is_pinned)}
                                className={`w-8 h-8 rounded-none flex items-center justify-center transition-all ${
                                  post.is_pinned 
                                    ? "bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30 opacity-100" 
                                    : "bg-white/[0.03] text-white/15 hover:bg-[#C5A059]/10 hover:text-[#C5A059]/60 opacity-0 group-hover:opacity-100"
                                }`}
                                title={post.is_pinned ? "Unpin Post" : "Pin to Top"}
                              >
                                <Pin size={14} className={post.is_pinned ? "fill-current" : ""} />
                              </button>
                              <button
                                onClick={() => deletePost(post.id)}
                                className="w-8 h-8 rounded-none bg-white/[0.03] flex items-center justify-center text-white/15 hover:bg-red-500/20 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100 shrink-0"
                                title="Delete"
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
