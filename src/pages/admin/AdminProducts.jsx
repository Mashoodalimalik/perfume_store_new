import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useAuditLogs } from '../../context/AuditLogContext';
import Button from '../../components/Button';
import { Plus, Edit, Trash2, X, Check } from 'lucide-react';

const AdminProducts = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const { addLog } = useAuditLogs();

    // UI State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        image: '',
        collections: []
    });

    const COLLECTION_OPTIONS = [
        { label: 'New Arrival', value: 'new-arrival' },
        { label: 'Sale', value: 'sale' },
        { label: 'Gift Set', value: 'gift-set' },
        { label: 'Best Seller', value: 'best-seller' }
    ];

    const openAddModal = () => {
        setIsEditing(false);
        setFormData({ name: '', category: '', price: '', image: '', collections: [] });
        setIsModalOpen(true);
    };

    const openEditModal = (product) => {
        setIsEditing(true);
        setCurrentId(product.id);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            collections: product.collections || []
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentId(null);
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
            updateProduct(currentId, productData);
            addLog('Updated Product', `Updated product: ${productData.name} (ID: ${currentId})`);
        } else {
            addProduct(productData);
            addLog('Added Product', `Added new product: ${productData.name}`);
        }
        closeModal();
    };

    const handleDelete = (product) => {
        if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
            deleteProduct(product.id);
            addLog('Deleted Product', `Deleted product: ${product.name} (ID: ${product.id})`);
        }
    };

    return (
        <div className="admin-products">
            <header className="admin-page-header">
                <h1>Product Management</h1>
                <Button onClick={openAddModal}>
                    <Plus size={18} /> Add Product
                </Button>
            </header>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Collections</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>${product.price}</td>
                                <td>
                                    {product.collections?.map(c => (
                                        <span key={c} className="badge" style={{ marginRight: '5px', fontSize: '10px' }}>
                                            {c.replace('-', ' ')}
                                        </span>
                                    ))}
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button onClick={() => openEditModal(product)} className="action-btn edit" title="Edit">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(product)} className="action-btn delete" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                            <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="product-form">
                            <div className="form-group">
                                <label>Product Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category</label>
                                    <input type="text" name="category" value={formData.category} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Price ($)</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" step="0.01" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Image URL</label>
                                <input type="text" name="image" value={formData.image} onChange={handleInputChange} required />
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
                            <div className="form-actions" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                                <Button type="submit">
                                    {isEditing ? 'Update' : 'Create'}
                                </Button>
                                <Button type="button" variant="secondary" onClick={closeModal}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
