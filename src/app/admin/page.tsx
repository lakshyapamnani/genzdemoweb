"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "/frames/ezgif-frame-001.jpg",
    badge: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: formData.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
          ...formData
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", price: "", description: "", image: "/frames/ezgif-frame-001.jpg", badge: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="bg-[#050505] min-h-screen text-white/90 font-sans">
      <Navbar />
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-2">Admin Dashboard</h1>
        <p className="text-white/60 mb-12">Add a new product to your store catalog.</p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-[#0A0A0C] border border-white/5 p-8 rounded-xl">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-[#0050FF]">Product Name</label>
            <input 
              required
              className="w-full bg-black border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#0050FF]"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. ZENVY CREWNECK"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-[#0050FF]">Price ($)</label>
            <input 
              required
              type="number"
              className="w-full bg-black border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#0050FF]"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="e.g. 120"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-[#0050FF]">Image URL</label>
            <input 
              required
              className="w-full bg-black border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#0050FF]"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="/frames/ezgif-frame-001.jpg"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-[#0050FF]">Badge (Optional)</label>
            <input 
              className="w-full bg-black border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#0050FF]"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              placeholder="e.g. New Arrival, Limited"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-[#0050FF]">Description</label>
            <textarea 
              required
              rows={4}
              className="w-full bg-black border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#0050FF]"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Product details..."
            />
          </div>

          <button 
            type="submit" 
            disabled={status === "loading"}
            className="w-full py-4 bg-white text-black font-bold text-sm uppercase tracking-wider rounded-md hover:bg-white/90 transition-colors mt-8"
          >
            {status === "loading" ? "Adding Product..." : "Add Product"}
          </button>

          {status === "success" && (
            <p className="text-green-400 text-sm text-center">Product added successfully!</p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm text-center">Failed to add product. Please try again.</p>
          )}
        </form>
      </div>
    </main>
  );
}
