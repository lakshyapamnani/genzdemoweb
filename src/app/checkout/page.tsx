"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { load } from "@cashfreepayments/cashfree-js";

export default function CheckoutPage() {
  const { items, cartTotal } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setError("Your cart is empty");
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      // 1. Create Order on our backend
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_details: {
            customer_id: `cust_${Date.now()}`,
            customer_name: formData.name,
            customer_email: formData.email,
            customer_phone: formData.phone,
          },
          order_amount: cartTotal,
          order_note: `Order for ${formData.name}`
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong creating order");
      }

      // 2. Initialize Cashfree
      const cashfree = await load({ mode: "production" }); 

      // 3. Trigger Cashfree Checkout with the payment session id
      const checkoutOptions = {
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_self"
      };

      await cashfree.checkout(checkoutOptions);
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to process checkout");
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-[#050505] min-h-screen text-white/90 font-sans">
      <Navbar />
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-12 border-b border-white/10 pb-6">Checkout</h1>

        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Checkout Form */}
          <div className="flex-1">
            <h2 className="text-xl font-bold uppercase tracking-widest text-[#0050FF] mb-6">Customer Details</h2>
            
            <form onSubmit={handleCheckout} className="space-y-6 bg-[#0A0A0C] border border-white/5 p-8 rounded-xl" id="checkout-form">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/60">Full Name</label>
                <input 
                  required
                  className="w-full bg-black border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#0050FF]"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/60">Email</label>
                <input 
                  required
                  type="email"
                  className="w-full bg-black border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#0050FF]"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/60">Phone</label>
                <input 
                  required
                  type="tel"
                  className="w-full bg-black border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#0050FF]"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="9999999999"
                  pattern="[0-9]{10}"
                  title="10 digit mobile number"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/60">Shipping Address</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full bg-black border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#0050FF]"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="123 Street..."
                />
              </div>
            </form>
          </div>

          {/* Cart Summary */}
          <div className="md:w-[400px]">
            <div className="bg-[#0A0A0C] border border-white/5 p-8 rounded-xl sticky top-32">
              <h2 className="text-xl font-bold uppercase tracking-widest text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                {items.length === 0 ? (
                  <p className="text-white/40 italic">Your cart is empty.</p>
                ) : (
                  items.map(item => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center">
                      <div className="w-16 h-20 bg-black rounded-md overflow-hidden flex-shrink-0 border border-white/5">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold truncate text-white uppercase">{item.name}</h3>
                        <p className="text-xs text-white/60">Size: {item.size} | Qty: {item.quantity}</p>
                        <p className="text-sm font-medium mt-1">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-white/10 pt-4 mb-8 flex justify-between items-center text-lg">
                <span className="font-medium text-white/60 uppercase text-sm">Total</span>
                <span className="font-bold text-white">₹{cartTotal.toFixed(2)}</span>
              </div>

              {error && (
                <div className="mb-4 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <button 
                type="submit"
                form="checkout-form"
                disabled={isLoading || items.length === 0}
                className="w-full py-4 bg-[#0050FF] text-white font-bold text-sm uppercase tracking-wider rounded-md hover:bg-[#0040CC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  `Pay ₹${cartTotal.toFixed(2)}`
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
