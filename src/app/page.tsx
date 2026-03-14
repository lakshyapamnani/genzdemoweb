"use client";

import { useRef } from "react";
import { useScroll, MotionValue } from "framer-motion";
import Scene from "@/components/Scene";
import { Navbar } from "@/components/Navbar";
import { TextSection } from "@/components/TextSection";
import { ProductSection } from "@/components/ProductSection";
import { Cart } from "@/components/Cart";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  }); 

  return (
    <main className="bg-[#050505] min-h-screen text-white/90 font-sans selection:bg-[#0050FF]/30">
      <Navbar />
      <Cart />
      
      {/* Scroll container defining the scroll length */}
      <div ref={containerRef} className="relative h-[600vh]">
        
        {/* Sticky Background with Canvas */}
        <div className="sticky top-0 h-screen overflow-hidden">
          <Scene scrollYProgress={scrollYProgress} />
          {/* Subtle radial gradient overlay */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050505]/20 to-[#050505]/80 pointer-events-none" />
          
          {/* MASSIVE ZENVY HEADER */}
          <div className="absolute inset-0 top-1/2 -translate-y-1/2 w-full flex items-center justify-center pointer-events-none z-20 mix-blend-overlay">
             <h1 className="text-[18vw] font-black text-white tracking-tighter leading-none select-none opacity-80">
                ZENVY
             </h1>
          </div>
        </div>

        {/* Text Sections - Overlay */}
        
        {/* Hero Section 0-15% */}
        <TextSection scrollYProgress={scrollYProgress} start={0} end={0.15}>
          <div className="text-center space-y-4">
             <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase">
               ZENVY STUDIO
             </h1>
             <p className="text-xl text-white/60 tracking-tight font-light">
               Minimal design. Maximum presence.
             </p>
             <p className="text-sm text-white/40 uppercase tracking-widest mt-4">
               Precision Cut Streetwear
             </p>
          </div>
        </TextSection>

        {/* Design Reveal 15-40% */}
        <TextSection scrollYProgress={scrollYProgress} start={0.15} end={0.4} className="justify-start pl-[5%] md:pl-[10%]">
          <div className="max-w-md text-left space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Designed with Intention.
            </h2>
            <div className="space-y-4 text-white/60 text-lg leading-relaxed font-light">
              <p>Every panel is precision cut for balance and drape.</p>
              <p>Oversized proportions meet tailored structure.</p>
              <p>Streetwear comfort meets studio craftsmanship.</p>
            </div>
          </div>
        </TextSection>

        {/* Fabric & Material 40-65% */}
        <TextSection scrollYProgress={scrollYProgress} start={0.4} end={0.65} className="justify-end pr-[5%] md:pr-[10%]">
          <div className="max-w-md text-right space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Premium Fabric Engineering.
            </h2>
            <ul className="space-y-4 text-white/60 text-lg font-light">
              <li className="flex justify-end gap-3 items-center">
                <span>Heavyweight breathable cotton</span>
                <span className="w-2 h-2 bg-[#0050FF] rounded-full"></span>
              </li>
              <li className="flex justify-end gap-3 items-center">
                <span>Reinforced stitching built to last</span>
                <span className="w-2 h-2 bg-[#00D6FF] rounded-full"></span>
              </li>
              <li className="flex justify-end gap-3 items-center">
                <span>Fabric that moves naturally with the body</span>
                <span className="w-2 h-2 bg-white/20 rounded-full"></span>
              </li>
            </ul>
          </div>
        </TextSection>

        {/* Graphic & Detail 65-85% */}
        <TextSection scrollYProgress={scrollYProgress} start={0.65} end={0.85}>
           <div className="text-center space-y-8 max-w-2xl">
             <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
               Statement Graphics.
             </h2>
             <p className="text-white/60 text-lg leading-relaxed font-light">
               Bold sleeve artwork applied with precision printing. <br/>
               Designed to stand out without compromising comfort.
             </p>
             <div className="text-sm font-mono text-[#0050FF] uppercase tracking-widest">
               [ High Density Print Layer ]
             </div>
           </div>
        </TextSection>

        {/* Reassembly 85-100% */}
        <TextSection scrollYProgress={scrollYProgress} start={0.85} end={1}>
           {/* Empty to allow clear view of reassembled product before scrolling to shop */}
        </TextSection>
      
      </div>

      <ProductSection />
      
      <footer className="relative z-40 h-[50vh] flex flex-col items-center justify-center bg-[#050505] text-white/40 space-y-4 border-t border-white/5">
         <p className="uppercase tracking-widest text-xs">End of Experience</p>
         <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent"></div>
         <p className="text-sm">© 2026 STUDIO TEE. Designed by GitHub Copilot.</p>
      </footer>
    </main>
  );
}
