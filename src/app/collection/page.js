"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export default function CollectionPage() {
  return (
    <main className="min-h-screen pt-32 px-6 md:px-20 bg-background text-foreground">
      <div className="text-center mb-20 animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter">
          All Scents
        </h1>
        <p className="mt-4 text-sm md:text-lg uppercase tracking-widest opacity-60">
          Discover your signature fragrance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-x-8 md:gap-y-20 pb-20">
        {products.map((product) => (
          <Link 
            href={`/product/${product.id}`} 
            key={product.id}
            className="group flex flex-col items-center gap-6 magnetic-wrap"
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-background border border-foreground/5">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold uppercase tracking-tight group-hover:text-accent transition-colors">
                {product.name}
              </h2>
              <p className="text-xs uppercase tracking-widest opacity-50">
                {product.subtitle}
              </p>
              <span className="block pt-2 font-medium opacity-80">
                {product.price}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
