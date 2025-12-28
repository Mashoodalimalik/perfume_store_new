"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, Sun, Moon, ShoppingBag, User } from "lucide-react";
import clsx from "clsx";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

function UserTrigger() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (user) {
      return (
          <div className="relative z-50" ref={dropdownRef}>
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="hover:scale-110 transition-transform mix-blend-difference text-white magnetic-wrap max-w-[24px]" 
                aria-label="My Account"
              >
                <User size={24} />
              </button>
              
              {isOpen && (
                  <div className="absolute top-full right-0 mt-4 w-48 bg-background border border-foreground/10 shadow-xl rounded-md overflow-hidden text-foreground animate-fade-in-up">
                      <div className="p-4 border-b border-foreground/10">
                          <p className="font-bold truncate">{user.name || 'User'}</p>
                          <p className="text-xs opacity-50 truncate">{user.email}</p>
                      </div>
                      
                      {/* Check if user is admin or customer for redirection */}
                      <Link 
                        href={user.role === 'admin' ? '/admin' : '/profile'} 
                        className="block px-4 py-3 hover:bg-foreground/5 text-sm font-bold uppercase tracking-widest transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                         {user.role === 'admin' ? 'Dashboard' : 'Profile'}
                      </Link>

                      <button 
                        onClick={() => {
                            logout();
                            setIsOpen(false);
                            window.location.href = '/'; // Redirect to home
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-red-500/10 text-red-500 text-sm font-bold uppercase tracking-widest transition-colors"
                      >
                          Logout
                      </button>
                  </div>
              )}
          </div>
      );
  }

  return (
      <Link href="/login" className="hover:scale-110 transition-transform mix-blend-difference text-white text-sm font-bold uppercase tracking-widest magnetic-wrap">
        Login
      </Link>
  );
}

function CartTrigger() {
  const { toggleCart, cart } = useCart();
  const itemCount = cart.reduce((a, c) => a + c.quantity, 0);

  return (
    <button 
      onClick={toggleCart} 
      className="relative p-2 hover:scale-110 transition-transform mix-blend-difference text-white magnetic-wrap"
      aria-label="Open Cart"
    >
      <ShoppingBag size={24} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border border-white">
          {itemCount}
        </span>
      )}
    </button>
  );
}

export default function Header({ toggleMenu }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
       setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4 flex justify-between items-center mix-blend-difference text-white",
        isScrolled ? "py-2 backdrop-blur-md" : "py-6"
      )}
    >
      <Link href="/" className="text-2xl font-bold tracking-tighter uppercase font-sans z-50 mix-blend-mode-difference" aria-label="Home">
        PERFUME<span className="font-light">STORE</span>
      </Link>

      <div className="flex items-center gap-6 z-50">
        <button
          onClick={toggleTheme}
          className="hover:scale-110 transition-transform hidden md:block"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <CartTrigger />
        
        <UserTrigger />

        <button
          onClick={toggleMenu}
          className="flex items-center gap-2 uppercase text-sm font-medium tracking-widest group"
        >
          <span className="hidden md:block group-hover:-translate-x-1 transition-transform">Menu</span>
          <Menu size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>
    </header>
  );
}
