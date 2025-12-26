import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const INITIAL_PRODUCTS = [
    { id: 1, name: "Midnight Rose", category: "Floral", price: 120, image: "/images/perfume_floral_elegant.png", collections: ['best-seller', 'new-arrival'] },
    { id: 2, name: "Golden Amber", category: "Oriental", price: 145, image: "/images/perfume_oriental_gold.png", collections: ['best-seller'] },
    { id: 3, name: "Ocean Breeze", category: "Fresh", price: 95, image: "/images/perfume_ocean_fresh.png", collections: ['new-arrival', 'sale'] },
    { id: 4, name: "Velvet Oud", category: "Woody", price: 180, image: "/images/perfume_woody_luxury.png", collections: ['gift-set'] },
    { id: 5, name: "Citrus Splash", category: "Citrus", price: 85, image: "/images/perfume_ocean_fresh.png", collections: ['sale'] },
    { id: 6, name: "Vanilla Dreams", category: "Gourmand", price: 110, image: "/images/perfume_oriental_gold.png", collections: ['gift-set', 'best-seller'] },
];

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('products');
        return savedProducts ? JSON.parse(savedProducts) : INITIAL_PRODUCTS;
    });

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const addProduct = (product) => {
        const newProduct = { ...product, id: Date.now() }; // Simple ID generation
        setProducts([...products, newProduct]);
    };

    const updateProduct = (id, updatedData) => {
        setProducts(products.map(p => p.id === id ? { ...p, ...updatedData } : p));
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const getProduct = (id) => {
        return products.find(p => p.id === parseInt(id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
