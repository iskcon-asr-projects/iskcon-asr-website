"use client";

import React, { useState, useEffect, useMemo } from "react";
import { supabase, uploadImage } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Sun,
  Sparkles,
  Flame,
  GraduationCap,
  Compass,
  Music,
  Tent,
  Utensils,
  BookOpen,
  UserCheck,
  Star,
  Mail,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  Plus,
  Trash2,
  Camera,
  Film,
  Loader2,
  Pin,
  Clock,
  Menu,
  X,
  Play,
  ChevronLeft,
  Home as HomeIcon
} from "lucide-react";

// --- TYPES ---
type ActiveModule =
  | 'dashboard'
  | 'events'
  | 'darshan'
  | 'festive'
  | 'iyf'
  | 'bps'
  | 'yatras'
  | 'camps'
  | 'sankirtan'
  | 'prasadam'
  | 'classes'
  | 'visits'
  | 'mega'
  | 'home-sankirtan'
  | 'igf-classes'
  | 'igf-activities'
  | 'messages';

// --- MAIN COMPONENT ---
export default function UnifiedAdmin() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        setIsCheckingAuth(false);
      }
    });
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#C5A059] font-sans">
        <Loader2 className="animate-spin mr-3" size={20} />
        Verifying Admin Access...
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'Main' },
    { id: 'events', label: 'Events', icon: Calendar, category: 'Temple' },
    { id: 'darshan', label: 'Daily Darshan', icon: Sun, category: 'Temple' },
    { id: 'festive', label: 'Festive Darshan', icon: Sparkles, category: 'Temple' },
    { id: 'bps', label: 'BPS School', icon: GraduationCap, category: 'Youth' },
    { id: 'iyf', label: 'Book Distribution', icon: Flame, category: 'Youth' },
    { id: 'yatras', label: 'Yatras', icon: Compass, category: 'IYF Modules' },
    { id: 'camps', label: 'Camps', icon: Tent, category: 'IYF Modules' },
    { id: 'sankirtan', label: 'Sankirtan', icon: Music, category: 'IYF Modules' },
    { id: 'prasadam', label: 'Prasadam', icon: Utensils, category: 'IYF Modules' },
    { id: 'classes', label: 'Classes', icon: BookOpen, category: 'IYF Modules' },
    { id: 'visits', label: 'Visits', icon: UserCheck, category: 'IYF Modules' },
    { id: 'mega', label: 'Mega Events', icon: Star, category: 'IYF Modules' },
    { id: 'home-sankirtan', label: 'Home Sankirtan', icon: HomeIcon, category: 'IYF Modules' },
    { id: 'igf-classes', label: 'IGF Classes', icon: GraduationCap, category: 'Youth' },
    { id: 'igf-activities', label: 'IGF Activities', icon: Sparkles, category: 'Youth' },
    { id: 'messages', label: 'Messages', icon: Mail, category: 'System' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex">
      {/* Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'w-72 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0 lg:w-20'}
        fixed lg:sticky top-0 h-screen bg-[#0A0A0A] border-r border-white/5 transition-all duration-300 z-[60] flex flex-col shrink-0
      `}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-[#C5A059] flex-shrink-0 flex items-center justify-center">
              <img src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
            </div>
            {isSidebarOpen && <span className="font-serif text-[#C5A059] tracking-tighter whitespace-nowrap">IYF ADMIN</span>}
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 text-white/40">
            {isSidebarOpen ? <ChevronLeft size={16} /> : <Menu size={16} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 scrollbar-hide">
          {['Main', 'Temple', 'Youth', 'IYF Modules', 'System'].map((category) => (
            <div key={category} className="mb-6 px-4">
              {isSidebarOpen && (
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-bold mb-4 px-2">{category}</p>
              )}
              <div className="space-y-1">
                {menuItems.filter(item => item.category === category).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveModule(item.id as ActiveModule)}
                    className={`
                      w-full flex items-center gap-4 px-4 py-3 rounded-none transition-all group
                      ${activeModule === item.id ? 'bg-[#C5A059]/10 text-[#C5A059] border-r-2 border-[#C5A059]' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}
                    `}
                  >
                    <item.icon size={20} className={activeModule === item.id ? 'text-[#C5A059]' : 'group-hover:text-white transition-colors'} />
                    {isSidebarOpen && <span className="text-xs uppercase tracking-widest font-medium">{item.label}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={async () => { await supabase.auth.signOut(); router.push("/admin/login"); }}
            className={`w-full flex items-center gap-4 p-4 text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all overflow-hidden`}
          >
            <LogOut size={18} className="shrink-0" />
            {isSidebarOpen && <span className="text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 transition-all duration-300 relative min-w-0">
        {/* Mobile Header Trigger */}
        <div className="lg:hidden p-4 border-b border-white/5 bg-[#0A0A0A] sticky top-0 z-40 flex items-center justify-between">
          <img src="https://teotvyqgrbmivctfmval.supabase.co/storage/v1/object/public/events/assets/logo.png" alt="Logo" className="h-6" />
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-white/40 hover:text-white">
            <Menu size={20} />
          </button>
        </div>

        <div className="p-8 md:p-12 max-w-7xl mx-auto">
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
            <div>
              <h1 className="text-4xl text-[#C5A059] font-serif mb-2 tracking-tight">
                {menuItems.find(i => i.id === activeModule)?.label}
              </h1>
              <p className="text-white/40 text-sm tracking-wide italic">
                Manage your {activeModule} content effortlessly.
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-1">Status</p>
              <div className="flex items-center gap-2 text-green-500 text-[10px] uppercase tracking-widest font-bold">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Live Connection
              </div>
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeModule === 'dashboard' && <DashboardWelcome />}
              {activeModule === 'events' && <EventsManager />}
              {activeModule === 'bps' && <BpsManager />}
              {activeModule === 'iyf' && <IyfManager />}
              {['yatras', 'camps', 'sankirtan', 'prasadam', 'classes', 'visits', 'mega'].includes(activeModule) && (
                <GenericIyfManager module={activeModule} />
              )}
              {activeModule === 'home-sankirtan' && <HomeSankirtanManager />}
              {activeModule === 'igf-classes' && <IgfClassesManager />}
              {activeModule === 'igf-activities' && <IgfActivitiesManager />}
              {activeModule === 'darshan' && <DarshanManager />}
              {activeModule === 'festive' && <FestiveDarshanManager />}
              {activeModule === 'messages' && <MessagesManager />}
              {/* Fallback */}
              {!['dashboard', 'events', 'bps', 'iyf', 'darshan', 'festive', 'messages', 'yatras', 'camps', 'sankirtan', 'prasadam', 'classes', 'visits', 'mega', 'home-sankirtan', 'igf-classes', 'igf-activities'].includes(activeModule) && (
                <div className="py-48 text-center text-white/10 uppercase tracking-[0.5em] text-xs animate-pulse">
                  Module Coming Soon...
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function DashboardWelcome() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="col-span-2 bg-[#0a0a0a] border border-white/5 p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 blur-[100px]" />
        <h2 className="text-3xl font-serif text-white mb-6">Hare Krishna, Admin</h2>
        <p className="text-white/40 max-w-md leading-relaxed mb-12">
          Welcome to your unified command center. From here, you can control every aspect of the ISKCON Amritsar digital platform. Use the sidebar to navigate between modules.
        </p>
        <div className="flex gap-4">
          <div className="bg-white/5 border border-white/10 p-6 flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Total Events</span>
            <span className="text-3xl font-serif text-[#C5A059]">...</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Messages</span>
            <span className="text-3xl font-serif text-[#C5A059]">0</span>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-[#C5A059]/20 to-transparent border border-[#C5A059]/30 p-12">
        <h3 className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-bold mb-8">System Health</h3>
        <div className="space-y-6">
          {['Database', 'Storage', 'Auth', 'API'].map(s => (
            <div key={s} className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-white/40">{s}</span>
              <span className="text-[10px] text-green-500 font-bold">OPTIMAL</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EventsManager() {
  const [events, setEvents] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", date: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data.data || []);
    setIsLoading(false);
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    if (!form.title || !form.date || !imageFile) return alert("Fill all fields");
    setIsUploading(true);
    const imageUrl = await uploadImage(imageFile, "events");
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, image: imageUrl }),
    });
    setForm({ title: "", description: "", date: "" });
    setImageFile(null);
    setPreviewUrl(null);
    fetchEvents();
    setIsUploading(false);
  };

  const deleteEvent = async (id: string) => {
    if (!confirm("Delete event?")) return;
    await fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchEvents();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
      <div className="xl:col-span-5 bg-[#0a0a0a] border border-white/5 p-8 h-fit shadow-2xl">
        <h3 className="text-lg font-serif text-[#C5A059] mb-8 flex items-center gap-3">
          <Plus size={18} /> Add New Event
        </h3>
        <form onSubmit={handleUpload} className="space-y-6">
          <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-[#C5A059]/50 outline-none" required />
          <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-[#C5A059]/50 outline-none [color-scheme:dark]" required />
          <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-[#C5A059]/50 outline-none h-24" />
          <div className="aspect-video bg-white/[0.02] border border-dashed border-white/10 relative overflow-hidden group cursor-pointer">
            {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center text-white/20 text-[10px] uppercase tracking-widest">Select Poster</div>}
            <input type="file" accept="image/*" onChange={e => {
              const f = e.target.files?.[0];
              if (f) { setImageFile(f); setPreviewUrl(URL.createObjectURL(f)); }
            }} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
          <button type="submit" disabled={isUploading} className="w-full py-4 bg-[#C5A059] text-black font-bold uppercase tracking-widest text-[10px] hover:bg-[#D4B67A] transition-all disabled:opacity-50">
            {isUploading ? "Publishing..." : "Add Event"}
          </button>
        </form>
      </div>
      <div className="xl:col-span-7 space-y-6">
        <h3 className="text-xs uppercase tracking-[0.3em] text-white/20 font-bold mb-4">Live Events ({events.length})</h3>
        {isLoading ? <div className="text-white/10 text-center py-20 animate-pulse">LOADING...</div> : events.map(event => (
          <div key={event.id} className="bg-[#0a0a0a] border border-white/5 p-4 flex gap-6 items-center hover:border-white/10 transition-all">
            <img src={event.image} className="w-24 h-24 object-cover" />
            <div className="flex-1">
              <p className="text-[#C5A059] text-[9px] uppercase tracking-widest font-bold mb-1">{event.date}</p>
              <h4 className="text-lg font-serif truncate">{event.title}</h4>
            </div>
            <button onClick={() => deleteEvent(event.id)} className="p-3 text-white/20 hover:text-red-500 transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BpsManager() {
  const [items, setItems] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ section: "class", title: "" });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    const res = await fetch("/api/bps");
    const data = await res.json();
    setItems(data.data || []);
    setIsLoading(false);
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    if (!file) return alert("Select media");
    setIsUploading(true);
    const mediaUrl = await uploadImage(file, "iyf");
    await fetch("/api/bps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, media_url: mediaUrl, media_type: file.type.startsWith("video") ? "video" : "image" }),
    });
    setForm({ ...form, title: "" });
    setFile(null);
    fetchItems();
    setIsUploading(false);
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete item?")) return;
    await fetch("/api/bps", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchItems();
  };

  const togglePin = async (id: string, pinned: boolean) => {
    await fetch("/api/bps", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, is_pinned: !pinned }) });
    fetchItems();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
      <div className="xl:col-span-4 bg-[#0a0a0a] border border-white/5 p-8 h-fit shadow-2xl">
        <h3 className="text-lg font-serif text-[#C5A059] mb-8 flex items-center gap-3">
          <Plus size={18} /> Add BPS Media
        </h3>
        <form onSubmit={handleUpload} className="space-y-6">
          <select value={form.section} onChange={e => setForm({ ...form, section: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none appearance-none">
            <option value="class">Sunday Class</option>
            <option value="activity">Activity</option>
            <option value="shloka">Shloka</option>
          </select>
          <input type="text" placeholder="Title/Reference" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-[#C5A059]/50 outline-none" />
          <div className="bg-white/5 border border-white/10 p-4 relative overflow-hidden">
            <input type="file" accept="image/*,video/*" onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
            <div className="flex items-center gap-3 text-white/30 text-[10px] uppercase tracking-widest font-bold">
              {file ? <span className="text-white">{file.name}</span> : <span>Select Photo/Video</span>}
            </div>
          </div>
          <button type="submit" disabled={isUploading} className="w-full py-4 bg-[#C5A059] text-black font-bold uppercase tracking-widest text-[10px] hover:bg-[#D4B67A] transition-all disabled:opacity-50">
            {isUploading ? <Loader2 className="animate-spin mx-auto" size={18} /> : "Upload Media"}
          </button>
        </form>
      </div>
      <div className="xl:col-span-8 space-y-12">
        {['class', 'activity', 'shloka'].map(sec => (
          <div key={sec}>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold mb-6 flex items-center gap-3">
              <span className="w-4 h-[1px] bg-orange-500"></span>
              {sec === 'class' ? 'SUNDAY CLASSES' : sec === 'activity' ? 'ACTIVITIES' : 'SHLOKAS'}
            </h4>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {items.filter(i => i.section === sec).length === 0 ? (
                <div className="col-span-full py-8 text-center text-white/5 text-[10px] uppercase tracking-widest border border-dashed border-white/5">EMPTY</div>
              ) : items.filter(i => i.section === sec).map(item => (
                <div key={item.id} className="relative aspect-square bg-white/5 group overflow-hidden border border-white/5">
                  {item.media_type === 'video' ? <video src={item.media_url} className="w-full h-full object-cover" muted /> : <img src={item.media_url} className="w-full h-full object-cover" />}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button onClick={() => togglePin(item.id, item.is_pinned)} className={item.is_pinned ? "text-orange-500" : "text-white/40 hover:text-white transition-colors"}><Star size={18} fill={item.is_pinned ? "currentColor" : "none"} /></button>
                    <button onClick={() => deleteItem(item.id)} className="text-white/40 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                  </div>
                  {item.is_pinned && <div className="absolute top-2 left-2 p-1 bg-orange-500 text-white shadow-xl"><Star size={8} fill="currentColor" /></div>}
                  {item.media_type === 'video' && <div className="absolute bottom-2 right-2 p-1 bg-black/60 text-white/60"><Film size={8} /></div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IyfManager() {
  const [updates, setUpdates] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ title: "Update", date: "", type: "image", content: "", is_pinned: false });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => { fetchUpdates(); }, []);

  const fetchUpdates = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/iyf");
      const data = await res.json();
      const fetchedUpdates = data.data || [];
      setUpdates(fetchedUpdates);
      
      // Auto-fill date from the most recent update
      if (fetchedUpdates.length > 0 && fetchedUpdates[0].date) {
        setForm(prev => ({ ...prev, date: fetchedUpdates[0].date }));
      }
    } catch (err) {
      console.error("IYF Fetch Failed:", err);
    }
    setIsLoading(false);
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    setIsUploading(true);
    let finalContent = form.content;
    if (form.type === "image" && file) {
      finalContent = await uploadImage(file, "events") || "";
    }
    await fetch("/api/iyf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, content: finalContent }),
    });
    // Keep date for adding multiple updates
    setForm(prev => ({ ...prev, content: "" }));
    setFile(null);
    setPreview(null);
    fetchUpdates();
    setIsUploading(false);
  };

  const deleteUpdate = async (id: string) => {
    if (!confirm("Delete update?")) return;
    await fetch("/api/iyf", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchUpdates();
  };

  const togglePin = async (id: string, pinned: boolean) => {
    await fetch("/api/iyf", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, is_pinned: !pinned }) });
    fetchUpdates();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
      <div className="xl:col-span-5 bg-[#0a0a0a] border border-white/5 p-8 h-fit shadow-2xl">
        <h3 className="text-lg font-serif text-[#C5A059] mb-8 flex items-center gap-3">
          <Plus size={18} /> New Book Distribution Update
        </h3>
        <form onSubmit={handleUpload} className="space-y-6">
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none appearance-none">
            <option value="image">Image Photo</option>
            <option value="instagram_link">Instagram Link</option>
            <option value="text">Text Announcement</option>
          </select>
          <input type="text" placeholder="Date/Month (Optional)" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-[#C5A059]/50 outline-none" />

          {form.type === "image" ? (
            <div className="aspect-video bg-white/[0.02] border border-dashed border-white/10 relative overflow-hidden group cursor-pointer">
              {preview ? <img src={preview} className="w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center text-white/20 text-[10px] uppercase tracking-widest">Select Image</div>}
              <input type="file" accept="image/*" onChange={e => {
                const f = e.target.files?.[0];
                if (f) { setFile(f); setPreview(URL.createObjectURL(f)); }
              }} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          ) : (
            <textarea placeholder={form.type === 'text' ? 'Message...' : 'Paste Instagram Link...'} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-[#C5A059]/50 outline-none h-32" />
          )}

          <div className="flex items-center gap-3">
            <input type="checkbox" id="iyf_pin" checked={form.is_pinned} onChange={e => setForm({ ...form, is_pinned: e.target.checked })} className="w-4 h-4 accent-[#C5A059]" />
            <label htmlFor="iyf_pin" className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Pin to Top</label>
          </div>

          <button type="submit" disabled={isUploading} className="w-full py-4 bg-[#C5A059] text-black font-bold uppercase tracking-widest text-[10px] hover:bg-[#D4B67A] transition-all disabled:opacity-50">
            {isUploading ? "Publishing..." : "Add Update"}
          </button>
        </form>
      </div>
      <div className="xl:col-span-7 space-y-6">
        <h3 className="text-xs uppercase tracking-[0.3em] text-white/20 font-bold mb-4">Live Updates ({updates.length})</h3>
        {isLoading ? <div className="text-white/10 text-center py-20 animate-pulse">LOADING...</div> : updates.map(upd => (
          <div key={upd.id} className="bg-[#0a0a0a] border border-white/5 p-4 flex gap-6 items-center hover:border-white/10 transition-all">
            {upd.type === 'image' ? <img src={upd.content} className="w-20 h-20 object-cover" /> : <div className="w-20 h-20 bg-white/5 flex items-center justify-center text-[8px] uppercase tracking-tighter text-white/20">{upd.type}</div>}
            <div className="flex-1">
              <p className="text-[#C5A059] text-[9px] uppercase tracking-widest font-bold mb-1">{upd.date || 'Update'}</p>
              <p className="text-sm line-clamp-1">{upd.type === 'text' ? upd.content : 'Media Content'}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => togglePin(upd.id, upd.is_pinned)} className={upd.is_pinned ? "text-orange-500" : "text-white/20"}><Pin size={16} fill={upd.is_pinned ? "currentColor" : "none"} /></button>
              <button onClick={() => deleteUpdate(upd.id)} className="text-white/20 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GenericIyfManager({ module }: { module: string }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ category_name: "", date: "", content: "" });

  const fieldMapping: Record<string, string> = {
    yatras: 'yatra_name',
    camps: 'camp_name',
    sankirtan: 'date',
    prasadam: 'event_name',
    classes: 'class_name',
    visits: 'visit_name',
    mega: 'event_name'
  };

  const catField = fieldMapping[module] || 'event_name';
  const apiPath = `/api/iyf/${module === 'mega' ? 'mega-events' : module === 'visits' ? 'vaishnava-visits' : module}`;

  useEffect(() => {
    fetchPosts();
    setForm({ category_name: module === 'prasadam' ? 'Prasadam' : '', date: '', content: '' });
  }, [module]);

  const fetchPosts = async () => {
    setIsLoading(true);
    const res = await fetch(apiPath);
    const data = await res.json();
    const fetchedPosts = data.data || [];
    setPosts(fetchedPosts);
    
    // Auto-fill category from the most recent post
    if (fetchedPosts.length > 0) {
      const lastCategory = fetchedPosts[0][catField];
      if (lastCategory) {
        setForm(prev => ({ ...prev, category_name: lastCategory }));
      }
    }
    setIsLoading(false);
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    setIsUploading(true);
    const payload = {
      [catField]: form.category_name,
      date: form.date,
      type: 'instagram_link',
      content: form.content
    };
    await fetch(apiPath, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    // Keep category and date for adding multiple posts to same event
    setForm(prev => ({ ...prev, content: "" }));
    fetchPosts();
    setIsUploading(false);
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete post?")) return;
    await fetch(apiPath, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchPosts();
  };

  const grouped = useMemo(() => {
    const groups = new Map<string, any[]>();
    posts.forEach(p => {
      const name = p[catField] || (module === 'sankirtan' ? p.date : 'General');
      if (!groups.has(name)) groups.set(name, []);
      groups.get(name)!.push(p);
    });
    return groups;
  }, [posts, catField, module]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
      <div className="xl:col-span-4 bg-[#0a0a0a] border border-white/5 p-8 h-fit shadow-2xl">
        <h3 className="text-lg font-serif text-[#C5A059] mb-8 flex items-center gap-3">
          <Plus size={18} /> Add {module.toUpperCase()} Entry
        </h3>
        <form onSubmit={handleUpload} className="space-y-6">
          {module !== 'sankirtan' && module !== 'prasadam' && (
            <>
              <input type="text" list="category-list" placeholder="Entry Name (e.g. Winter Camp)" value={form.category_name} onChange={e => setForm({ ...form, category_name: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none focus:border-[#C5A059]/50" required />
              <datalist id="category-list">
                {Array.from(grouped.keys()).map(name => (
                  <option key={name} value={name} />
                ))}
              </datalist>
            </>
          )}
          <input type="text" placeholder="Date/Month (Optional)" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none focus:border-[#C5A059]/50" />
          <textarea placeholder="Instagram/Embed Content" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none focus:border-[#C5A059]/50 h-32" required />
          <button type="submit" disabled={isUploading} className="w-full py-4 bg-[#C5A059] text-black font-bold uppercase tracking-widest text-[10px] hover:bg-[#D4B67A] transition-all">
            {isUploading ? "Adding..." : "Submit Entry"}
          </button>
        </form>
      </div>
      <div className="xl:col-span-8 space-y-12">
        {isLoading ? (
          <div className="text-white/10 text-center py-20 animate-pulse uppercase tracking-widest text-xs">Fetching {module} Data...</div>
        ) : grouped.size === 0 ? (
          <div className="py-32 text-center border border-dashed border-white/5 text-white/5 uppercase tracking-widest text-xs">No entries found in this category</div>
        ) : Array.from(grouped.entries()).map(([name, items]) => (
          <div key={name} className="bg-[#0a0a0a] border border-white/5 p-8 shadow-xl">
            <h4 className="text-xl font-serif text-[#C5A059] mb-6 flex items-center justify-between border-b border-white/5 pb-4">
              {name}
              <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{items.length} {items.length === 1 ? 'Post' : 'Posts'}</span>
            </h4>
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold mb-1">{item.date || 'Update'}</p>
                    <p className="text-xs text-white/40 truncate font-mono">{item.content}</p>
                  </div>
                  <button onClick={() => deletePost(item.id)} className="text-white/10 group-hover:text-red-500 transition-colors p-2"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DarshanManager() {
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [images, setImages] = useState<Record<number, { file: File | null, preview: string | null }>>({});
  const [isUploading, setIsUploading] = useState(false);

  const slots = [0, 1, 2, 3, 4, 5, 6, 7];

  const handleUpload = async () => {
    if (Object.keys(images).length === 0) return alert("Select images");
    setIsUploading(true);
    const uploaded: Record<number, string> = {};
    for (const id in images) {
      if (images[id].file) uploaded[id] = await uploadImage(images[id].file!, "darshans") || "";
    }
    const final = slots.map(s => ({ title: `Position ${s + 1}`, url: uploaded[s] || null, type: s }));
    await fetch("/api/darshans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, images: final }),
    });
    setIsUploading(false);
    alert("Darshan Published");
  };

  return (
    <div className="space-y-12">
      <div className="bg-[#0a0a0a] border border-white/5 p-8 w-fit shadow-xl">
        <label className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-4">Select Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="bg-white/5 border border-white/10 p-4 text-white outline-none [color-scheme:dark]" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {slots.map(s => (
          <div key={s} className="bg-[#0a0a0a] border border-white/5 p-4 flex flex-col gap-4 group">
            <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Slot {s + 1}</span>
            <div className="aspect-square bg-white/[0.02] border border-dashed border-white/10 relative overflow-hidden group hover:border-[#C5A059]/30 transition-all cursor-pointer">
              {images[s]?.preview ? <img src={images[s].preview!} className="w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center text-white/10 text-[9px] uppercase tracking-widest">Select Image</div>}
              <input type="file" accept="image/*" onChange={e => {
                const f = e.target.files?.[0];
                if (f) setImages({ ...images, [s]: { file: f, preview: URL.createObjectURL(f) } });
              }} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleUpload} disabled={isUploading} className="px-12 py-5 bg-[#C5A059] text-black font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all shadow-2xl shadow-[#C5A059]/20">
        {isUploading ? "Publishing..." : "Publish Daily Darshan"}
      </button>
    </div>
  );
}

function FestiveDarshanManager() {
  const [items, setItems] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ title: "", date: "" });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    const res = await fetch("/api/festive-darshans");
    const data = await res.json();
    console.log("Festive Darshans Fetch Result:", data);
    setItems(data.data || []);
    setIsLoading(false);
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    if (!file) return;
    setIsUploading(true);
    const url = await uploadImage(file, "darshans");
    await fetch("/api/festive-darshans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        festival_name: form.title,
        date: form.date,
        images: [{ url, title: form.title }]
      }),
    });
    setForm({ title: "", date: "" });
    setFile(null);
    fetchItems();
    setIsUploading(false);
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete festive darshan?")) return;
    await fetch("/api/festive-darshans", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchItems();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
      <div className="xl:col-span-4 bg-[#0a0a0a] border border-white/5 p-8 h-fit shadow-2xl">
        <h3 className="text-lg font-serif text-[#C5A059] mb-8 flex items-center gap-3">
          <Plus size={18} /> Add Festive Darshan
        </h3>
        <form onSubmit={handleUpload} className="space-y-6">
          <input type="text" placeholder="Festival Name" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none focus:border-[#C5A059]/50" required />
          <input type="text" placeholder="Date/Year" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none focus:border-[#C5A059]/50" />
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none" required />
          <button type="submit" disabled={isUploading} className="w-full py-4 bg-[#C5A059] text-black font-bold uppercase tracking-widest text-[10px] hover:bg-[#D4B67A] transition-all shadow-xl">
            {isUploading ? "Uploading..." : "Upload Festive Darshan"}
          </button>
        </form>
      </div>
      <div className="xl:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading ? <div className="col-span-full text-white/10 text-center py-20 animate-pulse">LOADING...</div> : items.map(item => (
          <div key={item.id} className="bg-[#0a0a0a] border border-white/5 p-4 group relative hover:border-white/10 transition-all">
            <img src={item.images?.[0]?.url || item.image_url} className="w-full aspect-[4/5] object-cover mb-4" />
            <h4 className="text-xs font-serif text-[#C5A059]">{item.festival_name}</h4>
            <p className="text-[10px] text-white/20 uppercase tracking-widest">{item.date}</p>
            <button onClick={() => deleteItem(item.id)} className="absolute top-6 right-6 p-2 bg-black/60 text-white/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomeSankirtanManager() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ date: "", content: "", is_pinned: false });

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    const res = await fetch("/api/iyf/home-sankirtan");
    const data = await res.json();
    setPosts(data.data || []);
    setIsLoading(false);
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    setIsUploading(true);
    await fetch("/api/iyf/home-sankirtan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, type: 'instagram_link' }),
    });
    setForm({ ...form, content: "", is_pinned: false });
    fetchPosts();
    setIsUploading(false);
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete post?")) return;
    await fetch("/api/iyf/home-sankirtan", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchPosts();
  };

  const togglePin = async (id: string, pinned: boolean) => {
    await fetch("/api/iyf/home-sankirtan", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, is_pinned: !pinned }) });
    fetchPosts();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
      <div className="xl:col-span-4 bg-[#0a0a0a] border border-white/5 p-8 h-fit shadow-2xl">
        <h3 className="text-lg font-serif text-[#C5A059] mb-8 flex items-center gap-3">
          <Plus size={18} /> Add Home Sankirtan
        </h3>
        <form onSubmit={handleUpload} className="space-y-6">
          <input type="text" placeholder="Date (e.g. 15th Aug) - Optional" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none focus:border-[#C5A059]/50" />
          <textarea placeholder="Instagram Embed/Link" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none focus:border-[#C5A059]/50 h-32" required />
          <div className="flex items-center gap-3">
            <input type="checkbox" id="hs_pin" checked={form.is_pinned} onChange={e => setForm({ ...form, is_pinned: e.target.checked })} className="w-4 h-4 accent-[#C5A059]" />
            <label htmlFor="hs_pin" className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Pin to Gallery</label>
          </div>
          <button type="submit" disabled={isUploading} className="w-full py-4 bg-[#C5A059] text-black font-bold uppercase tracking-widest text-[10px] hover:bg-[#D4B67A] transition-all">
            {isUploading ? "Adding..." : "Submit Post"}
          </button>
        </form>
      </div>
      <div className="xl:col-span-8 space-y-6">
        {isLoading ? (
          <div className="text-white/10 text-center py-20 animate-pulse">LOADING...</div>
        ) : posts.length === 0 ? (
          <div className="py-32 text-center border border-dashed border-white/5 text-white/5">No programs archived yet</div>
        ) : posts.map(post => (
          <div key={post.id} className="bg-[#0a0a0a] border border-white/5 p-4 flex gap-6 items-center hover:border-white/10 transition-all">
             <div className="w-16 h-16 bg-white/5 flex items-center justify-center text-[#C5A059]">
               <Camera size={20} />
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-[#C5A059] text-[9px] uppercase tracking-widest font-bold mb-1">{post.date || 'Program'}</p>
               <p className="text-xs text-white/40 truncate font-mono">{post.content}</p>
             </div>
             <div className="flex gap-2">
               <button onClick={() => togglePin(post.id, post.is_pinned)} className={post.is_pinned ? "text-orange-500" : "text-white/20"}><Pin size={16} fill={post.is_pinned ? "currentColor" : "none"} /></button>
               <button onClick={() => deletePost(post.id)} className="text-white/20 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IgfClassesManager() {
  const [items, setItems] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ class_type: "sunday", type: "instagram_link", content: "", is_pinned: false });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    const res = await fetch("/api/igf/classes");
    const data = await res.json();
    setItems(data.data || []);
    setIsLoading(false);
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    setIsUploading(true);
    await fetch("/api/igf/classes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ ...form, content: "", is_pinned: false });
    fetchItems();
    setIsUploading(false);
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete media?")) return;
    await fetch("/api/igf/classes", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchItems();
  };

  const togglePin = async (id: string, pinned: boolean) => {
    await fetch("/api/igf/classes", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, is_pinned: !pinned }) });
    fetchItems();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
      <div className="xl:col-span-4 bg-[#0a0a0a] border border-white/5 p-8 h-fit shadow-2xl">
        <h3 className="text-lg font-serif text-[#C5A059] mb-8 flex items-center gap-3">
          <Plus size={18} /> Add Class Media
        </h3>
        <form onSubmit={handleUpload} className="space-y-6">
          <select value={form.class_type} onChange={e => setForm({ ...form, class_type: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none appearance-none">
            <option value="sunday">Sunday Class</option>
          </select>
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none appearance-none">
            <option value="instagram_link">Instagram Link</option>
            <option value="image">Image URL</option>
            <option value="video">Video URL</option>
          </select>
          <textarea placeholder="Content URL / Link" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none focus:border-[#C5A059]/50 h-32" required />
          <div className="flex items-center gap-3">
            <input type="checkbox" id="igfc_pin" checked={form.is_pinned} onChange={e => setForm({ ...form, is_pinned: e.target.checked })} className="w-4 h-4 accent-[#C5A059]" />
            <label htmlFor="igfc_pin" className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Pin to Display</label>
          </div>
          <button type="submit" disabled={isUploading} className="w-full py-4 bg-[#C5A059] text-black font-bold uppercase tracking-widest text-[10px] hover:bg-[#D4B67A] transition-all">
            {isUploading ? "Adding..." : "Add to Class"}
          </button>
        </form>
      </div>
      <div className="xl:col-span-8 space-y-12">
        {['sunday', 'lilamrta'].map(type => (
          <div key={type}>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold mb-6">{type.toUpperCase()} CLASS MEDIA</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.filter(i => i.class_type === type).map(item => (
                <div key={item.id} className="bg-[#0a0a0a] border border-white/5 p-2 relative group">
                  <div className="aspect-square bg-white/5 mb-2 overflow-hidden flex items-center justify-center">
                    {item.type === 'instagram_link' ? <Camera size={24} className="text-white/10" /> : <img src={item.content} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-[8px] uppercase text-white/20">{item.type}</span>
                     <div className="flex gap-2">
                       <button onClick={() => togglePin(item.id, item.is_pinned)} className={item.is_pinned ? "text-orange-500" : "text-white/20"}><Pin size={14} fill={item.is_pinned ? "currentColor" : "none"} /></button>
                       <button onClick={() => deleteItem(item.id)} className="text-white/10 hover:text-red-500"><Trash2 size={14} /></button>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IgfActivitiesManager() {
  const [items, setItems] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ date: "", type: "instagram_link", content: "", is_pinned: false });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    const res = await fetch("/api/igf/activities");
    const data = await res.json();
    setItems(data.data || []);
    setIsLoading(false);
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    setIsUploading(true);
    await fetch("/api/igf/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ ...form, content: "", is_pinned: false });
    fetchItems();
    setIsUploading(false);
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete activity?")) return;
    await fetch("/api/igf/activities", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchItems();
  };

  const togglePin = async (id: string, pinned: boolean) => {
    await fetch("/api/igf/activities", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, is_pinned: !pinned }) });
    fetchItems();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
      <div className="xl:col-span-4 bg-[#0a0a0a] border border-white/5 p-8 h-fit shadow-2xl">
        <h3 className="text-lg font-serif text-[#C5A059] mb-8 flex items-center gap-3">
          <Plus size={18} /> Add Activity
        </h3>
        <form onSubmit={handleUpload} className="space-y-6">
          <input type="text" placeholder="Date (Optional)" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none focus:border-[#C5A059]/50" />
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none appearance-none">
            <option value="instagram_link">Instagram Link</option>
            <option value="image">Image URL</option>
            <option value="video">Video URL</option>
          </select>
          <textarea placeholder="Content URL / Link" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none focus:border-[#C5A059]/50 h-32" required />
          <div className="flex items-center gap-3">
            <input type="checkbox" id="igfa_pin" checked={form.is_pinned} onChange={e => setForm({ ...form, is_pinned: e.target.checked })} className="w-4 h-4 accent-[#C5A059]" />
            <label htmlFor="igfa_pin" className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Pin Highlight</label>
          </div>
          <button type="submit" disabled={isUploading} className="w-full py-4 bg-[#C5A059] text-black font-bold uppercase tracking-widest text-[10px] hover:bg-[#D4B67A] transition-all">
            {isUploading ? "Adding..." : "Add Activity"}
          </button>
        </form>
      </div>
      <div className="xl:col-span-8 space-y-6">
        {isLoading ? (
          <div className="text-white/10 text-center py-20 animate-pulse">LOADING...</div>
        ) : items.length === 0 ? (
          <div className="py-32 text-center border border-dashed border-white/5 text-white/5">No activities yet</div>
        ) : items.map(item => (
          <div key={item.id} className="bg-[#0a0a0a] border border-white/5 p-4 flex gap-6 items-center hover:border-white/10 transition-all">
             <div className="w-16 h-16 bg-white/5 flex items-center justify-center text-[#C5A059]">
               {item.type === 'video' ? <Play size={20} /> : <Camera size={20} />}
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-[#C5A059] text-[9px] uppercase tracking-widest font-bold mb-1">{item.date || 'Activity'}</p>
               <p className="text-xs text-white/40 truncate font-mono">{item.content}</p>
             </div>
             <div className="flex gap-2">
               <button onClick={() => togglePin(item.id, item.is_pinned)} className={item.is_pinned ? "text-orange-500" : "text-white/20"}><Pin size={16} fill={item.is_pinned ? "currentColor" : "none"} /></button>
               <button onClick={() => deleteItem(item.id)} className="text-white/20 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesManager() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    setMessages(data || []);
    setIsLoading(false);
  };

  const deleteMsg = async (id: string) => {
    if (!confirm("Delete message?")) return;
    await supabase.from("contact_messages").delete().eq("id", id);
    fetchMessages();
    setSelected(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[70vh]">
      <div className="lg:col-span-4 overflow-y-auto space-y-4 pr-4 custom-scrollbar">
        {isLoading ? <div className="text-white/10 animate-pulse py-10 text-center">Loading Messages...</div> : messages.length === 0 ? <div className="text-white/5 uppercase tracking-widest text-[10px] text-center py-20">No Messages</div> : messages.map(msg => (
          <div key={msg.id} onClick={() => setSelected(msg)} className={`p-6 border cursor-pointer transition-all ${selected?.id === msg.id ? 'bg-[#C5A059]/10 border-[#C5A059]/40 shadow-lg shadow-[#C5A059]/5' : 'bg-white/[0.02] border-white/5 hover:border-white/20'}`}>
            <h4 className={`text-sm font-serif mb-1 ${selected?.id === msg.id ? 'text-[#C5A059]' : 'text-white'}`}>{msg.name}</h4>
            <p className="text-[10px] uppercase tracking-widest text-white/40 line-clamp-1">{msg.subject}</p>
          </div>
        ))}
      </div>
      <div className="lg:col-span-8 bg-[#0a0a0a] border border-white/5 p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 blur-[100px] -translate-y-1/2 translate-x-1/2" />
        {selected ? (
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold mb-2">{new Date(selected.created_at).toLocaleString()}</p>
                <h3 className="text-3xl font-serif text-white mb-2">{selected.subject}</h3>
                <p className="text-xs text-white/40">{selected.name} • {selected.email}</p>
              </div>
              <button onClick={() => deleteMsg(selected.id)} className="p-4 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={20} /></button>
            </div>
            <div className="bg-white/[0.03] p-10 border border-white/5 min-h-[240px] text-white/80 leading-relaxed italic text-lg font-serif">"{selected.message}"</div>
            <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="mt-12 inline-block px-10 py-4 bg-[#C5A059] text-black font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all shadow-xl shadow-[#C5A059]/10">
              <Mail size={16} />
              Reply via Email
            </a>
          </div>
        ) : <div className="h-full flex items-center justify-center text-white/5 uppercase tracking-[0.5em] text-[10px]">Select a message to view content</div>}
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(197, 160, 89, 0.2); }
      `}</style>
    </div>
  );
}

