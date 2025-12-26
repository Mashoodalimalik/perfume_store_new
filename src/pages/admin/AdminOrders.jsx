import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { useAuditLogs } from '../../context/AuditLogContext';
import Button from '../../components/Button';
import { Trash2 } from 'lucide-react';

const AdminOrders = () => {
    const { orders, updateOrderStatus, deleteOrder } = useOrders();
    const { addLog } = useAuditLogs();
    const navigate = useNavigate();

    const handleStatusChange = (orderId, newStatus) => {
        updateOrderStatus(orderId, newStatus);
        addLog('Updated Order Status', `Changed order #${orderId} status to ${newStatus}`);
    };

    const handleDeleteOrder = (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            deleteOrder(orderId);
            addLog('Deleted Order', `Deleted order #${orderId}`);
        }
    };

    return (
        <div className="admin-orders">
            <header className="admin-page-header">
                <h1>Order Management</h1>
            </header>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td style={{ color: '#d4af37', fontWeight: 'bold' }}>#{order.id}</td>
                                <td>
                                    <div style={{ color: '#fff', fontWeight: '500' }}>{order.customer}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{order.email || 'customer@example.com'}</div>
                                </td>
                                <td style={{ color: '#aaa' }}>{new Date(order.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                <td>
                                    <div style={{ fontSize: '0.9rem', color: '#e0e0e0' }}>
                                        {order.items[0]?.qty}x {order.items[0]?.name}
                                        {order.items.length > 1 && <span style={{ color: '#888', marginLeft: '4px', fontSize: '0.8rem' }}>+{order.items.length - 1} more</span>}
                                    </div>
                                </td>
                                <td style={{ fontWeight: '600', color: '#fff' }}>${order.total.toFixed(2)}</td>
                                <td>
                                    <span className={`status-badge-pill ${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <select
                                            value={order.status}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            style={{
                                                padding: '6px 12px',
                                                borderRadius: '20px',
                                                border: '1px solid #444',
                                                background: '#242424',
                                                color: '#e0e0e0',
                                                fontSize: '0.85rem',
                                                cursor: 'pointer',
                                                outline: 'none'
                                            }}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => navigate(`/admin/orders/${order.id}`)}
                                            style={{
                                                borderRadius: '20px',
                                                padding: '6px 16px',
                                                fontSize: '0.75rem',
                                                borderColor: '#666',
                                                color: '#e0e0e0'
                                            }}
                                        >
                                            DETAILS
                                        </Button>
                                        <button
                                            onClick={() => handleDeleteOrder(order.id)}
                                            title="Delete Order"
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: '#ff6b6b',
                                                cursor: 'pointer',
                                                padding: '6px',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;
