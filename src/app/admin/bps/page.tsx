"use client";

import React, { useState, useEffect } from "react";
import { supabase, uploadImage } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Trash2, 
  Plus, 
  Camera,
  Film,
  Star,
  Loader2,
  Phone,
  LayoutGrid
} from "lucide-react";

type BPSItem = {
  id: string;
  section: string;
  title: string;
  media_url: string;
  media_type: string;
  is_pinned: boolean;
  created_at: string;
};

export default function AdminBPS() {
  const [items, setItems] = useState<BPSItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const [form, setForm] = useState({
    section: "class",
    title: "",
    media_type: "image",
  });
  const [file, setFile] = useState<File | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        setIsCheckingAuth(false);
        fetchItems();
      }
    });
  }, [router]);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/bps");
      const data = await res.json();
      setItems(data.data || []);
    } catch (error) {
      console.error("Error fetching BPS items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a photo or video to upload.");
      return;
    }

    setIsUploading(true);
    try {
      // 1. Upload to Supabase Storage
      const mediaUrl = await uploadImage(file, "iyf");
      if (!mediaUrl) throw new Error("Upload failed");

      // 2. Save to Database
      const res = await fetch("/api/bps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          media_url: mediaUrl,
          media_type: file.type.startsWith("video") ? "video" : "image"
        }),
      });

      if (res.ok) {
        setForm({ ...form, title: "" });
        setFile(null);
        // Reset file input
        const fileInput = document.getElementById('media-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        fetchItems();
      } else {
        alert("Error saving to database.");
      }
    } catch (error) {
      console.error("Error adding BPS item:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const togglePin = async (id: string, currentPinned: boolean) => {
    try {
      const res = await fetch("/api/bps", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_pinned: !currentPinned }),
      });
      if (res.ok) fetchItems();
    } catch (error) {
      console.error("Error toggling pin:", error);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch("/api/bps", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
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
            <h1 className="text-4xl text-[#C5A059] font-serif mb-2 tracking-tight">BPS Management</h1>
            <p className="text-white/40 text-sm tracking-wide">Managing Bhakta Prahlad School Classes, Activities & Shlokas.</p>
          </div>
          <div className="flex gap-4 flex-wrap">
             <button onClick={() => router.push('/admin/bps')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-[#C5A059]/40 rounded-none text-[#C5A059] transition-colors">BPS School</button>
             <button onClick={() => router.push('/admin/iyf/mega-events')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Mega Events</button>
             <button onClick={() => router.push('/admin/iyf/yatras')} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors">Yatras</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: UPLOAD FORM */}
          <section className="lg:col-span-5">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-none p-8 sticky top-12 shadow-2xl">
              <h2 className="text-xl font-serif text-white mb-8 flex items-center gap-3">
                <Plus size={20} className="text-[#C5A059]" />
                Add Media to BPS
              </h2>
              
              <form onSubmit={handleUpload} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-bold">Select Section</label>
                  <select
                    value={form.section}
                    onChange={(e) => setForm({ ...form, section: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors appearance-none"
                  >
                    <option value="class">Sunday Class (8-9 AM)</option>
                    <option value="activity">Activities</option>
                    <option value="shloka">Shloka Recitation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-bold">
                    {form.section === 'activity' ? 'Activity Name' : form.section === 'shloka' ? 'Shloka Reference' : 'Photo Description (Optional)'}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter details..."
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-bold">Media File (Photo/Video)</label>
                  <div className="relative">
                    <input
                      id="media-upload"
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="w-full bg-white/5 border border-white/10 rounded-none p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-colors"
                    />
                  </div>
                  <p className="text-[9px] text-white/20 mt-2 uppercase tracking-widest italic">Max size: 50MB (Videos) / 5MB (Photos)</p>
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-4 bg-[#C5A059] text-black font-bold uppercase tracking-[0.2em] text-[10px] rounded-none hover:bg-[#D4B67A] transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#C5A059]/10"
                >
                  {isUploading ? <Loader2 className="animate-spin" size={18} /> : <Camera size={18} />}
                  {isUploading ? 'Uploading...' : 'Upload to BPS Section'}
                </button>
              </form>
            </div>
          </section>

          {/* RIGHT: LIST BY CATEGORY */}
          <section className="lg:col-span-7 space-y-12">
            {['class', 'activity', 'shloka'].map((sec) => (
              <div key={sec} className="bg-[#0A0A0A] border border-white/5 rounded-none p-8 shadow-xl">
                <header className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                  <h3 className="text-xl font-serif text-[#C5A059] uppercase tracking-wider">
                    {sec === 'class' ? 'Sunday Classes' : sec === 'activity' ? 'Activities' : 'Shloka Recitation'}
                  </h3>
                  <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
                    {items.filter(i => i.section === sec).length} Items
                  </span>
                </header>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {items.filter(i => i.section === sec).length === 0 ? (
                    <div className="col-span-full py-12 text-center text-white/10 uppercase tracking-widest text-xs border border-dashed border-white/10">
                      No media uploaded yet.
                    </div>
                  ) : (
                    items.filter(i => i.section === sec).map((item) => (
                      <div key={item.id} className="relative group aspect-square bg-white/5 border border-white/5 overflow-hidden">
                        {item.media_type === 'video' ? (
                          <video src={item.media_url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" muted />
                        ) : (
                          <img src={item.media_url} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                        )}
                        
                        {/* Overlay Controls */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => togglePin(item.id, item.is_pinned)}
                              className={`p-2 transition-colors ${item.is_pinned ? 'text-[#C5A059]' : 'text-white/40 hover:text-white'}`}
                            >
                              <Star size={16} fill={item.is_pinned ? "currentColor" : "none"} />
                            </button>
                            <button 
                              onClick={() => deleteItem(item.id)}
                              className="p-2 text-white/40 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div>
                            <p className="text-[10px] text-white font-medium truncate">{item.title || 'Untitled'}</p>
                            <p className="text-[8px] text-white/40 uppercase tracking-tighter">
                              {item.media_type === 'video' ? <Film size={8} className="inline mr-1" /> : <Camera size={8} className="inline mr-1" />}
                              {new Date(item.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {/* Pinned Indicator */}
                        {item.is_pinned && (
                          <div className="absolute top-2 left-2 p-1 bg-[#C5A059] text-black">
                            <Star size={10} fill="currentColor" />
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
