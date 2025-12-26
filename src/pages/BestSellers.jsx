import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

const BestSellers = () => {
    const { products } = useProducts();
    const bestSellers = products.filter(p => p.collections?.includes('best-seller'));

    return (
        <motion.div
            className="container"
            style={{ padding: '8rem 1rem 4rem' }}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <h1 className="section-title text-center" style={{ marginBottom: '3rem', fontSize: '3rem' }}>Best Sellers</h1>
            <div className="grid-products">
                {bestSellers.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {bestSellers.length === 0 && (
                <p className="text-center" style={{ color: 'var(--color-text-secondary)' }}>No best sellers at the moment.</p>
            )}
        </motion.div>
    );
};

export default BestSellers;
