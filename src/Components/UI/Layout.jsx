
import React from 'react';

const Layout = ({ children }) => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="p-4 bg-white dark:bg-gray-800 shadow-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Task Finder</h2>
        </header>
        <main>{children}</main>
        
    </div>
);

export default Layout;