import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import About from './pages/About';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import Sustainability from './pages/Sustainability';
import Careers from './pages/Careers';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import NewArrivals from './pages/NewArrivals';
import Sale from './pages/Sale';
import GiftSets from './pages/GiftSets';
import BestSellers from './pages/BestSellers';
import { AnimatePresence } from 'framer-motion';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app">
      {!isAdminRoute && <Navbar />}
      <ScrollToTop />
      <main style={isAdminRoute ? { paddingTop: 0 } : {}}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/product/:id" element={<Shop />} /> {/* Placeholder to avoid 404 */}
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/best-sellers" element={<BestSellers />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/gift-sets" element={<GiftSets />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
