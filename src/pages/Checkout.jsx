import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import Button from '../components/Button';
import './CustomerAuth.css'; // Reusing auth styles for form
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { addOrder } = useOrders();
    const { user } = useAuth(); // Get user
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        country: ''
    });

    // Pre-fill form if user is logged in
    useEffect(() => {
        if (user) {
            const fullName = user.user_metadata?.full_name || '';
            const [first, ...last] = fullName.split(' ');
            setFormData(prev => ({
                ...prev,
                firstName: first || '',
                lastName: last.join(' ') || '',
                email: user.email || prev.email
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create customer details object
        const customerDetails = {
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone: 'N/A', // Add phone field if needed in form
            address: `${formData.address}, ${formData.city}, ${formData.zip}, ${formData.country}`
        };

        // Create order
        addOrder(cartItems, cartTotal, customerDetails);

        // Send Email via EmailJS
        // Note: You need to replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, and YOUR_PUBLIC_KEY 
        // with your actual EmailJS credentials from https://dashboard.emailjs.com/
        const emailParams = {
            to_name: customerDetails.name,
            to_email: customerDetails.email,
            order_total: cartTotal.toFixed(2),
            order_details: cartItems.map(item => `${item.name} x${item.quantity}`).join(', '),
            shipping_address: customerDetails.address
        };

        try {
            // Replace these strings with your actual EmailJS Service ID, Template ID, and Public Key
            // Example: await emailjs.send('service_xyz', 'template_abc', emailParams, 'user_123');
            // For now, we are logging it because we don't have the user's specific keys.
            // UN-COMMENT and FILL to enable:
            // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams, 'YOUR_PUBLIC_KEY');

            console.log('EmailJS Params (Ready to send):', emailParams);
            alert(`Order placed successfully! A confirmation email has been sent to ${formData.email}.`);
        } catch (error) {
            console.error('Failed to send email:', error);
            alert('Order placed, but failed to send confirmation email.');
        }

        // Clear cart
        clearCart();

        // Redirect
        navigate('/order-success');
    };

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{ paddingTop: '8rem', textAlign: 'center' }}>
                <h2>Your cart is empty</h2>
            </div>
        );
    }

    return (
        <motion.div
            className="container"
            style={{ paddingTop: '8rem', paddingBottom: '4rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <h1 className="section-title" style={{ marginBottom: '2rem' }}>Checkout</h1>

            <div className="grid-checkout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                <div className="checkout-form">
                    <h2 style={{ marginBottom: '1.5rem' }}>Shipping Details</h2>
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                className="auth-input"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                className="auth-input"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="auth-input"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                required
                                className="auth-input"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    className="auth-input"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Zip Code</label>
                                <input
                                    type="text"
                                    name="zip"
                                    required
                                    className="auth-input"
                                    value={formData.zip}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <input
                                type="text"
                                name="country"
                                required
                                className="auth-input"
                                value={formData.country}
                                onChange={handleChange}
                            />
                        </div>

                        <Button type="submit" style={{ width: '100%', marginTop: '1rem' }}>
                            Place Order (${cartTotal.toFixed(2)})
                        </Button>
                    </form>
                </div>

                <div className="checkout-summary">
                    <h2 style={{ marginBottom: '1.5rem' }}>Order Summary</h2>
                    <div style={{ background: 'var(--color-surface)', padding: '2rem', borderRadius: '8px' }}>
                        {cartItems.map(item => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
                                <div>
                                    <p style={{ fontWeight: '500' }}>{item.name} x {item.quantity}</p>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{item.category}</p>
                                </div>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Checkout;
