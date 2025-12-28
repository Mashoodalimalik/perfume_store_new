import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    const INITIAL_ORDERS = [
        {
            id: '1001',
            date: new Date().toISOString(),
            customer: 'Muhammad Umer Khan',
            email: 'umer.khan@example.com',
            phone: '+92 300 1234567',
            address: 'House #123, Street 4, F-10/2, Islamabad',
            total: 13900,
            status: 'Pending',
            items: [
                { name: 'Midnight Rose', qty: 2, price: 6950, image: "/images/perfume_floral_elegant.png" }
            ]
        },
        {
            id: '1002',
            date: new Date().toISOString(),
            customer: 'Mashood Ali Malik',
            email: 'mashood.malik@example.com',
            phone: '+92 321 9876543',
            address: 'Apartment 5B, Executive Towers, Clifton, Karachi',
            total: 30400,
            status: 'Pending',
            items: [
                { name: 'Golden Amber', qty: 1, price: 30400, image: "/images/perfume_oriental_gold.png" }
            ]
        },
        {
            id: '1003',
            date: new Date(Date.now() - 86400000).toISOString(),
            customer: 'Ushna Malik',
            email: 'ushna.malik@example.com',
            phone: '+92 333 5556667',
            address: '15-A, Main Boulevard, Gulberg III, Lahore',
            total: 28400,
            status: 'Cancelled',
            items: [
                { name: 'Velvet Oud', qty: 1, price: 28400, image: "/images/perfume_woody_luxury.png" }
            ]
        },
        {
            id: '1004',
            date: new Date(Date.now() - 86400000).toISOString(),
            customer: 'Ali Mashood077',
            email: 'ali.mashood@example.com',
            phone: '+92 312 4443333',
            address: 'Flat 202, Skyline Heights, Behria Town, Rawalpindi',
            total: 27400,
            status: 'Cancelled',
            items: [
                { name: 'Ocean Breeze', qty: 1, price: 27400, image: "/images/perfume_ocean_fresh.png" }
            ]
        },
    ];

    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('orders');
        return savedOrders ? JSON.parse(savedOrders) : INITIAL_ORDERS;
    });

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const addOrder = (orderItems, total, customerDetails) => {
        const newOrder = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: orderItems,
            total: total,
            status: 'Pending',
            customer: customerDetails?.name || 'Guest User',
            email: customerDetails?.email || 'guest@example.com',
            phone: customerDetails?.phone || 'N/A',
            address: customerDetails?.address || 'No address provided'
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
