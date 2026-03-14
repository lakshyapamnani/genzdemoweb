"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check, Star, ShoppingBag, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import Link from "next/link";

const SIZES = ["S", "M", "L", "XL", "XXL"];

export function ProductSection() {
    // State to track size/adding PER product
    const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
    const [addedStatus, setAddedStatus] = useState<Record<string, boolean>>({});
    
    const { addItem } = useCart();

    const handleSizeSelect = (productId: string, size: string) => {
        setSelectedSizes(prev => ({
            ...prev,
            [productId]: size
        }));
    };

    const handleAddToCart = (product: typeof PRODUCTS[0]) => {
        const size = selectedSizes[product.id] || "L"; // Default to L if not selected
        
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          size: size,
          image: product.image
        });
        
        setAddedStatus(prev => ({ ...prev, [product.id]: true }));
        setTimeout(() => {
            setAddedStatus(prev => ({ ...prev, [product.id]: false }));
        }, 2000);
    };

    return (
        <section id="shop" className="relative z-40 w-full bg-[#050505] min-h-screen py-24 border-t border-white/5">
            <div className="container mx-auto px-6">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-sm font-mono text-[#0050FF] tracking-widest uppercase mb-4">
                            Shop The Collection
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase leading-none">
                            LATEST DROPS
                        </h1>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-white/60 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold group">
                        View All Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Main Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
                    {PRODUCTS.map((product, idx) => (
                        <motion.div 
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group flex flex-col space-y-3"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#0A0A0C] border border-white/5">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="object-cover w-full h-full opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Quick Add Button (Desktop Hover) */}
                                <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <button 
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full py-3 bg-white text-black font-bold text-sm uppercase tracking-wider rounded-full hover:bg-white/90 flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        {addedStatus[product.id] ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                                        {addedStatus[product.id] ? "Added" : "Quick Add"}
                                    </button>
                                </div>
                                
                                {/* Badge */}
                                {product.badge && (
                                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                                            {product.badge}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="space-y-1">
                                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-1">
                                    <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-tight leading-snug group-hover:text-[#0050FF] transition-colors truncate w-full">
                                        {product.name}
                                    </h3>
                                    <span className="text-sm font-medium text-white/60">${product.price}</span>
                                </div>
                                <p className="text-xs text-white/40 line-clamp-1">
                                    {product.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="mt-12 md:hidden flex justify-center">
                    <button className="w-full py-4 border border-white/20 text-white font-bold uppercase tracking-widest rounded-full hover:bg-white/5 transition-colors">
                        View All Products
                    </button>
                </div>

            </div>
        </section>
    );
}
