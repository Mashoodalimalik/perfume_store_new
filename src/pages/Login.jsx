import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import './CustomerAuth.css';

const Login = () => {
    const [formData, setFormData] = useState({ identifier: '', password: '' });
    const [error, setError] = useState('');
    const { customerLogin, adminLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for Admin Login
        if (formData.identifier.toLowerCase() === 'admin') {
            if (adminLogin(formData.identifier, formData.password)) {
                navigate('/admin/dashboard');
                return;
            } else {
                setError('Invalid admin credentials');
                return;
            }
        }

        // Customer Login
        const result = customerLogin(formData.identifier, formData.password);
        if (result.success) {
            navigate('/'); // Redirect to home or dashboard
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Welcome Back</h1>
                <p className="auth-subtitle">Sign in to access your account</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email or Username</label>
                        <input
                            type="text"
                            required
                            value={formData.identifier}
                            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                            className="auth-input"
                            placeholder="enter your email or username"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="auth-input"
                        />
                    </div>

                    {error && <p className="auth-error">{error}</p>}

                    <Button type="submit" style={{ width: '100%' }}>Sign In</Button>
                </form>

                <p className="auth-footer">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
