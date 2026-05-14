"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hasMouse, setHasMouse] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Spring physics for the ring (creates the trailing effect)
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(0, springConfig);
  const cursorYSpring = useSpring(0, springConfig);

  useEffect(() => {
    // Detect if device has a mouse
    const checkMouse = () => {
      if (window.matchMedia("(pointer: fine)").matches) {
        setHasMouse(true);
      }
    };
    checkMouse();
    window.addEventListener("resize", checkMouse);

    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      cursorXSpring.set(e.clientX);
      cursorYSpring.set(e.clientY);
    };

    // Detect hovering over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    if (hasMouse) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      window.removeEventListener("resize", checkMouse);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [hasMouse, cursorXSpring, cursorYSpring]);

  if (!hasMouse) return null;

  return (
    <>
      {/* 
        We hide the default cursor everywhere except on elements we explicitly style,
        but since we want this cursor to be global, we use global CSS (see globals.css updates later).
      */}
      
      {/* Central glow dot (instantly follows mouse) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#E2C792] rounded-none pointer-events-none z-[9999] shadow-[0_0_8px_2px_rgba(197,160,89,0.8)] mix-blend-screen"
        style={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
        }}
        variants={{
          default: { scale: 1 },
          hover: { scale: 0 },
        }}
        animate={isHovering ? "hover" : "default"}
        transition={{ duration: 0.2 }}
      />

      {/* Trailing larger ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-[#C5A059]/60 rounded-none pointer-events-none z-[9999] mix-blend-screen flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          default: { 
            scale: 1, 
            backgroundColor: "rgba(197,160,89,0)",
            boxShadow: "0 0 0 rgba(197,160,89,0)"
          },
          hover: { 
            scale: 1.5, 
            backgroundColor: "rgba(197,160,89,0.1)",
            borderColor: "rgba(197,160,89,0.9)",
            boxShadow: "0 0 20px rgba(197,160,89,0.4)"
          },
        }}
        animate={isHovering ? "hover" : "default"}
        transition={{ duration: 0.2 }}
      >
      </motion.div>
    </>
  );
}
