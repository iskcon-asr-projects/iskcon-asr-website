"use client";

import React, { useState, useEffect } from "react";
import { supabase, uploadImage } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { X, Image as ImageIcon } from "lucide-react";

export default function AdminFestiveDarshanUpload() {
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [festivalName, setFestivalName] = useState("");
  const [images, setImages] = useState<{ id: string; file: File; previewUrl: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/admin/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newFiles]);
    }
  };

  const removeImage = (idToRemove: string) => {
    setImages((prev) => prev.filter((img) => img.id !== idToRemove));
  };

  const handleUpload = async () => {
    if (!date) return alert("Please select a date!");
    if (!festivalName.trim()) return alert("Please enter the festival name!");
    if (images.length === 0) return alert("Upload at least one image.");

    setIsUploading(true);

    try {
      const uploadedImagesArray = [];

      for (const img of images) {
        const url = await uploadImage(img.file, "darshans");
        if (url) {
          uploadedImagesArray.push({
            url,
            title: festivalName // Defaulting title to the festival name
          });
        }
      }

      const res = await fetch("/api/festive-darshans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: date,
          festival_name: festivalName,
          images: uploadedImagesArray,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save to database");
      }

      alert("Successfully published Festive Darshan!");
      // Reset form
      setDate(new Date().toISOString().split("T")[0]);
      setFestivalName("");
      setImages([]);
    } catch (error) {
      console.error(error);
      alert("Error occurred during upload. Check console.");
    } finally {
      setIsUploading(false);
    }
  };

  if (isCheckingAuth) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#C5A059]">Verifying Admin Access...</div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 md:p-12 font-sans relative">
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push('/admin/login');
        }}
        className="absolute top-8 right-12 text-white/50 hover:text-red-400 text-sm tracking-widest uppercase transition-colors"
      >
        Sign Out
      </button>

      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl text-[#C5A059] font-serif mb-2">Publish Festive Darshan</h1>
            <p className="text-white/60 text-sm">Upload an unlimited number of images for special festival days.</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/admin/darshan')}
              className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors"
            >
              Manage Daily Darshans
            </button>
            <button
              onClick={() => router.push('/admin/events')}
              className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors"
            >
              Manage Events
            </button>
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-6 mb-10 w-full">
          <div className="bg-[#121212] p-8 rounded-none border border-white/5 flex-grow">
            <label className="block text-sm font-semibold uppercase tracking-widest text-[#C5A059] mb-4">
              Festival Name
            </label>
            <input
              type="text"
              placeholder="e.g. Gaura Purnima"
              value={festivalName}
              onChange={(e) => setFestivalName(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-none p-3 text-white focus:outline-none focus:border-[#C5A059] outline-none w-full"
            />
          </div>

          <div className="bg-[#121212] p-8 rounded-none border border-white/5 shrink-0">
            <label className="block text-sm font-semibold uppercase tracking-widest text-[#C5A059] mb-4">
              Darshan Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-none p-3 text-white focus:outline-none focus:border-[#C5A059] outline-none w-full md:w-[200px]"
            />
          </div>
        </div>

        <div className="mb-6 flex justify-between items-end">
          <h2 className="text-[#C5A059] text-lg font-serif">Uploaded Images ({images.length})</h2>

          <div className="relative">
            <button className="flex items-center gap-2 px-6 py-3 bg-[#121212] border border-white/10 hover:border-[#C5A059]/50 transition-colors rounded-none text-sm font-semibold uppercase tracking-wider">
              <ImageIcon size={16} />
              Add Images
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-12">
          {images.map((img) => (
            <div key={img.id} className="relative group bg-[#121212] border border-white/5 rounded-none aspect-square overflow-hidden">
              <img
                src={img.previewUrl}
                alt="preview"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => removeImage(img.id)}
                  className="p-3 bg-red-500/80 hover:bg-red-600 rounded-none text-white backdrop-blur-sm transition-transform hover:scale-110"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-white/10 rounded-none text-white/30">
              No images uploaded yet. Click &quot;Add Images&quot; to start.
            </div>
          )}
        </div>

        <div className="flex justify-end border-t border-white/10 pt-8">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="px-10 py-4 bg-[#C5A059] text-black font-bold uppercase tracking-[0.3em] rounded-none hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isUploading ? "Publishing..." : "Publish Festive Darshan"}
          </button>
        </div>
      </div>
    </div>
  );
}
