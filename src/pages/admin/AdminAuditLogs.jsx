import React from 'react';
import { useAuditLogs } from '../../context/AuditLogContext';
import Button from '../../components/Button';
import { Trash2 } from 'lucide-react';

const AdminAuditLogs = () => {
    const { logs, clearLogs } = useAuditLogs();

    return (
        <div className="admin-audit-logs">
            <header className="admin-page-header">
                <h1>Audit Logs</h1>
                {logs.length > 0 && (
                    <Button variant="secondary" onClick={() => {
                        if (window.confirm('Clear all logs?')) clearLogs();
                    }}>
                        <Trash2 size={16} /> Clear Logs
                    </Button>
                )}
            </header>

            <div className="admin-table-container">
                {logs.length === 0 ? (
                    <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>No audit logs recorded yet.</p>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>User</th>
                                <th>Action</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map(log => (
                                <tr key={log.id}>
                                    <td style={{ color: '#666', fontSize: '0.85rem' }}>
                                        {new Date(log.timestamp).toLocaleString()}
                                    </td>
                                    <td style={{ color: '#888' }}>{log.user}</td>
                                    <td style={{ color: '#e0e0e0', fontWeight: '500' }}>{log.action}</td>
                                    <td style={{ color: '#aaa' }}>{log.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminAuditLogs;
