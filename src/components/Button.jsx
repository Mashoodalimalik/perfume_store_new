import React from 'react';
import './Button.css'; // We will create this simple CSS or use inline/module

const Button = ({ children, variant = 'primary', size = 'md', onClick, className = '', ...props }) => {
    return (
        <button
            className={`btn btn-${variant} btn-${size} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
