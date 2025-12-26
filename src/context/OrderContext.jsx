import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    const INITIAL_ORDERS = [
        { id: '1001', date: new Date().toISOString(), customer: 'Muhammad Umer Khan', total: 13900, status: 'Pending', items: [{ name: 'Midnight Rose', qty: 2 }] },
        { id: '1002', date: new Date().toISOString(), customer: 'Mashood Ali Malik', total: 30400, status: 'Pending', items: [{ name: 'Golden Amber', qty: 1 }] },
        { id: '1003', date: new Date(Date.now() - 86400000).toISOString(), customer: 'Ushna Malik', total: 28400, status: 'Cancelled', items: [{ name: 'Velvet Oud', qty: 1 }] },
        { id: '1004', date: new Date(Date.now() - 86400000).toISOString(), customer: 'Ali Mashood077', total: 27400, status: 'Cancelled', items: [{ name: 'Ocean Breeze', qty: 1 }] },
    ];

    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('orders');
        return savedOrders ? JSON.parse(savedOrders) : INITIAL_ORDERS;
    });

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const addOrder = (orderItems, total) => {
        const newOrder = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: orderItems,
            total: total,
            status: 'Pending',
            customer: 'Guest User' // In a real app, this would come from user auth or checkout form
        };
        setOrders([newOrder, ...orders]);
    };

    const updateOrderStatus = (id, status) => {
        setOrders(orders.map(order =>
            order.id === id ? { ...order, status } : order
        ));
    };

    const deleteOrder = (id) => {
        setOrders(orders.filter(order => order.id !== id));
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, deleteOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
