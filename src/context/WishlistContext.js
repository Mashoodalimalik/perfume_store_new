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
    if (user) {
        // Supabase
        const { error } = await supabase.from('wishlist').insert({
            user_id: user.id,
            product_id: product.id
        });
        if (!error) {
            setWishlist([...wishlist, product]);
        }
    } else {
        // Local Storage
        if (!wishlist.find(item => item.id === product.id)) {
            const updated = [...wishlist, product];
            setWishlist(updated);
            localStorage.setItem('wishlist', JSON.stringify(updated));
        }
    }
  };

  const removeFromWishlist = async (productId) => {
    if (user) {
        // Supabase
        const { error } = await supabase.from('wishlist').delete().eq('user_id', user.id).eq('product_id', productId);
        if (!error) {
            setWishlist(wishlist.filter(item => item.id !== productId));
        }
    } else {
        // Local Storage
        const updated = wishlist.filter(item => item.id !== productId);
        setWishlist(updated);
        localStorage.setItem('wishlist', JSON.stringify(updated));
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
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
