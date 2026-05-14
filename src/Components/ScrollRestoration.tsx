"use client";

import { useEffect } from "react";

/**
 * Small client-side component to disable the browser's default scroll restoration.
 * This prevents the browser from trying to jump to previous positions during
 * navigation transitions, which is essential for smooth Lenis/Framer Motion integration.
 */
export default function ScrollRestoration() {
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  return null;
}
