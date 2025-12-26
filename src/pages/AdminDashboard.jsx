import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useOrders } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Plus, Trash2, Edit2, CheckCircle, Package, DollarSign, Users, LogOut } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { adminLogout } = useAuth();
    const navigate = useNavigate();
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const { orders, updateOrderStatus } = useOrders();

    const [activeTab, setActiveTab] = useState('products');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        image: '',
        description: ''
    });

    const handleLogout = () => {
        adminLogout();
        navigate('/admin/login');
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setFormData({ name: '', category: '', price: '', image: '', description: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setFormData({ ...product });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            ...formData,
            price: parseFloat(formData.price)
        };

        if (editingProduct) {
            updateProduct(editingProduct.id, productData);
        } else {
            addProduct(productData);
        }
        setIsModalOpen(false);
    };

    // Stats
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;

    return (
        <div className="admin-dashboard">
            <div className="admin-sidebar">
                <h2>Admin Panel</h2>
                <nav>
                    <button
                        className={activeTab === 'products' ? 'active' : ''}
                        onClick={() => setActiveTab('products')}
                    >
                        <Package size={20} /> Products
                    </button>
                    <button
                        className={activeTab === 'orders' ? 'active' : ''}
                        onClick={() => setActiveTab('orders')}
                    >
                        <CheckCircle size={20} /> Orders
                    </button>
                    <button
                        className={activeTab === 'insights' ? 'active' : ''}
                        onClick={() => setActiveTab('insights')}
                    >
                        <Users size={20} /> Insights
                    </button>
                </nav>
                <div className="logout-container">
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </div>

            <div className="admin-content">
                <header className="admin-header">
                    <h1>
                        {activeTab === 'products' && 'Product Management'}
                        {activeTab === 'orders' && 'Order Management'}
                        {activeTab === 'insights' && 'Store Insights'}
                    </h1>
                </header>

                <div className="admin-main">
                    {/* Products Tab */}
                    {activeTab === 'products' && (
                        <div className="products-view">
                            <div className="view-actions">
                                <Button onClick={openAddModal}><Plus size={18} /> Add Product</Button>
                            </div>
                            <div className="admin-table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product.id}>
                                                <td><img src={product.image} alt={product.name} className="table-img" /></td>
                                                <td>{product.name}</td>
                                                <td>{product.category}</td>
                                                <td>${product.price.toFixed(2)}</td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <button className="icon-btn edit" onClick={() => openEditModal(product)}><Edit2 size={18} /></button>
                                                        <button className="icon-btn delete" onClick={() => deleteProduct(product.id)}><Trash2 size={18} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div className="orders-view">
                            {orders.length === 0 ? <p>No orders yet.</p> : (
                                <div className="admin-table-container">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Date</th>
                                                <th>Customer</th>
                                                <th>Total</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(order => (
                                                <tr key={order.id}>
                                                    <td>#{order.id}</td>
                                                    <td>{new Date(order.date).toLocaleDateString()}</td>
                                                    <td>{order.customer}</td>
                                                    <td>${order.total.toFixed(2)}</td>
                                                    <td>
                                                        <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
                                                    </td>
                                                    <td>
                                                        {order.status === 'Pending' && (
                                                            <Button size="sm" onClick={() => updateOrderStatus(order.id, 'Processed')}>
                                                                Mark Processed
                                                            </Button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Insights Tab */}
                    {activeTab === 'insights' && (
                        <div className="insights-view">
                            <div className="stat-card">
                                <div className="stat-icon"><DollarSign size={24} /></div>
                                <div className="stat-info">
                                    <h3>Total Sales</h3>
                                    <p>${totalSales.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon"><Package size={24} /></div>
                                <div className="stat-info">
                                    <h3>Total Orders</h3>
                                    <p>{totalOrders}</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon"><CheckCircle size={24} /></div>
                                <div className="stat-info">
                                    <h3>Total Products</h3>
                                    <p>{totalProducts}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Product Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <input required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Image URL</label>
                                <input required value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                            </div>
                            <div className="modal-actions">
                                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button type="submit">{editingProduct ? 'Update' : 'Add'}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
