import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            className="container flex-center"
            style={{
                minHeight: '60vh',
                flexDirection: 'column',
                gap: '2rem',
                paddingTop: '8rem',
                textAlign: 'center'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <CheckCircle size={80} color="var(--color-primary)" />
            <h1 className="section-title">Order Placed Successfully!</h1>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '500px', fontSize: '1.2rem' }}>
                Thank you for your purchase. We have received your order and are preparing it for shipment.
            </p>
            <Link to="/">
                <Button>Continue Shopping</Button>
            </Link>
        </motion.div>
    );
};

export default OrderSuccess;
