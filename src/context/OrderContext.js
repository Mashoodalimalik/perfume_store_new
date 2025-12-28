"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth(); // Depend on user to fetch their orders

  const fetchOrders = async () => {
       const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
       if (!error && data) {
           setOrders(data);
       }
  };

  useEffect(() => {
    fetchOrders();

    // Subscribe to changes
    const subscription = supabase
        .channel('public:orders')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
            if (payload.eventType === 'INSERT') {
                setOrders(prev => [payload.new, ...prev]);
            } else if (payload.eventType === 'UPDATE') {
                setOrders(prev => prev.map(o => o.id === payload.new.id ? payload.new : o));
            } else if (payload.eventType === 'DELETE') {
                setOrders(prev => prev.filter(o => o.id !== payload.old.id));
            }
        })
        .subscribe();

    return () => {
        supabase.removeChannel(subscription);
    };
  }, [user]); 

  const addOrder = async (order) => {
    try {
        const { data, error } = await supabase.from('orders').insert([{
            id: order.id,
            user_id: user?.id || null, 
            customer_name: order.customer,
            email: order.email,
            phone: order.phone,
            address: order.address, 
            status: order.status,
            total: order.total,
            items: order.items 
        }]).select();

        if (error) throw error;
    } catch (err) {
        console.error("Error creating order:", err);
    }
  };

  const updateOrderStatus = async (id, status) => {
      try {
          const { error } = await supabase.from('orders').update({ status }).eq('id', id);
          if (error) throw error;
      } catch (err) {
          console.error("Error updating order:", err);
      }
  };

  const deleteOrder = async (id) => {
      try {
           const { error } = await supabase.from('orders').delete().eq('id', id);
           if (error) throw error;
      } catch (err) {
          console.error("Error deleting order:", err);
      }
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
