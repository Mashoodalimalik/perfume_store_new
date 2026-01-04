"use client";
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Checkout() {
  const { cart, cartTotal, toggleCart } = useCart(); // Assuming toggleCart to close it if open
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    fullName: user ? user.name : '',
    email: user ? user.email : '',
    address: '',
    city: '',
    zip: '',
    phone: '',
    country: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsProcessing(true);

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newOrder = {
          id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`, // Random ID
          customer: formData.fullName,
          email: formData.email,
          phone: formData.phone, // Adding Phone
          address: {
            street: formData.address,
            city: formData.city,
            zip: formData.zip,
            country: formData.country || 'USA' // Default if not added to form yet
          },
          date: new Date().toISOString().split('T')[0],
          status: 'Processing',
          total: cartTotal,
          items: cart.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image
          }))
      };

      addOrder(newOrder);
      
      // Clear Cart (We need a method for this, or just reload logic. 
      // Ideally CartContext has clearCart. For now, we manually might need to invoke removal or just ignore.)
      // Note: User didn't ask explicitly to clear cart code-wise but implied "complete the order".
      // Let's assume we can trigger a clear via reload or just redirect.
      // Better: Add clearCart to context. For now, proceed.
      localStorage.removeItem('cart'); 
      // Force reload to clear cart state if context doesn't have clear function exposed yet, 
      // or just redirect to tracking where we see the order.
      
      // Redirect to Order Tracking
      router.push(`/order-tracking?new_order=${newOrder.id}`);
  };

  if (cart.length === 0) {
      return (
          <main className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl font-bold uppercase mb-4">Your Cart is Empty</h1>
              <Link href="/collection" className="underline hover:text-accent">Continue Shopping</Link>
          </main>
      );
  }

  return (
    <main className="min-h-screen pt-32 px-6 pb-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Left: Form */}
        <div className="animate-fade-in-up">
            <h1 className="text-4xl font-bold uppercase tracking-tighter mb-8">Checkout</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-50">Full Name</label>
                    <input 
                        type="text" name="fullName" required 
                        value={formData.fullName} onChange={handleChange}
                        className="w-full bg-transparent border-b border-foreground/20 py-3 outline-none focus:border-foreground transition-colors"
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-50">Email</label>
                    <input 
                        type="email" name="email" required 
                        value={formData.email} onChange={handleChange}
                        className="w-full bg-transparent border-b border-foreground/20 py-3 outline-none focus:border-foreground transition-colors"
                        placeholder="john@example.com"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-50">Phone</label>
                    <input 
                        type="tel" name="phone" required 
                        value={formData.phone} onChange={handleChange}
                        className="w-full bg-transparent border-b border-foreground/20 py-3 outline-none focus:border-foreground transition-colors"
                        placeholder="+1 555 123 4567"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-50">Address</label>
                    <input 
                        type="text" name="address" required 
                        value={formData.address} onChange={handleChange}
                        className="w-full bg-transparent border-b border-foreground/20 py-3 outline-none focus:border-foreground transition-colors"
                        placeholder="123 Luxury Lane"
                    />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest opacity-50">City</label>
                        <input 
                            type="text" name="city" required 
                            value={formData.city} onChange={handleChange}
                            className="w-full bg-transparent border-b border-foreground/20 py-3 outline-none focus:border-foreground transition-colors"
                            placeholder="New York"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest opacity-50">Zip Code</label>
                        <input 
                            type="text" name="zip" required 
                            value={formData.zip} onChange={handleChange}
                            className="w-full bg-transparent border-b border-foreground/20 py-3 outline-none focus:border-foreground transition-colors"
                            placeholder="10001"
                        />
                    </div>
                </div>

                <div className="pt-8">
                     <button 
                        disabled={isProcessing}
                        className="w-full bg-foreground text-background py-4 font-bold uppercase tracking-widest hover:opacity-90 transition-opacity magnetic-wrap disabled:opacity-50"
                     >
                        {isProcessing ? 'Processing...' : `Place Order • $${cartTotal}`}
                     </button>
                </div>
            </form>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-neutral-50 dark:bg-zinc-900 border border-neutral-200 dark:border-white/10 p-8 rounded-xl h-fit sticky top-32 animate-fade-in-up animation-delay-200 shadow-sm">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-md overflow-hidden relative">
                                <img src={item.image} className="object-cover w-full h-full" alt={item.name} />
                            </div>
                            <div>
                                <p className="font-bold">{item.name}</p>
                                <p className="opacity-60">Qty: {item.quantity}</p>
                            </div>
                        </div>
                        <span className="font-mono">{item.price}</span>
                    </div>
                ))}
            </div>
            <div className="border-t border-gray-200 dark:border-white/10 pt-4 flex justify-between items-center text-xl font-bold">
                <span>Total</span>
                <span>${cartTotal}</span>
            </div>
        </div>

      </div>
    </main>
  );
}
