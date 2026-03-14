"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextSectionProps {
  children: React.ReactNode;
  className?: string;
  scrollYProgress: MotionValue<number>;
  start: number; // 0-1
  end: number; // 0-1
}

export function TextSection({ children, className, scrollYProgress, start, end }: TextSectionProps) {
  // Fade in at start, fade out at end
  // Need a 4-point interpolation: [start, start + fade, end - fade, end] -> [0, 1, 1, 0]
  // Let's assume a 10% fade duration relative to the total length, or fix it.
  
  const fadeDuration = 0.05; // 5% of scroll
  
  const opacity = useTransform(
    scrollYProgress,
    [start, start + fadeDuration, end - fadeDuration, end],
    [0, 1, 1, 0]
  );
  
  const y = useTransform(
    scrollYProgress,
    [start, end],
    [50, -50]
  );
  
  // Make pointer events none when not visible to avoid blocking clicks?
  // Or just z-index management.
  
  return (
    <motion.div
      style={{ opacity, y }}
      className={cn("fixed inset-0 z-30 flex items-center justify-center pointer-events-none", className)}
    >
      <div className="max-w-4xl w-full px-6 pointer-events-auto">
        {children}
      </div>
    </motion.div>
  );
}
