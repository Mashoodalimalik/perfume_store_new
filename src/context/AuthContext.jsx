import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Admin State
    const [isAdmin, setIsAdmin] = useState(() => {
        return localStorage.getItem('isAdmin') === 'true';
    });

    // Customer State
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Admin Login
    const adminLogin = (username, password) => {
        if (username === 'admin' && password === 'password123') {
            setIsAdmin(true);
            localStorage.setItem('isAdmin', 'true');
            return true;
        }
        return false;
    };

    const adminLogout = () => {
        setIsAdmin(false);
        localStorage.removeItem('isAdmin');
    };

    // Customer Auth
    const customerLogin = (email, password) => {
        // Simulate login - in real app, check against database
        // For demo, we just accept any non-empty input or check simulated users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            setUser({ name: foundUser.name, email: foundUser.email });
            localStorage.setItem('currentUser', JSON.stringify({ name: foundUser.name, email: foundUser.email }));
            return { success: true };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    const customerSignup = (name, email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already exists' };
        }

        const newUser = { name, email, password }; // obviously don't store plain passwords in real apps
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto login after signup
        setUser({ name, email });
        localStorage.setItem('currentUser', JSON.stringify({ name, email }));
        return { success: true };
    };

    const customerLogout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    return (
        <AuthContext.Provider value={{
            isAdmin,
            adminLogin,
            adminLogout,
            user,
            customerLogin,
            customerSignup,
            customerLogout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
