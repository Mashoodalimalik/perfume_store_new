import React from 'react';
import { useOrders } from '../../context/OrderContext';
import { useAuditLogs } from '../../context/AuditLogContext';

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
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processed">Processed</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
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
