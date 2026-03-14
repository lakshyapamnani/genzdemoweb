"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const links = [
  { name: "Overview", href: "#overview" },
  { name: "Design", href: "#design" },
  { name: "Fabric", href: "#fabric" },
  { name: "Craft", href: "#craft" },
  { name: "Specs", href: "#specs" },
  { name: "Shop", href: "#shop" },
];

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { openCart, itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300",
        "bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg"
      )}
    >
      <div className="flex items-center gap-8">
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
        
        <Link href="/" className="text-xl font-bold tracking-tighter text-white flex items-center gap-2">
          STUDIO TEE
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors uppercase tracking-widest text-[10px]"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="text-white/60 hover:text-white transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
        
        <button 
          onClick={openCart}
          className="relative text-white/60 hover:text-white transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#0050FF] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {itemCount}
            </span>
          )}
        </button>

        <button className="hidden md:block bg-white text-black px-6 py-2 rounded-full text-xs font-bold hover:bg-white/90 transition-colors uppercase tracking-widest">
          Buy Now
        </button>
      </div>
    </motion.nav>

    {/* Search Overlay */}
    <AnimatePresence>
    {isSearchOpen && (
       <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
       >
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 text-white/60 hover:text-white"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-3xl">
             <input 
               type="text" 
               placeholder="SEARCH PRODUCTS..." 
               className="w-full bg-transparent border-b-2 border-white/20 text-4xl md:text-6xl text-white font-bold py-4 focus:outline-none focus:border-[#0050FF] placeholder:text-white/20 uppercase tracking-tighter"
               autoFocus
             />
             <p className="mt-4 text-white/40 text-sm uppercase tracking-widest">Type to search</p>
          </div>
       </motion.div>
    )}
    </AnimatePresence>
    
    {/* Mobile Menu */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
           initial={{ y: "-100%" }}
           animate={{ y: 0 }}
           exit={{ y: "-100%" }}
           className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center space-y-8 md:hidden"
        >
           {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-bold text-white tracking-tighter uppercase"
              >
                {link.name}
              </Link>
           ))}
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
