"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
        if (result.role === 'admin') {
            router.push('/admin');
        } else {
            router.push('/');
        }
    } else {
        alert("Invalid credentials. Please check your email and password.");
    }
  };

  return (
    <main className="min-h-screen pt-32 px-6 bg-background text-foreground flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 animate-fade-in-up">
        <div className="text-center">
           <h1 className="text-4xl font-bold uppercase tracking-tighter">Welcome Back</h1>
           <p className="opacity-60 text-sm tracking-widest uppercase mt-2">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest opacity-50">Username or Email</label>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-foreground/20 py-3 outline-none focus:border-foreground transition-colors"
                placeholder="Enter username or email"
                required
              />
           </div>
           <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest opacity-50">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-foreground/20 py-3 outline-none focus:border-foreground transition-colors"
                placeholder="••••••••"
                required
              />
           </div>

           <button className="w-full bg-foreground text-background py-4 font-bold uppercase tracking-widest hover:opacity-90 transition-opacity magnetic-wrap">
             Login
           </button>
        </form>

        <p className="text-center text-sm opacity-60">
           Don't have an account? <Link href="/signup" className="underline hover:text-accent">Sign Up</Link>
        </p>
      </div>
    </main>
  );
}
