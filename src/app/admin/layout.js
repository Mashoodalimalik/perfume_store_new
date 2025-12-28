"use client";
import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, Users, LogOut, ArrowLeft, Package } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }) {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r border-foreground/10 flex flex-col fixed h-full z-40 bg-background">
        <div className="p-8">
            <h2 className="text-2xl font-bold uppercase tracking-tighter">Admin</h2>
            <p className="text-xs uppercase tracking-widest opacity-50">Control Panel</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-foreground/10 transition-colors">
                <LayoutDashboard size={20} />
                <span className="font-medium">Overview</span>
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-foreground/10 transition-colors">
                <ShoppingBag size={20} />
                <span className="font-medium">Products</span>
            </Link>
            <Link href="/admin/customers" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-foreground/10 transition-colors">
                <Users size={20} />
                <span className="font-medium">Customers</span>
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-foreground/10 transition-colors">
                <Package size={20} />
                <span className="font-medium">Orders</span>
            </Link>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-white/10 space-y-2">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-foreground/70 hover:bg-foreground/10 rounded-md transition-colors">
                <ArrowLeft size={20} />
                <span className="font-medium">Back to Store</span>
            </Link>
            
            <button 
                onClick={logout} 
                className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-md transition-colors text-left"
            >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
