import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { Plus, Edit, Trash2, X, Check } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const { adminLogout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        image: '',
        collections: []
    });

    const resetForm = () => {
        setFormData({ name: '', category: '', price: '', image: '', collections: [] });
        setIsEditing(false);
        setCurrentProduct(null);
    };

    const handleEditClick = (product) => {
        setIsEditing(true);
        setCurrentProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            collections: product.collections || []
        });
    };

    const handleDeleteClick = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCollectionChange = (collection) => {
        if (formData.collections.includes(collection)) {
            setFormData({
                ...formData,
                collections: formData.collections.filter(c => c !== collection)
            });
        } else {
            setFormData({
                ...formData,
                collections: [...formData.collections, collection]
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            ...formData,
            price: parseFloat(formData.price)
        };

        if (isEditing) {
            updateProduct(currentProduct.id, productData);
        } else {
            addProduct(productData);
        }
        resetForm();
    };

    const COLLECTION_OPTIONS = [
        { label: 'New Arrival', value: 'new-arrival' },
        { label: 'Sale', value: 'sale' },
        { label: 'Gift Set', value: 'gift-set' },
        { label: 'Best Seller', value: 'best-seller' }
    ];

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
                <Button onClick={adminLogout} variant="secondary">Logout</Button>
            </header>

            <div className="admin-content container">
                <section className="product-form-section">
                    <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                    <form onSubmit={handleSubmit} className="product-form">
                        <div className="form-group">
                            <label>Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Price ($)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Image URL</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                placeholder="/images/your-image.png"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Collections</label>
                            <div className="checkbox-group">
                                {COLLECTION_OPTIONS.map(option => (
                                    <label key={option.value} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.collections.includes(option.value)}
                                            onChange={() => handleCollectionChange(option.value)}
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-actions">
                            <Button type="submit">
                                {isEditing ? <Check size={18} /> : <Plus size={18} />}
                                {isEditing ? 'Update Product' : 'Add Product'}
                            </Button>
                            {isEditing && (
                                <Button type="button" variant="secondary" onClick={resetForm}>
                                    <X size={18} /> Cancel
                                </Button>
                            )}
                        </div>
                    </form>
                </section>

                <section className="product-list-section">
                    <h2>Product Inventory</h2>
                    <div className="admin-product-list">
                        {products.map(product => (
                            <div key={product.id} className="admin-product-item">
                                <img src={product.image} alt={product.name} />
                                <div className="product-details">
                                    <h3>{product.name}</h3>
                                    <p>{product.category} - ${product.price}</p>
                                    <div className="product-badges">
                                        {product.collections && product.collections.map(c => (
                                            <span key={c} className="badge">{c.replace('-', ' ')}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="product-actions">
                                    <button onClick={() => handleEditClick(product)} className="action-btn edit" aria-label="Edit">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDeleteClick(product.id)} className="action-btn delete" aria-label="Delete">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
