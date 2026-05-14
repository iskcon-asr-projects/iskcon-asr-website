"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Loader2,
  Calendar,
  Camera,
  UserCheck
} from "lucide-react";

export default function VaishnavaVisitsAdmin() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);

  const [form, setForm] = useState({
    title: "",
    date: "",
    type: "instagram_link",
    content: "",
  });

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
      const res = await fetch("/api/iyf/vaishnava-visits");
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
    if (!form.content || !form.title) {
      alert("Please provide the Title and Instagram content.");
      return;
    }

    setIsUploading(true);
    try {
      const res = await fetch("/api/iyf/vaishnava-visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ ...form, title: "", date: "", content: "" }); 
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
      const res = await fetch("/api/iyf/vaishnava-visits", {
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
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans">
      <button 
        onClick={() => router.push('/admin/iyf')}
        className="flex items-center gap-2 text-white/40 hover:text-[#C5A059] transition-colors mb-12 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs uppercase tracking-widest font-bold">Back to IYF Admin</span>
      </button>

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="mb-12 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl text-[#C5A059] font-serif mb-2 tracking-tight">Vaishnava Visits</h1>
            <p className="text-white/40 text-sm tracking-wide">Honoring the presence of exalted Vaishnavas.</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <button onClick={() => router.push('/admin/iyf/yatras')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Yatras</button>
            <button onClick={() => router.push('/admin/iyf/sankirtan')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Sankirtan</button>
            <button onClick={() => router.push('/admin/iyf/camps')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Camps</button>
            <button onClick={() => router.push('/admin/iyf/prasadam')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Prasadam</button>
            <button onClick={() => router.push('/admin/iyf/classes')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Classes</button>
            <button onClick={() => router.push('/admin/iyf/vaishnava-visits')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-[#C5A059]/40 rounded-none text-[#C5A059] transition-colors">Visits</button>
            <button onClick={() => router.push('/admin/events')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Events</button>
          </div>
        </header>

        <div className="space-y-12">
          {/* SIMPLIFIED FORM */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-none p-8 shadow-2xl">
            <h2 className="text-xl font-serif text-white mb-8 flex items-center gap-3">
              <Plus size={20} className="text-[#C5A059]" />
              Add Visit Post
            </h2>
            
            <form onSubmit={addPost} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-bold">Visit Title / Personality</label>
                  <input
                    type="text"
                    placeholder="e.g., HH Gopal Krishna Goswami Maharaja Visit"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-bold">Date</label>
                  <input
                    type="text"
                    placeholder="e.g., April 2024"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-bold">Post Content</label>
                <textarea
                  rows={4}
                  placeholder="Instagram link or embed code..."
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors font-mono text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-4 bg-[#C5A059] text-black font-bold rounded-none hover:bg-[#D4B67A] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isUploading ? <Loader2 className="animate-spin" size={18} /> : <Camera size={18} />}
                Add Visit Post
              </button>
            </form>
          </div>

          {/* LIST */}
          <div className="space-y-4">
            <h2 className="text-sm uppercase tracking-[0.3em] text-white/30 font-bold mb-6 flex items-center gap-2">
              <UserCheck size={14} />
              Recent Visits
            </h2>
            {isLoading ? (
              <div className="flex justify-center py-12"><Loader2 className="animate-spin text-[#C5A059]" /></div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12 bg-white/5 rounded-none border border-dashed border-white/10 text-white/20">No visits posted yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white/5 border border-white/10 rounded-none p-6 flex justify-between items-start group hover:border-[#C5A059]/30 transition-all">
                    <div>
                      <h3 className="text-white font-medium mb-1">{post.title}</h3>
                      <div className="flex items-center gap-3 text-white/40 text-[10px] uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Calendar size={10} /> {post.date || 'No date'}</span>
                      </div>
                    </div>
                    <button onClick={() => deletePost(post.id)} className="text-white/20 hover:text-red-500 transition-colors p-2">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
