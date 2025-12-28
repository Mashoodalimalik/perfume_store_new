"use client";
import React, { use } from 'react';
import { useOrders } from '@/context/OrderContext';
import { ArrowLeft, Package, Mail } from 'lucide-react';
import Link from 'next/link';

export default function AdminCustomerDetails({ params }) {
  const { orders } = useOrders();
  const resolvedParams = use(params);
  
  // In a real app we'd have a separate Users table. 
  // Here we derive customer info from their first order found with this "ID" (which is just the name in our mocks usually, or we fix the link)
  // Let's assume the ID passed is the customer Name for simpler mock logic, or we find by normalized name.
  
  const customerName = decodeURIComponent(resolvedParams.id);
  const customerOrders = orders.filter(o => o.customer === customerName);
  const totalSpent = customerOrders.reduce((acc, o) => acc + (typeof o.total === 'number' ? o.total : 0), 0);

  if (customerOrders.length === 0) {
      return (
        <div className="p-8">
            <h1 className="text-2xl">Customer Not Found</h1>
            <Link href="/admin/customers" className="underline">Back</Link>
        </div>
      );
  }

  // Get first order for potential contact info mock
  const profile = {
      name: customerOrders[0].customer,
      email: `${customerOrders[0].customer.toLowerCase().replace(' ', '.')}@example.com`, // Mock email
      joined: customerOrders[customerOrders.length - 1].date // Earliest order date
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
        <header className="flex items-center gap-4">
            <Link href="/admin/customers" className="p-2 hover:bg-foreground/10 rounded-full transition-colors">
                <ArrowLeft size={24} />
            </Link>
            <div>
                <h1 className="text-3xl font-bold uppercase tracking-tight">{profile.name}</h1>
                <p className="text-foreground/60 flex items-center gap-2">
                    <Mail size={14} /> {profile.email}
                </p>
            </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background border border-foreground/10 p-6 rounded-lg text-center">
                <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Total Orders</h3>
                <p className="text-4xl font-bold">{customerOrders.length}</p>
            </div>
            <div className="bg-background border border-foreground/10 p-6 rounded-lg text-center">
                <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Total Spent</h3>
                <p className="text-4xl font-bold">${totalSpent}</p>
            </div>
            <div className="bg-background border border-foreground/10 p-6 rounded-lg text-center">
                <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2">First Order</h3>
                <p className="text-xl font-bold">{profile.joined}</p>
            </div>
        </div>

        <div className="bg-background border border-foreground/10 rounded-lg overflow-hidden">
            <div className="p-6 border-b border-foreground/10">
                <h3 className="font-bold uppercase tracking-widest">Order History</h3>
            </div>
            <div className="divide-y divide-foreground/10">
                {customerOrders.map(order => (
                    <div key={order.id} className="p-6 flex items-center justify-between hover:bg-foreground/5 transition-colors">
                         <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-foreground/5 rounded-md flex items-center justify-center">
                                 <Package size={20} className="opacity-50" />
                             </div>
                             <div>
                                 <Link href={`/admin/orders/${order.id}`} className="font-bold font-mono hover:text-accent hover:underline">
                                    {order.id}
                                 </Link>
                                 <p className="text-sm opacity-60">{order.date} • {order.items.length} Items</p>
                             </div>
                         </div>
                         <div className="text-right">
                             <p className="font-bold">${order.total}</p>
                             <span className={`text-xs px-2 py-1 rounded-full uppercase font-bold bg-${order.status === 'Delivered' ? 'green' : 'blue'}-100 text-${order.status === 'Delivered' ? 'green' : 'blue'}-800`}>
                                {order.status}
                             </span>
                         </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
