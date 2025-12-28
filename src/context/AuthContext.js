"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Load user from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    // Admin Check (Case Insensitive)
    if (email.toLowerCase() === 'admin' && password === 'password123') {
       const adminUser = {
           name: "Shop Owner",
           email: "admin@lessence.com",
           role: 'admin',
           avatar: "/images/user-avatar.png"
       };
       setUser(adminUser);
       localStorage.setItem('user', JSON.stringify(adminUser));
       return { success: true, role: 'admin' };
    }

    // Regular Mock Logic
    if (email && password) {
       const mockUser = {
           name: "Demo User",
           email: email,
           role: 'user',
           avatar: "/images/user-avatar.png"
       };
       setUser(mockUser);
       localStorage.setItem('user', JSON.stringify(mockUser));
       return { success: true, role: 'user' };
    }
    return { success: false };
  };

  const signup = (name, email, password) => {
      if (name && email && password) {
          const mockUser = {
              name: name,
              email: email
          };
          setUser(mockUser);
          localStorage.setItem('user', JSON.stringify(mockUser));
          return true;
      }
      return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
