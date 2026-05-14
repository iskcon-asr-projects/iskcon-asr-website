"use client";

import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Trash2, 
  Plus, 
  Camera,
  Calendar,
  Star,
  Loader2
} from "lucide-react";

type MegaEventPost = {
  id: string;
  type: string;
  event_name: string;
  date: string;
  content: string;
  created_at: string;
};

export default function AdminMegaEvents() {
  const [posts, setPosts] = useState<MegaEventPost[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const [form, setForm] = useState({
    event_name: "",
    date: "",
    type: "instagram_link",
    content: "",
  });
  
  const [isNewEvent, setIsNewEvent] = useState(false);
  const router = useRouter();

  // Derive unique event names from existing posts
  const existingEventNames = useMemo(() => {
    const names = new Map<string, { date: string; count: number }>();
    posts.forEach((p) => {
      if (names.has(p.event_name)) {
        names.get(p.event_name)!.count++;
      } else {
        names.set(p.event_name, { date: p.date || "", count: 1 });
      }
    });
    return names;
  }, [posts]);

  // Group posts by event name
  const groupedPosts = useMemo(() => {
    const groups = new Map<string, MegaEventPost[]>();
    posts.forEach((p) => {
      if (!groups.has(p.event_name)) {
        groups.set(p.event_name, []);
      }
      groups.get(p.event_name)!.push(p);
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
      const res = await fetch("/api/iyf/mega-events");
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
    if (!form.event_name || !form.content) {
      alert("Please enter event name and content (IG link/code).");
      return;
    }

    setIsUploading(true);
    try {
      const res = await fetch("/api/iyf/mega-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ ...form, content: "" }); // Reset content but keep name/date for multi-upload
        fetchPosts();
      } else {
        alert("Error adding post. Check console.");
      }
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch("/api/iyf/mega-events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (isCheckingAuth) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans selection:bg-[#C5A059]/30">
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
            <h1 className="text-4xl text-[#C5A059] font-serif mb-2 tracking-tight">Manage IYF Mega Events</h1>
            <p className="text-white/40 text-sm tracking-wide">Relive the grandeur of our biggest youth gatherings.</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <button onClick={() => router.push('/admin/iyf/yatras')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Yatras</button>
            <button onClick={() => router.push('/admin/iyf/sankirtan')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Sankirtan</button>
            <button onClick={() => router.push('/admin/iyf/camps')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Camps</button>
            <button onClick={() => router.push('/admin/iyf/prasadam')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Prasadam</button>
            <button onClick={() => router.push('/admin/iyf/classes')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Classes</button>
            <button onClick={() => router.push('/admin/iyf/vaishnava-visits')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Visits</button>
            <button onClick={() => router.push('/admin/iyf/mega-events')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-[#C5A059]/40 rounded-none text-[#C5A059] transition-colors">Mega Events</button>
            <button onClick={() => router.push('/admin/events')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Events</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: ADD POST FORM */}
          <section className="lg:col-span-5">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-none p-8 sticky top-12 shadow-2xl">
              <h2 className="text-xl font-serif text-white mb-8 flex items-center gap-3">
                <Plus size={20} className="text-[#C5A059]" />
                Add Event Post
              </h2>
              
              <form onSubmit={addPost} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-bold">Select Event</label>
                  {!isNewEvent && existingEventNames.size > 0 ? (
                    <div className="space-y-4">
                      <select
                        value={form.event_name}
                        onChange={(e) => {
                          const name = e.target.value;
                          const details = existingEventNames.get(name);
                          setForm({ ...form, event_name: name, date: details?.date || "" });
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors appearance-none"
                      >
                        <option value="">-- Choose Existing Event --</option>
                        {Array.from(existingEventNames.keys()).map(name => (
                          <option key={name} value={name}>{name}</option>
                        ))}
                      </select>
                      <button 
                        type="button"
                        onClick={() => setIsNewEvent(true)}
                        className="text-[10px] uppercase tracking-widest text-[#C5A059] hover:text-white transition-colors"
                      >
                        + Add New Event
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Event Name (e.g., Youth Festival 2024)"
                        value={form.event_name}
                        onChange={(e) => setForm({ ...form, event_name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Date (e.g., Dec 2024)"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors"
                      />
                      {existingEventNames.size > 0 && (
                        <button 
                          type="button"
                          onClick={() => setIsNewEvent(false)}
                          className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                        >
                          ← Use Existing Event
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-bold">Content</label>
                  <textarea
                    rows={6}
                    placeholder="Instagram link or embed code..."
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors font-mono text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-4 bg-[#C5A059] text-black font-bold uppercase tracking-[0.2em] text-[10px] rounded-none hover:bg-[#D4B67A] transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#C5A059]/10"
                >
                  {isUploading ? <Loader2 className="animate-spin" size={18} /> : <Camera size={18} />}
                  Add Post — Mega Events
                </button>
              </form>
            </div>
          </section>

          {/* RIGHT: LIST OF EVENTS */}
          <section className="lg:col-span-7">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-serif text-white">Event Archives</h2>
              <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold">{existingEventNames.size} Categories</span>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#C5A059]" /></div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20 bg-white/5 rounded-none border border-dashed border-white/10 text-white/20 uppercase tracking-widest text-xs">No events archived yet.</div>
            ) : (
              <div className="space-y-10">
                {Array.from(groupedPosts.entries()).map(([eventName, eventPosts]) => (
                  <div key={eventName} className="bg-[#0A0A0A] border border-white/5 rounded-none p-8 shadow-xl">
                    <header className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                      <div>
                        <h3 className="text-2xl font-serif text-[#C5A059] mb-1">{eventName}</h3>
                        <p className="text-white/40 text-[10px] uppercase tracking-widest flex items-center gap-2">
                          <Calendar size={12} />
                          {eventPosts[0].date}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-none text-[10px] text-white/40 font-bold uppercase tracking-widest">
                        {eventPosts.length} Posts
                      </span>
                    </header>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {eventPosts.map((post) => (
                        <div key={post.id} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-none group hover:border-[#C5A059]/20 transition-all">
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="w-10 h-10 rounded-none bg-white/5 flex items-center justify-center shrink-0">
                              <Camera size={14} className="text-white/20 group-hover:text-[#C5A059] transition-colors" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-white/40 truncate font-mono">{post.content.substring(0, 50)}...</p>
                              <p className="text-[9px] text-white/20 uppercase tracking-tighter mt-1">{new Date(post.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => deletePost(post.id)}
                            className="text-white/10 hover:text-red-500 transition-colors p-2"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
