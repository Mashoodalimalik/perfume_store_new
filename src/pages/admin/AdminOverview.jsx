import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';
import { Users, ShoppingCart, DollarSign, AlertTriangle } from 'lucide-react';
import './Admin.css'; // Ensure styling is applied

const AdminOverview = () => {
    const { products } = useProducts();
    const { orders } = useOrders();

    // Stats Calculations
    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
    const ordersThisMonth = orders.length; // Simply using count for now as per sample
    const totalCustomers = new Set(orders.map(o => o.customer)).size;
    const lowStockItems = products.filter(p => p.stock && p.stock < 5);

    return (
        <div className="admin-overview">
            <header className="admin-page-header">
                {/* Header is visually hidden in screenshot or minimal */}
                {/* <h1>Dashboard</h1> */}
            </header>

            {/* Top Stats Row */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-header">
                        <span className="stat-title">Total Revenue</span>
                        <div className="stat-icon-circle green">
                            <DollarSign size={20} />
                        </div>
                    </div>
                    <div className="stat-value">Rs. {totalRevenue.toLocaleString()}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <span className="stat-title">Orders This Month</span>
                        <div className="stat-icon-circle blue">
                            <ShoppingCart size={20} />
                        </div>
                    </div>
                    <div className="stat-value">{ordersThisMonth}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <span className="stat-title">Total Customers</span>
                        <div className="stat-icon-circle purple">
                            <Users size={20} />
                        </div>
                    </div>
                    <div className="stat-value">{totalCustomers}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <span className="stat-title">Low Stock Items</span>
                        <div className="stat-icon-circle orange">
                            <AlertTriangle size={20} />
                        </div>
                    </div>
                    <div className="stat-value">{lowStockItems.length}</div>
                </div>
            </div>

            <div className="dashboard-content">
                {/* Recent Orders Section */}
                <section className="orders-section">
                    <h2 className="section-title">Recent Orders</h2>
                    <div className="orders-list">
                        {orders.slice(0, 4).map(order => (
                            <div key={order.id} className="order-item">
                                <div className="order-info">
                                    <h4>{order.customer}</h4>
                                    <div className="order-date">{new Date(order.date).toLocaleDateString()}</div>
                                </div>
                                <div className="order-meta">
                                    <span className="order-amount">Rs. {order.total.toLocaleString()}</span>
                                    <span className={`status-badge-pill ${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Inventory Alerts Section */}
                <section className="inventory-section">
                    <h2 className="section-title">
                        <AlertTriangle size={20} color="#e67700" />
                        Inventory Alerts
                    </h2>
                    <div className="inventory-list">
                        {lowStockItems.map(item => (
                            <div key={item.id} className="stock-item">
                                <img src={item.image} alt={item.name} className="stock-image" />
                                <div className="stock-info">
                                    <div className="stock-name">{item.name}</div>
                                    <div className="stock-alert">Only {item.stock} left</div>
                                </div>
                            </div>
                        ))}
                        {lowStockItems.length === 0 && (
                            <p style={{ color: '#666', fontStyle: 'italic' }}>No inventory alerts.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminOverview;
