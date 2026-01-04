"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
        // Fallback to local storage if not logged in
        const saved = localStorage.getItem('wishlist');
        if (saved) setWishlist(JSON.parse(saved));
        return;
    }

    // Fetch from Supabase
    const fetchWishlist = async () => {
        const { data, error } = await supabase
            .from('wishlist')
            .select(`
                product_id,
                products (
                    *
                )
            `)
            .eq('user_id', user.id);
        
        if (!error && data) {
            // Flatten structure: data returns [{ product_id, products: {...} }]
            const formatted = data.map(item => item.products);
            setWishlist(formatted);
        }
    };

    fetchWishlist();
  }, [user]);

  const addToWishlist = async (product) => {
    // Optimistic Update
    const updatedWishlist = [...wishlist, product];
    setWishlist(updatedWishlist);
    
    if (user) {
        // Supabase
        const { error } = await supabase.from('wishlist').insert({
            user_id: user.id,
            product_id: product.id
        });
        if (error) {
            console.error("Error adding to wishlist:", error);
            // Revert on error
            setWishlist(wishlist); 
        }
    } else {
        // Local Storage
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }
  };

  const removeFromWishlist = async (productId) => {
    // Optimistic Update
    const previousWishlist = wishlist;
    const updatedWishlist = wishlist.filter(item => String(item.id) !== String(productId));
    setWishlist(updatedWishlist);

    if (user) {
        // Supabase
        const { error } = await supabase.from('wishlist').delete().eq('user_id', user.id).eq('product_id', productId);
        if (error) {
            console.error("Error removing from wishlist:", error);
            // Revert
            setWishlist(previousWishlist);
        }
    } else {
        // Local Storage
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => String(item.id) === String(productId));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
