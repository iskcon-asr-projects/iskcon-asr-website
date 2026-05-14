import React, { Suspense } from "react";
import FestiveDarshanContent from "./FestiveDarshanContent";

export const dynamic = "force-dynamic";

export default function FestiveDarshanPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#050505] min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-white/10 border-t-[#C5A059] rounded-none animate-spin"></div>
      </div>
    }>
      <FestiveDarshanContent />
    </Suspense>
  );
}
