import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import './AdminLogin.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { adminLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (adminLogin(username, password)) {
            navigate('/admin/dashboard');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <h1>Admin Access</h1>
                <p>Please enter your credentials.</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="admin-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="admin-input"
                    />
                    {error && <p className="error-message">{error}</p>}
                    <Button type="submit" style={{ width: '100%' }}>Login</Button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
