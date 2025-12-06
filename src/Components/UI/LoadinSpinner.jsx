
import React from 'react';

const LoadingSpinner = ({ text = "Loading..." }) => (
    <div className="flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
        <p className="text-gray-600 dark:text-gray-400">{text}</p>
    </div>
);

export default LoadingSpinner;