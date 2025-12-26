import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { Trash2, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import './Wishlist.css';

const Wishlist = () => {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    if (wishlistItems.length === 0) {
        return (
            <div className="wishlist-empty">
                <h2>Your Wishlist is Empty</h2>
                <p>Save your favorite scents here to revisit them later.</p>
                <Link to="/shop">
                    <Button variant="primary">Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="wishlist-page container">
            <h1 className="wishlist-title">My Wishlist</h1>
            <div className="wishlist-grid">
                {wishlistItems.map((item) => (
                    <motion.div
                        key={item.id}
                        className="wishlist-item"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        layout
                    >
                        <Link to={`/product/${item.id}`} className="wishlist-image-container">
                            <img src={item.image} alt={item.name} className="wishlist-image" />
                        </Link>
                        <div className="wishlist-info">
                            <Link to={`/product/${item.id}`}>
                                <h3 className="wishlist-name">{item.name}</h3>
                            </Link>
                            <p className="wishlist-price">${item.price.toFixed(2)}</p>
                            <div className="wishlist-actions">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => addToCart(item)}
                                    className="wishlist-add-btn"
                                >
                                    <ShoppingBag size={16} /> Add to Cart
                                </Button>
                                <button
                                    className="wishlist-remove-btn"
                                    onClick={() => removeFromWishlist(item.id)}
                                    aria-label="Remove from wishlist"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
