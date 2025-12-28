"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '@/data/products';

const AdminProductContext = createContext();

export function AdminProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  // Load products from local storage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('admin_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Initialize with mock data if empty
      setProducts(initialProducts);
      // Don't save mock data immediately to keep localStorage clean? 
      // Actually, for a mock app, better to save it so edits persist.
      localStorage.setItem('admin_products', JSON.stringify(initialProducts));
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (products.length > 0) {
        localStorage.setItem('admin_products', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) => 
        prev.map(p => p.id === id ? { ...p, ...updatedData } : p)
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter(p => p.id !== id));
  };

  return (
    <AdminProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </AdminProductContext.Provider>
  );
}

export function useAdminProducts() {
  return useContext(AdminProductContext);
}
