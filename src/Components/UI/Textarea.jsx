import React from 'react';

export const Textarea = ({ id, placeholder, value, onChange, rows = 3, className = "" }) => (
    <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`flex min-h-20 w-full rounded-md border border-gray-300 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
);

export default Textarea 