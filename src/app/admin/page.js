"use client";
import React from 'react';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { useOrders } from '@/context/OrderContext'; 
// import { orders } from '@/data/orders'; // Removed static import
import { products } from '@/data/products';

export default function AdminDashboard() {
  const { orders, updateOrderStatus } = useOrders();
  
  const totalRevenue = orders.reduce((acc, order) => acc + (typeof order.total === 'number' ? order.total : 0), 0); // Safety check for mocks vs real
  const totalOrders = orders.length;
  // Unique customers based on name
  const totalCustomers = new Set(orders.map(o => o.customer_name || o.customer)).size;

  return (
    <div className="space-y-8 animate-fade-in-up">
      <header>
        <h1 className="text-3xl font-bold uppercase tracking-tight">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome back, Admin.</p>
      </header>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-neutral-50 dark:bg-zinc-900 p-6 rounded-lg border border-neutral-200 dark:border-white/10 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm uppercase tracking-widest opacity-60">Revenue</p>
                <h3 className="text-2xl font-bold mt-1 text-foreground">${totalRevenue}</h3>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full">
                <DollarSign size={24} />
            </div>
        </div>
        <div className="bg-neutral-50 dark:bg-zinc-900 p-6 rounded-lg border border-neutral-200 dark:border-white/10 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm uppercase tracking-widest opacity-60">Orders</p>
                <h3 className="text-2xl font-bold mt-1 text-foreground">{totalOrders}</h3>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full">
                <ShoppingCart size={24} />
            </div>
        </div>
        <div className="bg-neutral-50 dark:bg-zinc-900 p-6 rounded-lg border border-neutral-200 dark:border-white/10 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm uppercase tracking-widest opacity-60">Customers</p>
                <h3 className="text-2xl font-bold mt-1 text-foreground">{totalCustomers}</h3>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full">
                <Users size={24} />
            </div>
        </div>
        <div className="bg-neutral-50 dark:bg-zinc-900 p-6 rounded-lg border border-neutral-200 dark:border-white/10 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm uppercase tracking-widest opacity-60">Avg Order</p>
                <h3 className="text-2xl font-bold mt-1 text-foreground">${Math.round(totalRevenue/totalOrders)}</h3>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-full">
                <TrendingUp size={24} />
            </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-neutral-50 dark:bg-zinc-900 rounded-lg border border-neutral-200 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-white/10">
            <h2 className="text-lg font-bold uppercase tracking-wide">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-white/5 text-xs uppercase tracking-widest text-gray-500">
                    <tr>
                        <th className="px-6 py-4">Order ID</th>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Total</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-mono text-sm opacity-70">{order.id}</td>
                            <td className="px-6 py-4 font-medium">{order.customer_name || order.customer}</td>
                            <td className="px-6 py-4 text-sm opacity-70">{order.date}</td>
                            <td className="px-6 py-4">
                                <button 
                                    onClick={() => {
                                        const statuses = ['Processing', 'Shipped', 'Delivered'];
                                        const nextStatus = statuses[(statuses.indexOf(order.status) + 1) % statuses.length];
                                        updateOrderStatus(order.id, nextStatus);
                                    }}
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${order.status === 'Delivered' ? 'green' : order.status === 'Processing' ? 'blue' : 'yellow'}-100 text-${order.status === 'Delivered' ? 'green' : order.status === 'Processing' ? 'blue' : 'yellow'}-800 hover:scale-105 transition-transform cursor-pointer`}
                                    title="Click to update status"
                                >
                                    {order.status}
                                </button>
                            </td>
                            <td className="px-6 py-4 text-right font-medium">${order.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
