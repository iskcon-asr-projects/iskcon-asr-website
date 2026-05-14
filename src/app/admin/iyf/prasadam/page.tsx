"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Trash2, 
  Plus, 
  Camera,
  Type
} from "lucide-react";

type PrasadamPost = {
  id: string;
  type: string;
  event_name: string;
  date: string;
  content: string;
  created_at: string;
};

export default function AdminPrasadam() {
  const [posts, setPosts] = useState<PrasadamPost[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const [form, setForm] = useState({
    event_name: "Prasadam",
    date: "",
    type: "instagram_link",
    content: "",
  });
  
  const router = useRouter();

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
      const res = await fetch("/api/iyf/prasadam");
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
      alert("Please provide the Instagram content.");
      return;
    }

    setIsUploading(true);
    try {
      const res = await fetch("/api/iyf/prasadam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ ...form, content: "" }); 
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
      const res = await fetch("/api/iyf/prasadam", {
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
            <h1 className="text-4xl text-[#C5A059] font-serif mb-2 tracking-tight">Prasadam Making</h1>
            <p className="text-white/40 text-sm tracking-wide">Cooking for Krishna: Service and Devotion.</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <button onClick={() => router.push('/admin/iyf/yatras')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Yatras</button>
            <button onClick={() => router.push('/admin/iyf/sankirtan')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Sankirtan</button>
            <button onClick={() => router.push('/admin/iyf/camps')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Camps</button>
            <button onClick={() => router.push('/admin/iyf/prasadam')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-[#C5A059]/40 rounded-none text-[#C5A059] transition-colors">Prasadam</button>
            <button onClick={() => router.push('/admin/iyf/classes')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Classes</button>
            <button onClick={() => router.push('/admin/iyf/vaishnava-visits')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Visits</button>
            <button onClick={() => router.push('/admin/iyf/mega-events')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Mega Events</button>
          </div>
        </header>

        <div className="space-y-12">
          {/* SIMPLIFIED FORM */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-none p-8 shadow-2xl">
            <h2 className="text-xl font-serif text-white mb-8 flex items-center gap-3">
              <Plus size={20} className="text-[#C5A059]" />
              Add Instagram Post
            </h2>
            
            <form onSubmit={addPost} className="space-y-6">
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
                className="w-full py-5 rounded-none bg-[#C5A059] text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#D5B069] transition-all disabled:opacity-50 shadow-xl shadow-[#C5A059]/10"
              >
                {isUploading ? "Publishing..." : "Add Post"}
              </button>
            </form>
          </div>

          {/* FLAT LIST */}
          <div className="space-y-4">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mb-6 px-4">Existing Posts ({posts.length})</h2>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-8 h-8 border-2 border-[#C5A059]/20 border-t-[#C5A059] rounded-none animate-spin" />
              </div>
            ) : posts.length === 0 ? (
              <div className="text-white/20 text-center py-20 text-sm tracking-widest border border-dashed border-white/5 rounded-none uppercase">No posts yet</div>
            ) : (
              <div className="bg-[#0A0A0A] border border-white/5 rounded-none overflow-hidden shadow-2xl divide-y divide-white/5">
                {posts.map((post) => (
                  <div key={post.id} className="p-6 flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-4 min-w-0 flex-1 pr-4">
                      <div className="w-10 h-10 rounded-none bg-white/5 flex items-center justify-center shrink-0">
                        <Camera size={16} className="text-pink-500/50" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-white/70 truncate font-mono bg-black/30 px-2 py-1 rounded-none">
                          {post.content.substring(0, 60)}...
                        </div>
                        <div className="text-[9px] text-white/20 mt-1 uppercase tracking-widest">
                          Added on {new Date(post.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="p-3 rounded-none bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                    >
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
