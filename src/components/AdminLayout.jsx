import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    ClipboardList,
    ExternalLink,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import '../pages/admin/Admin.css';

const AdminLayout = () => {
    const { adminLogout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    const handleLogout = () => {
        adminLogout();
        navigate('/admin/login');
    };

    return (
        <div className="admin-container">
            {/* Mobile Header */}
            <header className="admin-mobile-header">
                <button className="menu-toggle" onClick={toggleSidebar}>
                    <Menu size={24} />
                </button>
                <div className="admin-logo">Admin Panel</div>
            </header>

            {/* Sidebar Overlay */}
            <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={closeSidebar}></div>

            {/* Sidebar */}
            <aside className={`admin-sidebar ${isSidebarOpen ? 'active' : ''}`}>
                <div className="sidebar-header">
                    <h2>Store Admin</h2>
                    <button className="close-sidebar" onClick={closeSidebar}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <NavLink to="/admin/dashboard" className="nav-item" onClick={closeSidebar} end>
                        <LayoutDashboard size={20} />
                        <span>Overview</span>
                    </NavLink>
                    <NavLink to="/admin/products" className="nav-item" onClick={closeSidebar}>
                        <Package size={20} />
                        <span>Products</span>
                    </NavLink>
                    <NavLink to="/admin/orders" className="nav-item" onClick={closeSidebar}>
                        <ShoppingBag size={20} />
                        <span>Orders</span>
                    </NavLink>
                    <NavLink to="/admin/audit-logs" className="nav-item" onClick={closeSidebar}>
                        <ClipboardList size={20} />
                        <span>Audit Logs</span>
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <a href="/" className="nav-item view-store" target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={20} />
                        <span>View Store</span>
                    </a>
                    <button className="nav-item logout-btn" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={`admin-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                {!isSidebarOpen && (
                    <button
                        className="desktop-menu-toggle"
                        onClick={toggleSidebar}
                        style={{
                            position: 'fixed',
                            top: '20px',
                            left: '20px',
                            zIndex: 50,
                            background: '#1a1a1a',
                            border: '1px solid #333',
                            color: '#e0e0e0',
                            padding: '8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Menu size={24} />
                    </button>
                )}
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
