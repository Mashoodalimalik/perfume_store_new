import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useAuditLogs } from '../../context/AuditLogContext';
import Button from '../../components/Button';
import { Plus, Edit, Trash2, X, Check, Upload } from 'lucide-react';

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
        gallery: [],
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
        setFormData({ name: '', category: '', price: '', image: '', gallery: [], collections: [] });
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
            gallery: product.gallery || [],
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

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGalleryUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const base64Files = await Promise.all(files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        }));

        setFormData(prev => ({
            ...prev,
            gallery: [...prev.gallery, ...base64Files]
        }));
    };

    const removeGalleryImage = (index) => {
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.filter((_, i) => i !== index)
        }));
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

        if (!formData.image) {
            alert("Please upload an image for the product.");
            return;
        }

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
                                    <img src={product.image} alt={product.name} className="product-thumb" />
                                </td>
                                <td style={{ color: '#e0e0e0' }}>{product.name}</td>
                                <td style={{ color: '#aaa' }}>{product.category}</td>
                                <td style={{ fontWeight: '600' }}>${product.price}</td>
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
                                <label>Main Product Image</label>
                                <div className="image-upload-wrapper" style={{ border: '2px dashed #ddd', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        id="image-upload"
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="image-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                        {formData.image ? (
                                            <div style={{ position: 'relative' }}>
                                                <img src={formData.image} alt="Preview" style={{ maxHeight: '150px', borderRadius: '8px' }} />
                                                <div style={{ marginTop: '8px', fontSize: '0.9rem', color: '#666' }}>Click to change main image</div>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload size={32} color="#888" />
                                                <span style={{ color: '#666' }}>Click to upload main image</span>
                                            </>
                                        )}
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Additional Images (Gallery)</label>
                                <div className="image-upload-wrapper" style={{ border: '2px dashed #ddd', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleGalleryUpload}
                                        id="gallery-upload"
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="gallery-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                                        <Upload size={24} color="#888" />
                                        <span style={{ color: '#666' }}>Click to upload additional images</span>
                                    </label>

                                    {formData.gallery.length > 0 && (
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '8px', width: '100%' }}>
                                            {formData.gallery.map((img, index) => (
                                                <div key={index} style={{ position: 'relative', aspectRatio: '1' }}>
                                                    <img src={img} alt={`Gallery ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeGalleryImage(index)}
                                                        style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
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
