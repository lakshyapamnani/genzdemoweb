"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 240;

export default function Scene({ scrollYProgress }: { scrollYProgress: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Map scroll (0 to 1) to frame index (0 to FRAME_COUNT - 1)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const promises = [];

      for (let i = 1; i <= FRAME_COUNT; i++) {
        const promise = new Promise<void>((resolve, reject) => {
          const img = new Image();
          const paddedIndex = i.toString().padStart(3, "0");
          
          img.onload = () => {
            loadedImages[i - 1] = img;
            resolve();
          };
          
          img.onerror = () => {
             console.error(`Failed to load frame ${i}`);
             // Resolve anyway to prevent full failure
             resolve();
          };

          img.src = `/frames/ezgif-frame-${paddedIndex}.jpg`;
        });
        promises.push(promise);
      }

      await Promise.all(promises);
      setImages(loadedImages);
      setIsLoaded(true);
    };

    loadImages();
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !images[index]) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];

    // Maintain aspect ratio and cover
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      drawHeight = canvasHeight;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isLoaded) {
      const index = Math.round(latest);
      // Ensure index is within bounds
      const safeIndex = Math.min(Math.max(index, 0), FRAME_COUNT - 1);
      requestAnimationFrame(() => renderFrame(safeIndex));
    }
  });

  // Handle resize and initial render
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Re-render current frame
        const currentFrame = Math.round(frameIndex.get());
        if (isLoaded) renderFrame(Math.min(Math.max(currentFrame, 0), FRAME_COUNT - 1));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial size

    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, frameIndex]); // Re-run when loaded

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover bg-[#050505] z-0"
      />
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#050505] text-white/50 font-mono text-sm tracking-widest">
           LOADING ASSETS...
        </div>
      )}
    </>
  );
}
