"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { products as initialProducts } from "@/data/products"; 

const AdminProductContext = createContext();

export function AdminProductProvider({ children }) {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
      try {
          const { data, error } = await supabase.from('products').select('*');
          if (error) throw error;
          
          if (data && data.length > 0) {
              setProducts(data);
          } else {
              // If empty, fallback to initialProducts for display but don't seed automatically to avoid duplicates on every reload
              // Or better: seed ONLY if truly empty and user is admin? 
              // For now, let's just use initialProducts if DB is empty to prevent broken UI
               setProducts(initialProducts);
          }
      } catch (err) {
          console.error("Error loading products:", err);
          setProducts(initialProducts); // Fallback
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    try {
        const { data, error } = await supabase.from('products').insert([{
            name: product.name,
            price: parseFloat(product.price.toString().replace('$','')), 
            description: product.description,
            image: product.image, 
            category: product.category,
            rating: 5
        }]).select().single();

        if (error) throw error;
        setProducts(prev => [...prev, data]);
    } catch (err) {
        console.error("Error adding product:", err);
        alert("Failed to add product. " + err.message);
    }
  };
  
  const updateProduct = async (id, updatedFields) => {
      try {
          const cleanFields = { ...updatedFields };
          if (cleanFields.price) {
               cleanFields.price = parseFloat(cleanFields.price.toString().replace('$',''));
          }

          const { data, error } = await supabase
            .from('products')
            .update(cleanFields)
            .eq('id', id)
            .select()
            .single();

          if (error) throw error;

          setProducts(prev => prev.map(p => p.id === id ? data : p));
      } catch (err) {
          console.error("Error updating product:", err);
      }
  };

  const deleteProduct = async (id) => {
      try {
          const { error } = await supabase.from('products').delete().eq('id', id);
          if (error) throw error;
          setProducts(prev => prev.filter(p => p.id !== id));
      } catch (err) {
          console.error("Error deleting product:", err);
      }
  };

  return (
    <AdminProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, loading }}>
      {children}
    </AdminProductContext.Provider>
  );
}

export function useAdminProducts() {
  return useContext(AdminProductContext);
}
