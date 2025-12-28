"use client";
import React from 'react';
import { useOrders } from '@/context/OrderContext';
import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function AdminCustomers() {
  const { orders } = useOrders();
  // Extract unique customers from orders
  const customersMap = new Map();
  orders.forEach(order => {
      if (!customersMap.has(order.customer)) {
          customersMap.set(order.customer, {
              name: order.customer,
              ordersCount: 0,
              totalSpent: 0,
              lastOrder: order.date
          });
      }
      const customer = customersMap.get(order.customer);
      customer.ordersCount += 1;
      customer.totalSpent += order.total;
  });
  
  const customers = Array.from(customersMap.values());

  return (
    <div className="space-y-8 animate-fade-in-up">
      <header>
        <h1 className="text-3xl font-bold uppercase tracking-tight">Customers</h1>
        <p className="text-gray-500 dark:text-gray-400">View your client base</p>
      </header>
      
      <div className="bg-background rounded-lg border border-foreground/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-foreground/5 text-xs uppercase tracking-widest text-foreground/60">
                    <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Phone</th>
                        <th className="px-6 py-4">Orders</th>
                        <th className="px-6 py-4 text-right">Total Spent</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-foreground/10">
                {Array.from(customersMap.values()).map((customer) => (
                    <tr key={customer.id} className="hover:bg-foreground/5 transition-colors group">
                        <td className="px-6 py-4">
                            <Link href={`/admin/customers/${customer.name}`} className="block">
                                <span className="font-bold group-hover:text-accent transition-colors">{customer.name}</span>
                            </Link>
                        </td>
                        <td className="px-6 py-4 opacity-70">
                            <div className="flex items-center gap-2">
                                <Mail size={14} />
                                {customer.email}
                            </div>
                        </td>
                        <td className="px-6 py-4 opacity-70">
                            <div className="flex items-center gap-2">
                                <Phone size={14} />
                                {customer.phone}
                            </div>
                        </td>
                        <td className="px-6 py-4 font-mono">{customer.orders}</td>
                        <td className="px-6 py-4 font-medium text-right">${customer.totalSpent}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
