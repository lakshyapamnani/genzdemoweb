import { PRODUCTS } from "@/data/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Cart } from "@/components/Cart";
import ProductForm from "./ProductForm";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#0050FF]/30 font-sans pt-24">
      <Navbar />
      <Cart />

      <div className="container mx-auto px-6 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Images Section */}
          <div className="relative aspect-[4/5] lg:aspect-[3/4] w-full bg-[#0A0A0C] border border-white/5 rounded-2xl overflow-hidden sticky top-32">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col justify-center max-w-xl">
            {/* Headers */}
            <div className="mb-8">
              {product.badge && (
                <div className="inline-block bg-white/10 backdrop-blur-md px-3 py-1 rounded-full mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                    {product.badge}
                  </span>
                </div>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-light text-white/80">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Description */}
            <div className="mb-10">
              <p className="text-white/60 text-lg font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Client Component for Interactive Form */}
            <ProductForm product={product} />

            {/* Details Accordion (Static Mock) */}
            <div className="mt-16 space-y-6 border-t border-white/10 pt-8">
              <div className="group">
                <h3 className="text-sm font-bold uppercase tracking-widest flex justify-between items-center cursor-pointer pb-4 border-b border-white/10 group-hover:text-[#0050FF] transition-colors">
                  Details & Fit
                  <span className="text-xl">+</span>
                </h3>
              </div>
              <div className="group">
                <h3 className="text-sm font-bold uppercase tracking-widest flex justify-between items-center cursor-pointer pb-4 border-b border-white/10 group-hover:text-[#0050FF] transition-colors">
                  Composition & Care
                  <span className="text-xl">+</span>
                </h3>
              </div>
              <div className="group">
                <h3 className="text-sm font-bold uppercase tracking-widest flex justify-between items-center cursor-pointer pb-4 border-b border-white/10 group-hover:text-[#0050FF] transition-colors">
                  Shipping & Returns
                  <span className="text-xl">+</span>
                </h3>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
