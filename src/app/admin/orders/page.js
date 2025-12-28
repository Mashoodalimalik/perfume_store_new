"use client";
import React from 'react';
import { useOrders } from '@/context/OrderContext';
import { Trash2, Eye, Package } from 'lucide-react';
import Link from 'next/link';

export default function AdminOrders() {
  const { orders, updateOrderStatus, deleteOrder } = useOrders(); // deleteOrder needs to be added to Context

  // Fallback if deleteOrder doesn't exist yet in context (I need to check context)
  // I will update Context next if needed.

  return (
    <div className="space-y-8 animate-fade-in-up">
      <header>
            <h1 className="text-3xl font-bold uppercase tracking-tight">Orders</h1>
            <p className="text-foreground/60">Manage all customer orders</p>
      </header>
      
      <div className="bg-background rounded-lg border border-foreground/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-foreground/5 text-xs uppercase tracking-widest text-foreground/60">
                    <tr>
                        <th className="px-6 py-4">Order ID</th>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Total</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-foreground/10">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-foreground/5 transition-colors group">
                            <td className="px-6 py-4 font-mono font-bold">
                                <Link href={`/admin/orders/${order.id}`} className="hover:underline hover:text-accent">
                                    {order.id}
                                </Link>
                            </td>
                            <td className="px-6 py-4 font-medium">{order.customer}</td>
                            <td className="px-6 py-4 opacity-60">{order.date}</td>
                            <td className="px-6 py-4">
                                <select 
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                    className={`text-xs px-2 py-1 rounded-full uppercase font-bold outline-none cursor-pointer bg-transparent border border-foreground/10`}
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </td>
                            <td className="px-6 py-4 font-mono">${order.total}</td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    {/* View Details (Placeholder for future expansion or modal) */}
                                    <button className="p-2 hover:bg-foreground/10 rounded-full transition-colors opacity-50 cursor-not-allowed">
                                        <Eye size={16} />
                                    </button>
                                    
                                    {/* Delete Order */}
                                    <button 
                                        onClick={() => {
                                            if (confirm('Delete this order? This cannot be undone.')) {
                                                if (deleteOrder) deleteOrder(order.id);
                                                else alert("Delete function not implemented in Context yet.");
                                            }
                                        }}
                                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {orders.length === 0 && (
                        <tr>
                            <td colSpan="6" className="px-6 py-8 text-center opacity-50">No orders found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
