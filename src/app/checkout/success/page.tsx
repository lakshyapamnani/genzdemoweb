"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const { items } = useCart(); // Could optionally clear cart here
  
  // Real world: we should call an API here to verify the payment status using the order_id.
  // For sandbox demonstration, we assume if we hit the success url, it's completed.

  return (
    <main className="bg-[#050505] min-h-screen text-white/90 font-sans">
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] px-6">
        <div className="max-w-md w-full bg-[#0A0A0C] border border-white/5 p-8 rounded-xl text-center space-y-6">
          <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tighter uppercase">Payment Successful</h1>
          <p className="text-white/60">Thank you for your order! Your transaction has been completed successfully.</p>
          
          {orderId && (
            <div className="bg-black/50 py-3 px-4 rounded-md border border-white/10 text-sm font-mono text-white/80">
              Order ID: {orderId}
            </div>
          )}

          <div className="pt-8">
            <Link 
              href="/"
              className="block w-full py-4 bg-white text-black font-bold text-sm uppercase tracking-wider rounded-md hover:bg-white/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
