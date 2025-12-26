import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Star, Share2, Heart } from 'lucide-react';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getProduct } = useProducts();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = () => {
            const foundProduct = getProduct(id);
            setProduct(foundProduct);
            setLoading(false);
        };
        fetchProduct();
    }, [id, getProduct]);

    if (loading) {
        return <div className="loading-state">Loading...</div>;
    }

    if (!product) {
        return (
            <div className="error-state">
                <h2>Product not found</h2>
                <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="product-details-page">
            <div className="container">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <ArrowLeft size={20} /> Back
                </button>

                <div className="product-details-grid">
                    <motion.div
                        className="product-gallery"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="main-image-container">
                            <img src={product.image} alt={product.name} className="main-image" />
                        </div>
                    </motion.div>

                    <motion.div
                        className="product-info-section"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="product-header">
                            <h1 className="product-title">{product.name}</h1>
                            <div className="product-meta">
                                <span className="product-category-badge">{product.category}</span>
                                <div className="rating">
                                    <Star size={16} fill="#FFD700" color="#FFD700" />
                                    <span>4.8 (120 reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div className="product-price-section">
                            <span className="price">${product.price.toFixed(2)}</span>
                        </div>

                        <p className="product-description">
                            Experience the essence of luxury with {product.name}.
                            This exquisite fragrance features notes of {product.category.toLowerCase()},
                            carefully blended to create a lasting impression. Perfect for any occasion.
                        </p>

                        <div className="product-actions">
                            <Button
                                variant="primary"
                                size="lg"
                                className="add-to-cart-btn"
                                onClick={handleAddToCart}
                            >
                                <ShoppingBag size={20} style={{ marginRight: '8px' }} />
                                Add to Cart
                            </Button>
                            <button className="wishlist-btn" aria-label="Add to wishlist">
                                <Heart size={24} />
                            </button>
                            <button className="share-btn" aria-label="Share">
                                <Share2 size={24} />
                            </button>
                        </div>

                        <div className="product-features">
                            <div className="feature-item">
                                <h4>Long Lasting</h4>
                                <p>Up to 12 hours of scent</p>
                            </div>
                            <div className="feature-item">
                                <h4>Premium Ingredients</h4>
                                <p>Sourced from France</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
