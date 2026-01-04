"use client";
import React, { useState } from 'react';
import { Search, Package, CheckCircle, Clock, User, LogOut } from 'lucide-react'; 
import { useOrders } from '@/context/OrderContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function OrderTracking() {
  const [searchId, setSearchId] = useState('');
  const [foundOrder, setFoundOrder] = useState(null);
  const [error, setError] = useState('');
  const { user, logout } = useAuth(); 
  const { orders } = useOrders();

  // Filter User Orders
  const myOrders = orders.filter(o => user && (o.customer_name || o.customer || '').toLowerCase().includes(user.name.split(' ')[0].toLowerCase())); 

  const handleTrack = (e) => {
    e.preventDefault();
    const order = orders.find(o => o.id === searchId || o.id.toLowerCase() === searchId.toLowerCase());
    
    if (order) {
      setFoundOrder(order);
      setError('');
    } else {
      setFoundOrder(null);
      setError('Order not found. Please check your Order ID.');
    }
  };

  return (
    <main className="min-h-screen pt-32 px-6 md:px-20 bg-background text-foreground flex flex-col items-center">
      <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in-up">
        
        {/* User Welcome Header */}
        {user ? (
            <div className="flex flex-col items-center gap-4 mb-12">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <User size={40} />
                </div>
                <h1 className="text-4xl font-bold uppercase tracking-tighter">
                    Hello, {user.name}
                </h1>
                <div className="flex gap-4 text-sm font-bold uppercase tracking-widest">
                    <span className="opacity-60">{user.email}</span>
                    <button onClick={logout} className="text-red-500 hover:text-red-400 flex items-center gap-1">
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </div>
        ) : (
            <div className="mb-12">
                <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                Track A Shipment
                </h1>
                <p className="text-lg opacity-70 mt-4">
                Enter your Order ID below or <Link href="/login" className="underline hover:text-accent font-bold">Login</Link> to view your history.
                </p>
            </div>
        )}

        {/* Global Track Form */}
        <form onSubmit={handleTrack} className="flex gap-4 max-w-md mx-auto relative mb-16">
           <div className="relative flex-1">
             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-50" size={20} />
             <input 
                type="text" 
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="e.g. ORD-001" 
                className="w-full pl-12 pr-4 py-4 bg-transparent border border-foreground/20 rounded-lg outline-none focus:border-foreground transition-all"
             />
           </div>
           <button className="px-8 py-4 bg-foreground text-background font-bold uppercase tracking-widest rounded-lg hover:brightness-110 transition-all magnetic-wrap">
             Track
           </button>
        </form>

        {error && (
            <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg">
                {error}
            </div>
        )}

        {/* Search Result */}
        {foundOrder && (
            <div className="mt-8 p-8 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-xl shadow-xl text-left animate-fade-in-up">
               {/* Reusing the same Order Card Layout */}
               <div className="flex justify-between items-start mb-6 border-b border-gray-200 dark:border-white/10 pb-6">
                    <div>
                        <h3 className="text-2xl font-bold uppercase">{foundOrder.id}</h3>
                        <p className="opacity-60">Placed on {foundOrder.date}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase bg-${foundOrder.status === 'Delivered' ? 'green' : 'blue'}-100 text-${foundOrder.status === 'Delivered' ? 'green' : 'blue'}-800`}>
                        {foundOrder.status}
                    </span>
                </div>
                {/* ... (Items list omitted for brevity in search result to focus on My Orders below, but typically included) */}
            </div>
        )}

        {/* My Orders Section */}
        {user && (
            <div className="text-left mt-20">
                <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 border-b border-foreground/10 pb-4">My Recent Orders</h2>
                <div className="grid gap-6">
                    {myOrders.length > 0 ? myOrders.map(order => (
                        <div key={order.id} className="p-6 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-accent transition-colors">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-mono font-bold text-lg">{order.id}</span>
                                <span className={`text-xs px-2 py-1 rounded-full uppercase font-bold bg-${order.status === 'Delivered' ? 'green' : 'blue'}-100 text-${order.status === 'Delivered' ? 'green' : 'blue'}-800`}>{order.status}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="opacity-60 text-sm">{order.date} • {order.items.length} Items</span>
                                <span className="font-bold text-xl">${order.total}</span>
                            </div>
                        </div>
                    )) : (
                        <p className="opacity-50 italic">No orders found for this account.</p>
                    )}
                </div>
            </div>
        )}

      </div>
    </main>
  );
}
