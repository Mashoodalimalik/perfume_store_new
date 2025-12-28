"use client";
import React, { use } from 'react';
import { useOrders } from '@/context/OrderContext';
import { ArrowLeft, Package, User, MapPin, Phone, Mail, Clock } from 'lucide-react';
import Link from 'next/link';

export default function AdminOrderDetails({ params }) {
  const resolvedParams = use(params);
  const { orders, updateOrderStatus } = useOrders();
  const order = orders.find(o => o.id === resolvedParams.id);

  if (!order) {
    return (
        <div className="p-8">
            <h1 className="text-2xl">Order Not Found</h1>
            <Link href="/admin/orders" className="underline">Back</Link>
        </div>
    );
  }

  // Calculate Subtotals just in case
  // order.items might be objects now or strings from legacy. Handle both.
  const isLegacyItem = (item) => typeof item === 'string';

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
        <header className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Link href="/admin/orders" className="p-2 hover:bg-foreground/10 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-tight">Order #{order.id}</h1>
                    <p className="text-foreground/60 flex items-center gap-2">
                        <Clock size={14} /> Placed on {order.date}
                    </p>
                </div>
            </div>
            {/* Status Control */}
             <select 
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                className={`px-4 py-2 rounded-full uppercase font-bold outline-none cursor-pointer bg-foreground/5 border border-foreground/10 focus:border-foreground`}
            >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
            </select>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Details */}
            <div className="bg-background border border-foreground/10 rounded-lg p-6 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 border-b border-foreground/10 pb-2 mb-4">Customer Info</h3>
                <div className="flex items-start gap-4">
                    <User className="opacity-50 mt-1" size={18} />
                    <div>
                        <p className="font-bold">{order.customer}</p>
                        <p className="text-sm opacity-60">Customer ID: {order.customer.split(' ')[0]}-001</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <Mail className="opacity-50 mt-1" size={18} />
                    <p className="opacity-80">{order.email || 'N/A'}</p>
                </div>
                <div className="flex items-start gap-4">
                    <Phone className="opacity-50 mt-1" size={18} />
                    <p className="opacity-80">{order.phone || 'N/A'}</p>
                </div>
            </div>

             {/* Shipping Address */}
             <div className="bg-background border border-foreground/10 rounded-lg p-6 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 border-b border-foreground/10 pb-2 mb-4">Shipping Address</h3>
                <div className="flex items-start gap-4">
                    <MapPin className="opacity-50 mt-1" size={18} />
                    {order.address ? (
                         <div>
                            <p className="font-bold">{order.address.street}</p>
                            <p>{order.address.city}, {order.address.zip}</p>
                            <p>{order.address.country}</p>
                        </div>
                    ) : (
                        <p className="opacity-50 italic">No address provided (Legacy Order)</p>
                    )}
                </div>
            </div>
        </div>

        {/* Order Items */}
        <div className="bg-background border border-foreground/10 rounded-lg overflow-hidden">
            <div className="p-6 border-b border-foreground/10">
                <h3 className="font-bold uppercase tracking-widest">Order Items</h3>
            </div>
            <div className="divide-y divide-foreground/10">
                {order.items.map((item, idx) => (
                    <div key={idx} className="p-6 flex items-center justify-between hover:bg-foreground/5 transition-colors">
                        <div className="flex items-center gap-4">
                            {!isLegacyItem(item) && item.image && (
                                <div className="w-12 h-12 bg-foreground/5 rounded-md overflow-hidden">
                                    <img src={item.image} className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div>
                                <p className="font-bold">{isLegacyItem(item) ? item : item.name}</p>
                                {!isLegacyItem(item) && <p className="text-sm opacity-60">Qty: {item.quantity}</p>}
                            </div>
                        </div>
                        <div className="text-right">
                             {!isLegacyItem(item) ? (
                                <p className="font-mono font-bold">{item.price}</p>
                             ) : (
                                <p className="opacity-50 text-sm">Legacy Item</p>
                             )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-6 bg-foreground/5 flex justify-between items-center">
                <span className="font-bold uppercase tracking-widest text-sm">Total Amount</span>
                <span className="text-3xl font-bold tracking-tighter">${order.total}</span>
            </div>
        </div>
    </div>
  );
}
