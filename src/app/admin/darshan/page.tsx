"use client";

import React, { useState, useEffect } from "react";
import { supabase, uploadImage } from "@/lib/supabase";
import { useRouter } from "next/navigation";

// Define the schema for our Darshan Upload Slots
const SLOTS = [
  { id: 0, title: "Position 1" },
  { id: 1, title: "Position 2" },
  { id: 2, title: "Position 3" },
  { id: 4, title: "Position 5" },
  { id: 3, title: "Position 4" },
  { id: 5, title: "Position 6" },
  { id: 6, title: "Position 7" },
  { id: 7, title: "Position 8" },
];

export default function AdminDarshanUpload() {
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [images, setImages] = useState<Record<number, { file: File | null; previewUrl: string | null }>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  // Protect the route
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

  const handleFileChange = (slotId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImages((prev) => ({
        ...prev,
        [slotId]: { file, previewUrl: URL.createObjectURL(file) },
      }));
    }
  };

  const handleUpload = async () => {
    if (!date) return alert("Please select a date!");

    // Check if at least one image is uploaded
    if (Object.keys(images).length === 0) {
      return alert("Upload at least one image.");
    }

    setIsUploading(true);

    try {
      const uploadedImageUrls: Record<number, string> = {};

      for (const slotId in images) {
        const slot = images[slotId];
        if (slot.file) {
          const url = await uploadImage(slot.file, "darshans");
          if (url) {
            uploadedImageUrls[Number(slotId)] = url;
          }
        }
      }

      // Convert mapping array for the database JSONB structure
      const finalImagesArray = SLOTS.map((slot) => ({
        title: slot.title,
        url: uploadedImageUrls[slot.id] || null, // Allow null if not set
        type: slot.id,
      }));

      // API Call to /api/darshans
      const res = await fetch("/api/darshans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: date,
          images: finalImagesArray,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save to database");
      }

      alert("Successfully published Darshan!");
      router.push("/daily-darshan"); // Redirect to the frontend gallery
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
            <h1 className="text-4xl text-[#C5A059] font-serif mb-2">Publish Daily Darshan</h1>
            <p className="text-white/60 text-sm">Upload images to specific slots for the gallery.</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/admin/festive-darshan')}
              className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-[#C5A059]/40 bg-[#C5A059]/5 text-[#C5A059] rounded-none hover:bg-[#C5A059]/10 transition-colors"
            >
              Festive Darshans
            </button>
            <button
              onClick={() => router.push('/admin/events')}
              className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-none hover:border-[#C5A059]/40 transition-colors"
            >
              Manage Events
            </button>
          </div>
        </header>

        <div className="bg-[#121212] p-8 rounded-none border border-white/5 mb-10 w-fit shrink-0">
          <label className="block text-sm font-semibold uppercase tracking-widest text-[#C5A059] mb-4">
            Darshan Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-none p-3 text-white focus:outline-none focus:border-[#C5A059] outline-none w-[200px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 mb-12">
          {SLOTS.map((slot) => (
            <div key={slot.id} className="bg-[#121212] border border-white/5 rounded-none p-4 flex flex-col group">
              <h3 className="text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-4">{slot.title}</h3>

              <div
                className="relative flex-grow bg-black/40 border-2 border-dashed border-white/10 rounded-none flex items-center justify-center overflow-hidden transition-colors group-hover:border-[#C5A059]/40 min-h-[160px] aspect-square"
              >
                {images[slot.id]?.previewUrl ? (
                  <img
                    src={images[slot.id]?.previewUrl!}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white/30 text-xs">Drop Image</span>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(slot.id, e)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end border-t border-white/10 pt-8">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="px-10 py-4 bg-[#C5A059] text-black font-bold uppercase tracking-[0.3em] rounded-none hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isUploading ? "Publishing..." : "Publish Darshan"}
          </button>
        </div>
      </div>
    </div>
  );
}
