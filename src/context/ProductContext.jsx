import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const INITIAL_PRODUCTS = [
    { id: 1, name: "Midnight Rose", category: "Floral", price: 120, image: "https://images.unsplash.com/photo-1594035910387-fea4779426e9?q=80&w=800&auto=format&fit=crop" },
    { id: 2, name: "Golden Amber", category: "Oriental", price: 145, image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop" },
    { id: 3, name: "Ocean Breeze", category: "Fresh", price: 95, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop" },
    { id: 4, name: "Velvet Oud", category: "Woody", price: 180, image: "https://images.unsplash.com/photo-1523293188086-b46e0a8041a8?q=80&w=800&auto=format&fit=crop" },
    { id: 5, name: "Citrus Splash", category: "Citrus", price: 85, image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=800&auto=format&fit=crop" },
    { id: 6, name: "Vanilla Dreams", category: "Gourmand", price: 110, image: "https://images.unsplash.com/photo-1543438418-8525e9323838?q=80&w=800&auto=format&fit=crop" },
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
