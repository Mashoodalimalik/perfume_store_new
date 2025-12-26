import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import './Home.css';

import BackgroundPaths from '../components/BackgroundPaths';

const Home = () => {
    const { products } = useProducts();
    const heroRef = useRef(null);

    // Get first 3 products for featured section
    const featuredProducts = products.filter(p => p.category === "Floral" || p.price > 120).slice(0, 3);
    // If filter doesn't get enough, just take the first 3
    const finalFeaturedProducts = featuredProducts.length < 3 ? products.slice(0, 3) : featuredProducts;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-page"
        >
            <section className="hero" ref={heroRef}>
                {/* Background Paths */}
                <div className="background-paths-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                    <BackgroundPaths title="" />
                </div>



                {/* 3D Bottle - Replaced with Static Image */}
                <div className="hero-image-container">
                    <img
                        src="/images/hero_perfume.png"
                        alt="Perfume Bottle"
                    />
                </div>


                <div className="hero-content" style={{ zIndex: 2, position: 'relative' }}>
                    <h1>
                        Essence of Elegance
                    </h1>
                    <p>
                        Discover scents that tell your story. Crafted with passion, worn with pride.
                    </p>
                    <div>
                        <Link to="/shop">
                            <Button size="lg">Shop Collection</Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="featured-products container">
                <div className="section-header">
                    <h2>Featured Collections</h2>
                    <p>Handpicked favorites for specialized occasions.</p>
                </div>
                <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {finalFeaturedProducts.length > 0 ? (
                        finalFeaturedProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p>Loading featured products...</p>
                    )}
                </div>
            </section>

            <section className="banner">
                <div className="banner-content">
                    <h2>The Art of Perfumery</h2>
                    <p>Experience the finest ingredients sourced from around the globe.</p>
                    <Link to="/about">
                        <Button variant="secondary" className="banner-btn">Our Story</Button>
                    </Link>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
