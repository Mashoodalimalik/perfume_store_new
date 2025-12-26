import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Button from './Button';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigation if clicking the button inside a Link wrapper
        addToCart(product);
    };

    return (
        <motion.div
            className="product-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
        >
            <Link to={`/product/${product.id}`} className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-overlay">
                    <Button variant="primary" size="sm" className="quick-view-btn">
                        View Details
                    </Button>
                </div>
            </Link>

            <div className="product-info">
                <h3 className="product-name">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                </h3>
                <p className="product-category">{product.category}</p>
                <div className="product-footer">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    <button
                        className="add-to-cart-icon"
                        aria-label="Add to cart"
                        onClick={handleAddToCart}
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
