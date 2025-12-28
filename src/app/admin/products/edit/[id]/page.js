"use client";
import React, { useState, useEffect, use } from 'react';
import { useAdminProducts } from '@/context/AdminProductContext';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Save } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function EditProduct({ params }) {
  const resolvedParams = use(params);
  const { products, updateProduct } = useAdminProducts();
  const router = useRouter();
  
  // Find product by ID
  const product = products.find(p => p.id === resolvedParams.id);
  
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    price: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (product) {
        setFormData({
            name: product.name,
            subtitle: product.subtitle || '',
            price: product.price,
            description: product.description || '',
            image: product.image
        });
    }
  }, [product]);

  if (!product && products.length > 0) {
      // Only show not found if products have loaded and strictly not found. 
      // Initial render might have empty products array if not loaded from LS yet, but LS load is synch-ish in React State update. 
      // Usually better to wait, but for now:
      return <div className="p-8">Product not found...</div>;
  }
  
  if (!product) return <div className="p-8">Loading...</div>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(product.id, formData);
    router.push('/admin/products');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in-up">
        <header className="flex items-center gap-4">
            <Link href="/admin/products" className="p-2 hover:bg-foreground/10 rounded-full transition-colors">
                <ArrowLeft size={24} />
            </Link>
            <div>
                <h1 className="text-3xl font-bold uppercase tracking-tight">Edit Product</h1>
                <p className="text-foreground/60">Update details for {product.name}</p>
            </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 bg-background rounded-lg border border-foreground/10 p-8">
            <div className="space-y-2">
                <label className="text-xs uppercase font-bold tracking-widest opacity-50">Product Name</label>
                <input 
                    type="text" name="name" required
                    value={formData.name} onChange={handleChange}
                    className="w-full bg-transparent border-b border-foreground/20 py-3 outline-none focus:border-foreground transition-colors"
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase font-bold tracking-widest opacity-50">Subtitle</label>
                <input 
                    type="text" name="subtitle" required
                    value={formData.subtitle} onChange={handleChange}
                    className="w-full bg-transparent border-b border-foreground/20 py-3 outline-none focus:border-foreground transition-colors"
                />
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-widest opacity-50">Price</label>
                    <input 
                        type="text" name="price" required
                        value={formData.price} onChange={handleChange}
                        className="w-full bg-transparent border-b border-foreground/20 py-3 outline-none focus:border-foreground transition-colors"
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
                    className="w-full bg-transparent border-b border-foreground/20 py-3 outline-none focus:border-foreground transition-colors resize-none"
                ></textarea>
            </div>

            <div className="pt-4">
                <button className="w-full flex items-center justify-center gap-2 bg-foreground text-background py-4 font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                    <Save size={20} />
                    Save Changes
                </button>
            </div>
        </form>
    </div>
  );
}
