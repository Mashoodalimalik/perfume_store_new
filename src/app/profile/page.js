"use client";
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { useRouter } from 'next/navigation';
import { Package, Mail, Calendar, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { orders } = useOrders();
  const router = useRouter();

  if (!user) {
      // Redirect if not logged in
      if (typeof window !== 'undefined') router.push('/login');
      return null;
  }

  // Filter orders for this user
  // Assuming 'customer' field in order matches user.name for now (legacy logic).
  // Ideally match by ID or Email.
  const myOrders = orders.filter(o => o.customer === user.name || o.email === user.email);

  return (
    <main className="min-h-screen pt-32 px-6 pb-20 bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-12 animate-fade-in-up">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-12 border-b border-foreground/10">
            <div>
                <h1 className="text-4xl font-bold uppercase tracking-tighter mb-2">My Profile</h1>
                <p className="text-lg opacity-60">Welcome back, {user.name}</p>
            </div>
            <button 
                onClick={() => {
                    logout();
                    router.push('/');
                }}
                className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-500 rounded-full font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors"
            >
                <LogOut size={18} />
                Logout
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stats */}
            <div className="bg-foreground/5 p-6 rounded-lg border border-foreground/10">
                <div className="flex items-center gap-3 mb-4 opacity-50">
                    <Package size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest">Total Orders</span>
                </div>
                <p className="text-4xl font-bold">{myOrders.length}</p>
            </div>
            
            <div className="bg-foreground/5 p-6 rounded-lg border border-foreground/10 md:col-span-2">
                 <div className="flex flex-col gap-4">
                     <div className="flex items-center gap-3">
                        <Mail size={18} className="opacity-50" />
                        <span className="opacity-80">{user.email}</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <Calendar size={18} className="opacity-50" />
                        <span className="opacity-80">Member since {new Date().getFullYear()}</span>
                     </div>
                 </div>
            </div>
        </div>

        {/* Order History */}
        <div className="space-y-6">
            <h2 className="text-2xl font-bold uppercase tracking-widest">Order History</h2>
            
            {myOrders.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-foreground/20 rounded-lg">
                    <p className="opacity-50 mb-6">You haven't placed any orders yet.</p>
                    <Link href="/collection" className="inline-block px-8 py-3 bg-foreground text-background font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="bg-background border border-foreground/10 rounded-lg overflow-hidden">
                     <div className="divide-y divide-foreground/10">
                        {myOrders.map(order => (
                            <div key={order.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-foreground/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-foreground/5 rounded-md flex items-center justify-center">
                                        <Package size={20} className="opacity-50" />
                                    </div>
                                    <div>
                                        <p className="font-bold font-mono">{order.id}</p>
                                        <p className="text-sm opacity-60">{order.date} • {order.items.length} Items</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                                    <span className={`text-xs px-3 py-1 rounded-full uppercase font-bold bg-foreground/5 border border-foreground/10`}>
                                        {order.status}
                                    </span>
                                    <span className="font-bold font-mono">${order.total}</span>
                                    {/* Link to tracking for this order specifically? The user asked for "Order History" button in Customers section, but for user profile, tracking is best. */}
                                    {/* Actually, user might want to see details. Reusing Tracking logic or Admin Order Details logic? 
                                        Admin Order Details is for Admins. Users should probably go to /order-tracking?new_order=ID or similar. 
                                        Let's stick to simple display or link to tracking. */}
                                    {/* For now, just display. */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

      </div>
    </main>
  );
}
