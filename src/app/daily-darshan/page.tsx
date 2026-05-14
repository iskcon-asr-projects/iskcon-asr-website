import React, { Suspense } from "react";
import DailyDarshanContent from "./DailyDarshanContent";

export const dynamic = "force-dynamic";

export default function DailyDarshanPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#050505] min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-white/10 border-t-[#C5A059] rounded-none animate-spin"></div>
      </div>
    }>
      <DailyDarshanContent />
    </Suspense>
  );
}
