import React from 'react';

export const Button = ({ children, type = "button", onClick, className = "", variant = "default", disabled = false }) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`p-2 rounded font-semibold text-white bg-blue-500 hover:bg-blue-700 transition duration-150 ${variant === 'ghost' ? 'bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700' : ''} ${variant === 'outline' ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50' : ''} ${className}`}
    >
        {children}
    </button>
);