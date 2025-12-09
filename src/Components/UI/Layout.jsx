
import React from 'react';

const Layout = ({ children }) => (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
        <header className="p-4 bg-white dark:bg-black border-zinc-600 border-2 shadow-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Task Finder</h2>
        </header>
        <main>{children}</main>
        
    </div>
);

export default Layout;