import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { useAuditLogs } from '../../context/AuditLogContext';
import Button from '../../components/Button';
import { ArrowLeft, User, MapPin, Mail, Phone, Package, Calendar, CreditCard } from 'lucide-react';
import './AdminOrderDetails.css';

const AdminOrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { orders, updateOrderStatus } = useOrders();
    const { addLog } = useAuditLogs();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const foundOrder = orders.find(o => o.id === id || o.id === parseInt(id));
        setOrder(foundOrder);
    }, [id, orders]);

    if (!order) {
        return <div className="admin-order-not-found">Order not found</div>;
    }

    const handleStatusChange = (newStatus) => {
        updateOrderStatus(order.id, newStatus);
        addLog('Updated Order Status', `Changed order #${order.id} status to ${newStatus}`);
    };

    return (
        <div className="admin-order-details">
            <header className="page-header">
                <button onClick={() => navigate('/admin/orders')} className="back-link">
                    <ArrowLeft size={20} /> Back to Orders
                </button>
                <div className="header-content">
                    <h1>Order #{order.id}</h1>
                    <div className="status-control">
                        <span className="label">Status:</span>
                        <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            className={`status-select ${order.status.toLowerCase()}`}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </header>

            <div className="order-grid">
                <div className="order-main">
                    <section className="detail-card">
                        <h2>Order Items</h2>
                        <div className="order-items-list">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="order-item">
                                    <div className="item-image-placeholder">
                                        {/* Placeholder or actual image if available in context */}
                                        <Package size={24} color="#94a3b8" />
                                    </div>
                                    <div className="item-details">
                                        <h3>{item.name}</h3>
                                        <p>Qty: {item.qty}</p>
                                    </div>
                                    <div className="item-price">
                                        ${(item.price || (order.total / item.qty)).toFixed(2)} {/* Fallback price calculation */}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="order-summary">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${order.total.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="order-sidebar">
                    <section className="detail-card customer-info">
                        <h2>Customer Details</h2>
                        <div className="info-group">
                            <div className="icon"><User size={18} /></div>
                            <div>
                                <label>Name</label>
                                <p>{order.customer}</p>
                            </div>
                        </div>
                        <div className="info-group">
                            <div className="icon"><Mail size={18} /></div>
                            <div>
                                <label>Email</label>
                                <p>{order.email || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="info-group">
                            <div className="icon"><Phone size={18} /></div>
                            <div>
                                <label>Phone</label>
                                <p>{order.phone || 'N/A'}</p>
                            </div>
                        </div>
                    </section>

                    <section className="detail-card shipping-info">
                        <h2>Shipping Address</h2>
                        <div className="info-group">
                            <div className="icon"><MapPin size={18} /></div>
                            <div>
                                <p>{order.address || 'No address provided'}</p>
                            </div>
                        </div>
                    </section>

                    <section className="detail-card order-meta">
                        <h2>Order Info</h2>
                        <div className="info-group">
                            <div className="icon"><Calendar size={18} /></div>
                            <div>
                                <label>Date Placed</label>
                                <p>{new Date(order.date).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="info-group">
                            <div className="icon"><CreditCard size={18} /></div>
                            <div>
                                <label>Payment Method</label>
                                <p>Cash on Delivery</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderDetails;
