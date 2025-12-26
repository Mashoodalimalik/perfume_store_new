import React from 'react';
import { useOrders } from '../../context/OrderContext';
import { useAuditLogs } from '../../context/AuditLogContext';
import Button from '../../components/Button';

const AdminOrders = () => {
    const { orders, updateOrderStatus } = useOrders();
    const { addLog } = useAuditLogs();

    const handleStatusChange = (orderId, newStatus) => {
        updateOrderStatus(orderId, newStatus);
        addLog('Updated Order Status', `Changed order #${orderId} status to ${newStatus}`);
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
                                <td>#{order.id}</td>
                                <td>{order.customer}</td>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                <td>
                                    <div style={{ fontSize: '0.9rem' }}>
                                        {order.items.map((item, idx) => (
                                            <div key={idx}>{item.qty}x {item.name}</div>
                                        ))}
                                    </div>
                                </td>
                                <td>${order.total.toFixed(2)}</td>
                                <td>
                                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <select
                                            value={order.status}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
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
                                            onClick={() => window.location.href = `/admin/orders/${order.id}`}
                                        // Using href or useNavigate if we import it, but Link is better. Let's stick to inline simple nav or just import Link. 
                                        // Actually I can't import Link easily inside this replace block without changing imports. 
                                        // Let's use window.location for now or I can add a Link import in a separate call. 
                                        // Wait, I can just use a simple button that navigates. 
                                        >
                                            View
                                        </Button>
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
