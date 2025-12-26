import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <h2 className="footer-logo">L'ESSENCE</h2>
                    <p className="footer-desc">
                        Crafting memories through scent. Experience the art of perfumery with our signature collections.
                    </p>
                    <div className="social-links">
                        <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                        <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <h3>Shop</h3>
                    <ul>
                        <li><Link to="/shop">Best Sellers</Link></li>
                        <li><Link to="/new-arrivals">New Arrivals</Link></li>
                        <li><Link to="/gift-sets">Gift Sets</Link></li>
                        <li><Link to="/sale">Sale</Link></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h3>Company</h3>
                    <ul>
                        <li><Link to="/about">Our Story</Link></li>
                        <li><Link to="/sustainability">Sustainability</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-newsletter">
                    <h3>Newsletter</h3>
                    <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Your email address" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} L'Essence. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
