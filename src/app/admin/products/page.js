"use client";
import React from 'react';
import { useAdminProducts } from '@/context/AdminProductContext';
// import { products } from '@/data/products'; // Removed static
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminProducts() {
  const { products, deleteProduct } = useAdminProducts();

  return (
    <div className="space-y-8 animate-fade-in-up">
      <header className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold uppercase tracking-tight">Products</h1>
            <p className="text-foreground/60">Manage your inventory</p>
        </div>
        <Link href="/admin/products/add">
            <button className="flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                <Plus size={20} />
                Add Product
            </button>
        </Link>
      </header>
      
      <div className="bg-background rounded-lg border border-foreground/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-foreground/5 text-xs uppercase tracking-widest text-foreground/60">
                    <tr>
                        <th className="px-6 py-4">Image</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-foreground/10">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-foreground/5 transition-colors">
                            <td className="px-6 py-4">
                                <div className="w-12 h-12 bg-foreground/5 rounded-md overflow-hidden relative">
                                   <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                                </div>
                            </td>
                            <td className="px-6 py-4 font-bold">{product.name}</td>
                            <td className="px-6 py-4 font-mono">{product.price}</td>
                            <td className="px-6 py-4 opacity-60">Fragrance</td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <Link href={`/admin/products/edit/${product.id}`} className="p-2 hover:bg-foreground/10 rounded-full transition-colors">
                                        <Edit size={16} />
                                    </Link>
                                    <button 
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this product?')) {
                                                deleteProduct(product.id);
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
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
