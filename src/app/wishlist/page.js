"use client";
import React from 'react';
import { useWishlist } from '@/context/WishlistContext';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <main className="min-h-screen pt-32 px-6 md:px-20 bg-background text-foreground flex flex-col items-center">
      <div className="max-w-6xl w-full text-center space-y-8 animate-fade-in-up">
        
        <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                Your Wishlist
            </h1>
            <p className="text-lg opacity-70 mt-4">
                Saved favorites ({wishlist.length})
            </p>
        </header>

        {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {wishlist.map(product => (
                    <div key={product.id} className="group relative flex flex-col items-center gap-6">
                        {/* Remove Button */}
                        <button 
                            onClick={() => removeFromWishlist(product.id)}
                            className="absolute top-4 right-4 z-20 p-2 bg-background/80 rounded-full hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>

                        <Link href={`/product/${product.id}`} className="w-full">
                            <div className="relative w-full aspect-[3/4] overflow-hidden bg-background border border-foreground/5">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                            </div>
                        
                            <div className="text-center space-y-2 mt-6">
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
                    </div>
                ))}
            </div>
        ) : (
             <div className="py-20">
                <p className="text-xl opacity-50 italic">Your wishlist is empty.</p>
                <Link href="/collection" className="mt-8 inline-block px-8 py-3 bg-foreground text-background uppercase tracking-widest font-bold hover:scale-105 transition-transform magnetic-wrap">
                    Start Shopping
                </Link>
             </div>
        )}

      </div>
    </main>
  );
}
