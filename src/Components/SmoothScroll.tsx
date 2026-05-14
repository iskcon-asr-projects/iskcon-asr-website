"use client";

import { ReactLenis } from "lenis/react";
import React, { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import CustomCursor from "@/Components/CustomCursor";
import ErrorBoundary from "@/Components/ErrorBoundary";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
      }}
    >
      <div className="flex flex-col w-full min-h-screen">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </div>
    </ReactLenis>
  );
}


