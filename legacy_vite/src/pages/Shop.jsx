import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
};



const Shop = () => {
    const { products } = useProducts();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    const filteredProducts = query
        ? products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        )
        : products;

    return (
        <motion.div
            className="container"
            style={{ padding: '8rem 1rem 4rem' }}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <h1 className="section-title text-center" style={{ marginBottom: '3rem', fontSize: '3rem' }}>
                {query ? `Search Results for "${query}"` : 'All Collections'}
            </h1>
            <div className="grid-products">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className="text-center col-span-full">No products found matching your search.</p>
                )}
            </div>
        </motion.div>
    );
};

export default Shop;
