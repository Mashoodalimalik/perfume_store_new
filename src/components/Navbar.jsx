import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const { user, customerLogout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        customerLogout();
        navigate('/');
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <Link to="/" className="logo">
                    L'ESSENCE
                </Link>

                {/* Desktop Menu */}
                <div className="nav-links desktop-only">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                    <NavLink to="/shop">Collections</NavLink>
                    <NavLink to="/about">Our Story</NavLink>
                </div>

                <div className="nav-actions">
                    <button className="icon-btn" aria-label="Search">
                        <Search size={20} />
                    </button>

                    {user ? (
                        <div className="user-menu">
                            <span className="user-greeting">Hi, {user.name.split(' ')[0]}</span>
                            <button className="icon-btn" onClick={handleLogout} aria-label="Logout">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="icon-btn" aria-label="Account">
                            <User size={20} />
                        </Link>
                    )}

                    <Link to="/cart" className="icon-btn cart-btn" aria-label="Cart">
                        <ShoppingBag size={20} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                    <button
                        className="icon-btn mobile-only"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <div className="mobile-links">
                        <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
                        <NavLink to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Collections</NavLink>
                        <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>Our Story</NavLink>
                        {!user && (
                            <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</NavLink>
                        )}
                        {user && (
                            <button className="mobile-logout-btn" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>
                                Logout ({user.name})
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
