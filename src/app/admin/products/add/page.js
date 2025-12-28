"use client";
import React, { useState } from 'react';
import { useAdminProducts } from '@/context/AdminProductContext';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload } from 'lucide-react';
import Link from 'next/link';

export default function AddProduct() {
  const { addProduct } = useAdminProducts();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    price: '',
    description: '',
    image: '/images/perfume-1.png' // Default mock image
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
        id: `prod-${Date.now()}`,
        ...formData
    };
    addProduct(newProduct);
    router.push('/admin/products');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in-up">
        <header className="flex items-center gap-4">
            <Link href="/admin/products" className="p-2 hover:bg-foreground/10 rounded-full transition-colors">
                <ArrowLeft size={24} />
            </Link>
            <div>
                <h1 className="text-3xl font-bold uppercase tracking-tight">Add Product</h1>
                <p className="text-foreground/60">Create a new scent</p>
            </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 bg-background rounded-lg border border-foreground/10 p-8">
            <div className="space-y-2">
                <label className="text-xs uppercase font-bold tracking-widest opacity-50">Product Name</label>
                <input 
                    type="text" name="name" required
                    value={formData.name} onChange={handleChange}
                    className="w-full bg-transparent border-b border-foreground/20 py-3 outline-none focus:border-foreground transition-colors placeholder:text-foreground/20"
                    placeholder="e.g. Midnight Oud"
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase font-bold tracking-widest opacity-50">Subtitle</label>
                <input 
                    type="text" name="subtitle" required
                    value={formData.subtitle} onChange={handleChange}
                    className="w-full bg-transparent border-b border-foreground/20 py-3 outline-none focus:border-foreground transition-colors placeholder:text-foreground/20"
                    placeholder="e.g. Woody & Spicy"
                />
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-widest opacity-50">Price</label>
                    <input 
                        type="text" name="price" required
                        value={formData.price} onChange={handleChange}
                        className="w-full bg-transparent border-b border-foreground/20 py-3 outline-none focus:border-foreground transition-colors placeholder:text-foreground/20"
                        placeholder="e.g. $120.00"
                    />
                </div>
                
                {/* Image Upload */}
                <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-widest opacity-50">Image</label>
                    <div className="flex items-center gap-4 py-3">
                        <div className="w-12 h-12 bg-foreground/5 rounded-md overflow-hidden relative">
                            <img src={formData.image} className="w-full h-full object-cover" alt="Preview"/>
                        </div>
                        <label className="cursor-pointer">
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setFormData(prev => ({ ...prev, image: reader.result }));
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            <div className="flex items-center gap-2 text-xs font-bold uppercase underline hover:opacity-70 transition-opacity">
                                <Upload size={16} />
                                <span>Change Image</span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase font-bold tracking-widest opacity-50">Description</label>
                <textarea 
                    name="description" required rows="4"
                    value={formData.description} onChange={handleChange}
                    className="w-full bg-transparent border-b border-foreground/20 py-3 outline-none focus:border-foreground transition-colors resize-none placeholder:text-foreground/20"
                    placeholder="Product description..."
                ></textarea>
            </div>

            <div className="pt-4">
                <button className="w-full bg-foreground text-background py-4 font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                    Create Product
                </button>
            </div>
        </form>
    </div>
  );
}
