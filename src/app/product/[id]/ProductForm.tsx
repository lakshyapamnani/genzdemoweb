"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Check, ShoppingBag, CreditCard } from "lucide-react";

const SIZES = ["S", "M", "L", "XL", "XXL"];

export default function ProductForm({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, toggleCart } = useCart();

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
    });

    setTimeout(() => {
      setIsAdding(false);
      toggleCart(); // Open cart to show added item
    }, 500);
  };

  return (
    <div className="space-y-10">
      {/* Size Selector */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm font-bold uppercase tracking-widest text-white/80">
            Size
          </label>
          <button className="text-xs text-white/40 underline uppercase tracking-widest hover:text-white transition-colors">
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-4 rounded-xl text-sm font-bold transition-all ${
                selectedSize === size
                  ? "bg-white text-black ring-1 ring-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full py-5 rounded-full bg-white text-black font-bold uppercase tracking-widest hover:bg-white/90 active:scale-[0.98] transition-all flex justify-center items-center gap-3"
        >
          {isAdding ? (
            <Check className="w-5 h-5" />
          ) : (
            <ShoppingBag className="w-5 h-5" />
          )}
          {isAdding ? "Added to Cart" : "Add to Cart"}
        </button>

        <button className="w-full py-5 rounded-full bg-[#0050FF] text-white font-bold uppercase tracking-widest hover:bg-[#0040D0] active:scale-[0.98] transition-all flex justify-center items-center gap-3">
          <CreditCard className="w-5 h-5" />
          Buy It Now
        </button>
      </div>

      <div className="text-xs text-center text-white/40 font-light">
        <p>Free worldwide shipping on orders over $200.</p>
      </div>
    </div>
  );
}
