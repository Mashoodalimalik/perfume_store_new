"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { orders as initialOrders } from '@/data/orders'; // Import mock data as initial state

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  // Load orders from local storage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Initialize with mock data if empty
      setOrders(initialOrders);
      localStorage.setItem('orders', JSON.stringify(initialOrders));
    }
  }, []);

  // Save orders to local storage whenever they change
  useEffect(() => {
      if (orders.length > 0) {
        localStorage.setItem('orders', JSON.stringify(orders));
      }
  }, [orders]);

  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const deleteOrder = (orderId) => {
    setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
