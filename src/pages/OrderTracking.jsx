import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import Button from '../components/Button';
import { Search, Package, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import './OrderTracking.css';

const OrderTracking = () => {
    const [searchMode, setSearchMode] = useState('id'); // 'id' or 'email'
    const [searchTerm, setSearchTerm] = useState('');
    const [foundOrders, setFoundOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [error, setError] = useState('');
    const { orders } = useOrders();

    const handleSearch = (e) => {
        e.preventDefault();
        setError('');
        setFoundOrders([]);
        setSelectedOrder(null);

        if (!searchTerm.trim()) {
            setError(`Please enter an ${searchMode === 'id' ? 'Order ID' : 'Email Address'}`);
            return;
        }

        const term = searchTerm.trim().toLowerCase();
        let results = [];

        if (searchMode === 'id') {
            const id = term.replace('#', '');
            const match = orders.find(o => String(o.id) === id);
            if (match) results = [match];
        } else {
            // Email search
            results = orders.filter(o => o.email?.toLowerCase() === term);
        }

        if (results.length > 0) {
            setFoundOrders(results);
            if (results.length === 1) {
                setSelectedOrder(results[0]);
            }
        } else {
            setError('No orders found with provided information.');
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

    const renderOrderDetails = (order) => {
        const currentStep = getStatusStep(order.status);

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="order-result-card"
            >
                <div className="result-header">
                    <div>
                        <h2>Order #{order.id}</h2>
                        <p className="order-date">Placed on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className={`status-badge-lg ${order.status.toLowerCase()}`}>
                        {order.status}
                    </div>
                </div>

                {order.status !== 'Cancelled' && (
                    <div className="progress-track">
                        <div className="progress-line">
                            <div className="progress-fill" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
                        </div>
                        {['Order Placed', 'Processing', 'Shipped', 'Delivered'].map((label, idx) => (
                            <div key={idx} className={`step ${currentStep >= idx ? 'active' : ''}`}>
                                <div className="step-dot"></div>
                                <span className="step-label">{label}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="order-items-preview">
                    <h3>Items in Shipment</h3>
                    {order.items.map((item, idx) => (
                        <div key={idx} className="track-item">
                            <span>{item.qty}x {item.name}</span>
                            <span>${(item.price ? item.price * item.qty : 0).toLocaleString()}</span>
                        </div>
                    ))}
                    <div className="track-total">
                        <span>Total Amount</span>
                        <span>${order.total.toLocaleString()}</span>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="order-tracking-page">
            <div className="tracking-container">
                <div className="tracking-header">
                    <h1>Track Your Order</h1>
                    <p>Enter your details below to check the status of your shipment.</p>

                    <div className="search-mode-toggle">
                        <button
                            className={`toggle-btn ${searchMode === 'id' ? 'active' : ''}`}
                            onClick={() => { setSearchMode('id'); setSearchTerm(''); setError(''); setFoundOrders([]); setSelectedOrder(null); }}
                        >
                            By Order ID
                        </button>
                        <button
                            className={`toggle-btn ${searchMode === 'email' ? 'active' : ''}`}
                            onClick={() => { setSearchMode('email'); setSearchTerm(''); setError(''); setFoundOrders([]); setSelectedOrder(null); }}
                        >
                            By Email
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSearch} className="tracking-form">
                    <div className="input-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            type={searchMode === 'id' ? 'text' : 'email'}
                            placeholder={searchMode === 'id' ? "Enter Order ID (e.g., 1001)" : "Enter Email Address"}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="tracking-input"
                        />
                    </div>
                    <Button type="submit" size="lg">
                        {searchMode === 'id' ? 'Track Order' : 'Find My Orders'}
                    </Button>
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

                {/* List of orders found via Email */}
                {!selectedOrder && foundOrders.length > 0 && (
                    <div className="found-orders-list">
                        <h3>Found {foundOrders.length} Order{foundOrders.length > 1 ? 's' : ''}</h3>
                        {foundOrders.map(order => (
                            <div key={order.id} className="order-list-item" onClick={() => setSelectedOrder(order)}>
                                <div className="list-item-info">
                                    <span className="list-item-id">Order #{order.id}</span>
                                    <span className="list-item-date">{new Date(order.date).toLocaleDateString()}</span>
                                </div>
                                <div className={`status-badge-sm ${order.status.toLowerCase()}`}>
                                    {order.status}
                                </div>
                                <div className="list-item-total">${order.total.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Single Order Details */}
                {selectedOrder && (
                    <div>
                        {foundOrders.length > 1 && (
                            <button className="back-to-list-btn" onClick={() => setSelectedOrder(null)}>
                                &larr; Back to Order List
                            </button>
                        )}
                        {renderOrderDetails(selectedOrder)}
                    </div>
                )}
            </div>
        </div>
    );


    export default OrderTracking;
};
