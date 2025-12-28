"use client";
import React from "react";
import Image from "next/image";
import { products } from "@/data/products";
import { notFound } from "next/navigation";
import { use } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Heart } from "lucide-react";

export default function ProductPage({ params }) {
  // Unwrap params using React.use() for Next.js 16/React 19 compatibility
  const resolvedParams = use(params);
  const product = products.find((p) => p.id === resolvedParams.id);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!product) {
    notFound();
  }

  const isWishlisted = isInWishlist(product.id);

  return (
    <main className="min-h-screen pt-24 pb-12 px-6 md:px-20 bg-background text-foreground flex flex-col md:flex-row items-center gap-12">
      {/* Visual Side */}
      <div className="w-full md:w-1/2 flex justify-center h-[50vh] md:h-[70vh] relative magnetic-wrap">
        <div className="relative w-full h-full">
            <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
            priority
            />
        </div>
      </div>

      {/* Details Side */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
                    {product.name}
                </h1>
                <h2 className="text-xl px-1 uppercase tracking-widest opacity-60">
                    {product.subtitle}
                </h2>
            </div>
            <button 
                onClick={() => isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
                className={`p-4 rounded-full border transition-colors ${isWishlisted ? 'bg-red-500 border-red-500 text-white' : 'border-foreground/20 hover:border-foreground'}`}
            >
                <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
        </div>
        
        <p className="text-lg leading-relaxed max-w-md opacity-80">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-8">
            <span className="text-3xl font-light">{product.price}</span>
            <button 
                onClick={() => addToCart(product)}
                className="px-8 py-3 bg-foreground text-background uppercase tracking-widest font-bold hover:scale-105 transition-transform magnetic-wrap"
            >
                Add to Cart
            </button>
        </div>
      </div>
    </main>
  );
}
