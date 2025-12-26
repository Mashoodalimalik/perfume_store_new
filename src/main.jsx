import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { AuditLogProvider } from './context/AuditLogContext';
import { WishlistProvider } from './context/WishlistContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AuditLogProvider>
          <ProductProvider>
            <CartProvider>
              <OrderProvider>
                <WishlistProvider>
                  <App />
                </WishlistProvider>
              </OrderProvider>
            </CartProvider>
          </ProductProvider>
        </AuditLogProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
