import React from 'react';
export const Badge = ({ children, className = "", variant = "default" }) => {
    let baseStyle = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
    
    
    if (variant === "destructive") {
        baseStyle += " bg-red-500 text-white dark:bg-red-700 hover:bg-red-600";
    } else if (className.includes("bg-") && className.includes("text-")) {
    
        baseStyle += " border-transparent";
    } else {
        baseStyle += " bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200";
    }

    return (
        <span className={`${baseStyle} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;