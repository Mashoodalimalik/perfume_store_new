import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Admin State
    const [isAdmin, setIsAdmin] = useState(() => {
        return localStorage.getItem('isAdmin') === 'true';
    });

    // Customer State
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getSession();

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

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
    const customerLogin = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                return { success: false, message: error.message };
            }
            return { success: true, data };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    // Signup is now handled in Signup.jsx directly, but we can expose a helper if needed.
    // For consistency with legacy code, we can keep the function signature but warn or wrap it.
    // However, since we updated Signup.jsx to use supabase directly, we don't strictly need it here.
    // We'll leave a placeholder or just remove it if no other component uses it.
    // Checking file usage: Signup.jsx was the main user.

    const customerLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        // localStorage.removeItem('currentUser'); // No longer needed
    };

    return (
        <AuthContext.Provider value={{
            isAdmin,
            adminLogin,
            adminLogout,
            user,
            customerLogin,
            customerLogout,
            loading
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
