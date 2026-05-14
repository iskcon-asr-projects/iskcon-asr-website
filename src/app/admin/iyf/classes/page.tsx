"use client";

import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Trash2, 
  Plus, 
  BookOpen,
  Camera,
  Calendar,
  Type,
  Pin,
} from "lucide-react";

type ClassPost = {
  id: string;
  type: string;
  class_title: string;
  date: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
};

export default function AdminClasses() {
  const [posts, setPosts] = useState<ClassPost[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const [form, setForm] = useState({
    class_title: "",
    date: "",
    type: "instagram_link",
    content: "",
    is_pinned: false,
  });
  
  const [isNewClass, setIsNewClass] = useState(false);
  const router = useRouter();

  // Unique class titles
  const existingTitles = useMemo(() => {
    const titles = new Map<string, { date: string; count: number }>();
    posts.forEach((p) => {
      if (titles.has(p.class_title)) {
        titles.get(p.class_title)!.count++;
      } else {
        titles.set(p.class_title, { date: p.date || "", count: 1 });
      }
    });
    return titles;
  }, [posts]);

  // Group by title
  const groupedPosts = useMemo(() => {
    const groups = new Map<string, ClassPost[]>();
    posts.forEach((p) => {
      if (!groups.has(p.class_title)) {
        groups.set(p.class_title, []);
      }
      groups.get(p.class_title)!.push(p);
    });
    return groups;
  }, [posts]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        setIsCheckingAuth(false);
        fetchPosts();
      }
    });
  }, [router]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/iyf/classes");
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
    if (!form.class_title || !form.content) {
      alert("Please enter class title and content.");
      return;
    }

    setIsUploading(true);
    try {
      const res = await fetch("/api/iyf/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ ...form, content: "", is_pinned: false }); 
        fetchPosts();
      } else {
        alert("Error adding post.");
      }
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch("/api/iyf/classes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const togglePin = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/iyf/classes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_pinned: !currentStatus }),
      });
      if (res.ok) fetchPosts();
    } catch (error) {
      console.error("Error toggling pin:", error);
    }
  };

  if (isCheckingAuth) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans">
      <button 
        onClick={() => router.push('/admin/iyf')}
        className="flex items-center gap-2 text-white/40 hover:text-[#C5A059] transition-colors mb-12 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs uppercase tracking-widest font-bold">Back to IYF Admin</span>
      </button>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-12 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl text-[#C5A059] font-serif mb-2 tracking-tight">Manage IYF Classes</h1>
            <p className="text-white/40 text-sm tracking-wide">Documenting IYF Vedic education.</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <button onClick={() => router.push('/admin/iyf/yatras')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Yatras</button>
            <button onClick={() => router.push('/admin/iyf/sankirtan')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Sankirtan</button>
            <button onClick={() => router.push('/admin/iyf/camps')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Camps</button>
            <button onClick={() => router.push('/admin/iyf/prasadam')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Prasadam</button>
            <button onClick={() => router.push('/admin/iyf/classes')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-[#C5A059]/40 rounded-none text-[#C5A059] transition-colors">Classes</button>
            <button onClick={() => router.push('/admin/iyf/vaishnava-visits')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Visits</button>
            <button onClick={() => router.push('/admin/iyf/mega-events')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Mega Events</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: FORM */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-none p-8 shadow-2xl">
              <h2 className="text-xl font-serif text-white mb-8 flex items-center gap-3">
                <Plus size={20} className="text-[#C5A059]" />
                Add Class Post
              </h2>
              
              <form onSubmit={addPost} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-bold">Select Course/Series</label>
                  <div className="grid grid-cols-1 gap-3">
                    {Array.from(existingTitles.keys()).map((title) => (
                      <button
                        key={title}
                        type="button"
                        onClick={() => {
                          setForm({ ...form, class_title: title, date: existingTitles.get(title)?.date || "" });
                          setIsNewClass(false);
                        }}
                        className={`text-left px-4 py-3 rounded-none border transition-all ${
                          form.class_title === title && !isNewClass
                            ? "bg-[#C5A059]/10 border-[#C5A059]/40 text-[#C5A059]"
                            : "bg-white/5 border-white/5 text-white/60 hover:border-white/20"
                        }`}
                      >
                        <div className="text-sm font-medium">{title}</div>
                        <div className="text-[10px] opacity-50 uppercase tracking-wider">{existingTitles.get(title)?.date || "Series"}</div>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setIsNewClass(true);
                        setForm({ ...form, class_title: "", date: "" });
                      }}
                      className={`text-center px-4 py-4 rounded-none border border-dashed transition-all ${
                        isNewClass
                          ? "bg-orange-500/10 border-orange-500/40 text-orange-400"
                          : "bg-white/[0.02] border-white/10 text-white/40 hover:border-white/30"
                      }`}
                    >
                      <Plus size={16} className="mx-auto mb-1" />
                      <span className="text-[10px] uppercase tracking-widest font-bold">Add New Series</span>
                    </button>
                  </div>
                </div>

                {isNewClass && (
                  <div className="space-y-6 overflow-hidden">
                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <input
                        type="text"
                        placeholder="Series Title (e.g. Gita Level 1)"
                        value={form.class_title}
                        onChange={(e) => setForm({ ...form, class_title: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Date/Timing (Optional)"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-bold">Content</label>
                  <textarea
                    rows={4}
                    placeholder="Instagram link or embed code..."
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors font-mono text-sm"
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
                  className="w-full py-5 rounded-none bg-[#C5A059] text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#D5B069] transition-all disabled:opacity-50 shadow-xl shadow-[#C5A059]/10"
                >
                  {isUploading ? "Publishing..." : "Add Class Post"}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: LIST */}
          <div className="lg:col-span-7 space-y-10">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-8 h-8 border-2 border-[#C5A059]/20 border-t-[#C5A059] rounded-none animate-spin" />
              </div>
            ) : posts.length === 0 ? (
              <div className="text-white/20 text-center py-20 text-sm tracking-widest border border-dashed border-white/5 rounded-none uppercase">No class posts yet</div>
            ) : (
              Array.from(groupedPosts.entries()).map(([title, items]) => (
                <div key={title} className="bg-[#0A0A0A] border border-white/5 rounded-none overflow-hidden shadow-2xl">
                  <div className="px-6 py-4 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-serif text-white">{title}</h3>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider">{items[0]?.date || "Spiritual Education"}</p>
                    </div>
                    <span className="text-[10px] px-3 py-1 rounded-none bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] font-bold tracking-[0.15em] uppercase">
                      {items.length} {items.length === 1 ? "post" : "posts"}
                    </span>
                  </div>
                  <div className="divide-y divide-white/5">
                    {items.map((post) => (
                      <div key={post.id} className="p-6 flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-center gap-4 min-w-0 flex-1 pr-4">
                          <div className="w-10 h-10 rounded-none bg-white/5 flex items-center justify-center shrink-0">
                            <Camera size={16} className="text-pink-500/50" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs text-white/70 truncate font-mono bg-black/30 px-2 py-1 rounded-none">
                              {post.content.substring(0, 40)}...
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => togglePin(post.id, post.is_pinned)}
                            className={`p-3 rounded-none transition-all ${
                              post.is_pinned 
                                ? "bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30" 
                                : "bg-white/5 text-white/15 opacity-0 group-hover:opacity-100 hover:text-[#C5A059]"
                            }`}
                            title={post.is_pinned ? "Unpin Post" : "Pin to Top"}
                          >
                            <Pin size={16} className={post.is_pinned ? "fill-current" : ""} />
                          </button>
                          <button
                            onClick={() => deletePost(post.id)}
                            className="p-3 rounded-none bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
