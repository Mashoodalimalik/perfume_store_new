import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import Button from '../components/Button';
import { Search, Package, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import './OrderTracking.css';

const OrderTracking = () => {
    const [orderId, setOrderId] = useState('');
    const [foundOrder, setFoundOrder] = useState(null);
    const [error, setError] = useState('');
    const { orders } = useOrders();

    const handleSearch = (e) => {
        e.preventDefault();
        setError('');
        setFoundOrder(null);

        if (!orderId.trim()) {
            setError('Please enter an Order ID');
            return;
        }

        // Basic clean up of input
        const searchId = orderId.replace('#', '').trim();
        
        // Find order - handle both string and number IDs
        const order = orders.find(o => String(o.id) === String(searchId));

        if (order) {
            setFoundOrder(order);
        } else {
            setError('Order not found. Please check your Order ID and try again.');
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return <Clock size={40} className="status-icon pending" />;
            case 'processing': return <Package size={40} className="status-icon processing" />;
            case 'shipped': return <Truck size={40} className="status-icon shipped" />;
            case 'delivered': return <CheckCircle size={40} className="status-icon delivered" />;
            case 'cancelled': return <XCircle size={40} className="status-icon cancelled" />;
            default: return <Clock size={40} />;
        }
    };

    const getStatusStep = (currentStatus) => {
        const statuses = ['pending', 'processing', 'shipped', 'delivered'];
        const status = currentStatus.toLowerCase();
        if (status === 'cancelled') return -1;
        return statuses.indexOf(status);
    };

    const currentStep = foundOrder ? getStatusStep(foundOrder.status) : 0;

    return (
        <div className="order-tracking-page">
            <div className="tracking-container">
                <div className="tracking-header">
                    <h1>Track Your Order</h1>
                    <p>Enter your Order ID to see the current status of your shipment.</p>
                </div>

                <form onSubmit={handleSearch} className="tracking-form">
                    <div className="input-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Enter Order ID (e.g., 1001)"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            className="tracking-input"
                        />
                    </div>
                    <Button type="submit" size="lg">Track Order</Button>
                </form>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="error-message"
                    >
                        {error}
                    </motion.div>
                )}

                {foundOrder && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="order-result-card"
                    >
                        <div className="result-header">
                            <div>
                                <h2>Order #{foundOrder.id}</h2>
                                <p className="order-date">Placed on {new Date(foundOrder.date).toLocaleDateString()}</p>
                            </div>
                            <div className={`status-badge-lg ${foundOrder.status.toLowerCase()}`}>
                                {foundOrder.status}
                            </div>
                        </div>

                        {foundOrder.status !== 'Cancelled' && (
                            <div className="progress-track">
                                <div className="progress-line">
                                    <div className="progress-fill" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
                                </div>
                                <div className={`step ${currentStep >= 0 ? 'active' : ''}`}>
                                    <div className="step-dot"></div>
                                    <span className="step-label">Order Placed</span>
                                </div>
                                <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                                    <div className="step-dot"></div>
                                    <span className="step-label">Processing</span>
                                </div>
                                <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                                    <div className="step-dot"></div>
                                    <span className="step-label">Shipped</span>
                                </div>
                                <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                                    <div className="step-dot"></div>
                                    <span className="step-label">Delivered</span>
                                </div>
                            </div>
                        )}

                        <div className="order-items-preview">
                            <h3>Items in Shipment</h3>
                            {foundOrder.items.map((item, idx) => (
                                <div key={idx} className="track-item">
                                    <span>{item.qty}x {item.name}</span>
                                    <span>${(item.price ? item.price * item.qty : 0).toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="track-total">
                                <span>Total Amount</span>
                                <span>${foundOrder.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default OrderTracking;
