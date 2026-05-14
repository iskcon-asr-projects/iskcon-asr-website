"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  User, 
  Calendar, 
  Trash2, 
  ChevronRight, 
  MessageSquare,
  Search
} from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const router = useRouter();

  // Protect the route
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        fetchMessages();
      }
    });
  }, [router]);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching messages:", error);
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error deleting message");
    } else {
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    }
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && messages.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#C5A059]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#C5A059] border-t-transparent rounded-none animate-spin" />
          <span className="uppercase tracking-[0.2em] text-xs">Loading Messages...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-12 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="text-[#C5A059]" size={24} />
              <h1 className="text-4xl text-[#C5A059] font-serif">Inquiry Inbox</h1>
            </div>
            <p className="text-white/40 text-sm tracking-wide">Manage messages from the contact form.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
              <input 
                type="text" 
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-none py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-[#C5A059]/50 w-full md:w-[300px] transition-all"
              />
            </div>
            <button 
              onClick={() => router.push('/admin/darshan')}
              className="text-[10px] uppercase tracking-[0.2em] px-6 py-3 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-all whitespace-nowrap"
            >
              Back to Dashboard
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* MESSAGE LIST */}
          <div className="lg:col-span-5 space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-none">
                <p className="text-white/20 uppercase tracking-widest text-xs">No messages found</p>
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <div 
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-5 rounded-none border transition-all cursor-pointer group relative ${
                    selectedMessage?.id === msg.id 
                      ? "bg-[#C5A059]/10 border-[#C5A059]/40 shadow-[0_0_20px_rgba(197,160,89,0.1)]" 
                      : "bg-white/[0.02] border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-serif text-lg ${selectedMessage?.id === msg.id ? "text-[#C5A059]" : "text-white"}`}>
                      {msg.name}
                    </h3>
                    <span className="text-[10px] text-white/30 uppercase tracking-tighter">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-3 line-clamp-1">
                    {msg.subject}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-white/40 flex items-center gap-1">
                      <Mail size={12} /> {msg.email}
                    </span>
                    <ChevronRight size={16} className={`transition-transform ${selectedMessage?.id === msg.id ? "translate-x-1 text-[#C5A059]" : "text-white/20"}`} />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* MESSAGE VIEW */}
          <div className="lg:col-span-7">
            {selectedMessage ? (
              <div className="bg-[#121212] border border-white/10 rounded-none p-8 md:p-12 sticky top-8 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 blur-[100px] rounded-none -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <div className="flex items-center gap-2 text-[#C5A059] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
                        <Calendar size={14} />
                        {new Date(selectedMessage.created_at).toLocaleString()}
                      </div>
                      <h2 className="text-3xl font-serif text-white mb-2">{selectedMessage.subject}</h2>
                    </div>
                    <button 
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="p-3 rounded-none bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      title="Delete Message"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white/5 p-4 rounded-none border border-white/5">
                      <p className="text-[#C5A059] text-[9px] uppercase tracking-widest font-bold mb-1">Sender</p>
                      <p className="text-white flex items-center gap-2">
                        <User size={14} className="text-white/30" /> {selectedMessage.name}
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-none border border-white/5">
                      <p className="text-[#C5A059] text-[9px] uppercase tracking-widest font-bold mb-1">Email</p>
                      <a href={`mailto:${selectedMessage.email}`} className="text-white flex items-center gap-2 hover:text-[#C5A059] transition-colors">
                        <Mail size={14} className="text-white/30" /> {selectedMessage.email}
                      </a>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[#C5A059] text-[9px] uppercase tracking-widest font-bold">Message Content</p>
                    <div className="bg-white/[0.03] p-8 rounded-none border border-white/5 min-h-[200px]">
                      <p className="text-white/80 leading-relaxed whitespace-pre-wrap italic">
                        "{selectedMessage.message}"
                      </p>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/5">
                    <a 
                      href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-[#C5A059] text-black font-bold uppercase tracking-[0.3em] text-xs rounded-none hover:bg-white transition-all shadow-xl shadow-[#C5A059]/10"
                    >
                      <Mail size={16} />
                      Reply via Email
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white/[0.02] border border-dashed border-white/10 rounded-none p-12 text-center">
                <div className="w-20 h-20 rounded-none bg-white/5 flex items-center justify-center text-white/20 mb-6">
                  <MessageSquare size={32} />
                </div>
                <h3 className="text-white/40 font-serif text-xl uppercase tracking-widest mb-2">Select a message</h3>
                <p className="text-white/20 text-sm">Choose an inquiry from the list to view its details.</p>
              </div>
            )}
          </div>

        </div>

      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(197, 160, 89, 0.2);
          border-radius: 0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(197, 160, 89, 0.4);
        }
      `}</style>
    </div>
  );
}
