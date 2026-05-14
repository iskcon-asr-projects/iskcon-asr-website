"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggeredEntryProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function StaggeredEntry({ children, delay = 0, className = "" }: StaggeredEntryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.21, 0.45, 0.32, 0.9] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
