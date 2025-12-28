"use client";
import React, { useEffect, useRef } from "react";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import gsap from "gsap";
import Image from "next/image";
import Link from 'next/link';

export default function CartSidebar() {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, cartTotal } = useCart();
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isCartOpen) {
      gsap.to(overlayRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.3 });
      gsap.to(sidebarRef.current, { x: "0%", duration: 0.5, ease: "power3.out" });
    } else {
      gsap.to(sidebarRef.current, { x: "100%", duration: 0.5, ease: "power3.in" });
      gsap.to(overlayRef.current, { opacity: 0, pointerEvents: "none", duration: 0.3, delay: 0.2 });
    }
  }, [isCartOpen]);

  return (
    <>
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 z-[999] opacity-0 pointer-events-none backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-background z-[1000] transform translate-x-full shadow-2xl flex flex-col border-l border-foreground/10 text-foreground"
      >
        <div className="p-6 flex items-center justify-between border-b border-foreground/10">
            <h2 className="text-xl font-bold uppercase tracking-widest flex items-center gap-2">
                <ShoppingBag size={20} />
                Your Cart ({cart.reduce((a, c) => a + c.quantity, 0)})
            </h2>
            <button onClick={() => setIsCartOpen(false)} className="hover:scale-110 transition-transform p-2">
                <X size={24} />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                    <ShoppingBag size={48} className="mb-4" />
                    <p className="uppercase tracking-widest">Your cart is empty</p>
                </div>
            ) : (
                cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                        <div className="relative w-20 h-24 bg-foreground/5 flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold uppercase tracking-tight">{item.name}</h3>
                            <p className="text-sm opacity-60 mb-2">{item.subtitle}</p>
                            <p className="font-medium">{item.price}</p>
                        </div>
                        <div className="flex flex-col items-center justify-between">
                            <div className="flex items-center gap-2 border border-foreground/20 rounded-full px-2 py-1">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:opacity-50"><Minus size={12} /></button>
                                <span className="text-sm w-4 text-center">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:opacity-50"><Plus size={12} /></button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-xs uppercase tracking-widest opacity-50 hover:text-red-500 transition-colors underline">Remove</button>
                        </div>
                    </div>
                ))
            )}
        </div>

        {cart.length > 0 && (
            <div className="p-6 border-t border-foreground/10 bg-foreground/5 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold uppercase">
                    <span>Total</span>
                    <span>${cartTotal}</span>
                </div>
                <button 
                    onClick={() => {
                        setIsCartOpen(false);
                        window.location.href = '/checkout'; // Using direct navigation or router to avoid nesting issues
                    }}
                    className="w-full bg-foreground text-background py-4 uppercase font-bold tracking-widest hover:opacity-90 transition-opacity"
                >
                    Checkout
                </button>
            </div>
        )}
      </div>
    </>
  );
}
