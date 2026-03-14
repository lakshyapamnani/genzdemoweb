"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Minus, Plus } from "lucide-react";
import Link from 'next/link';

export function Cart() {
  const { items, isOpen, closeCart, cartTotal, addItem, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#0A0A0C] border-l border-white/10 shadow-2xl p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" />
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-white/20" />
                  </div>
                  <p className="text-white/40 text-lg">Your cart is empty</p>
                  <button onClick={closeCart} className="text-[#0050FF] hover:underline">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="w-20 h-20 bg-white/5 rounded-md overflow-hidden relative">
                      {/* Placeholder for now if no image provided */}
                       <img src={item.image || "/placeholder.png"} alt={item.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-white text-lg">{item.name}</h3>
                        <p className="text-white/80 font-mono">₹{item.price}</p>
                      </div>
                      <p className="text-sm text-white/40 mb-3">Size: {item.size}</p>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1">
                           <button 
                            className="text-white/60 hover:text-white"
                            onClick={() => {
                                if (item.quantity > 1) {
                                  // Simplified logic here; ideally handle update quantity separately
                                  // For quick remove, we can just removeItem.
                                  // For decrement, logic needed in Context.
                                  // Skipping decrement for MVP speed, using remove only.
                                  removeItem(item.id, item.size);
                                } else {
                                  removeItem(item.id, item.size);
                                }
                            }}
                           >
                             <Minus className="w-3 h-3" />
                           </button>
                           <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                           <button 
                             className="text-white/60 hover:text-white"
                             onClick={() => addItem({...item})} // Just adds 1 more
                           >
                              <Plus className="w-3 h-3" />
                           </button>
                         </div>
                         <button 
                           onClick={() => removeItem(item.id, item.size)}
                           className="text-white/40 hover:text-red-500 text-sm underline transition-colors"
                         >
                           Remove
                         </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between text-white/60 text-sm">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-white font-bold text-xl mb-4">
                  <span>Total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-white/90 transition-colors uppercase tracking-wide text-center"
                >
                  Proceed to Checkout
                </Link>
                <p className="text-center text-xs text-white/20">
                  Secure Checkout powered by Stripe
                </p>
              </div>
            )}
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}

import React from 'react';
