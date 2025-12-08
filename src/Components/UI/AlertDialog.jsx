import React, { useState } from 'react';
// ধরে নিচ্ছি আপনার আসল Button কম্পোনেন্টটি এখানে আছে
// import { Button } from './ui/Button'; 

// 💡 Mock Button Component (যদি আপনার কাছে আসল বাটন না থাকে)
// এইটি আগের উদাহরণের buttonVariants() এর আউটপুটকে অনুকরণ করবে।
const Button = ({ children, onClick, variant = 'default', className = '' }) => {
    let baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-background disabled:opacity-50 disabled:pointer-events-none";
    let variantClasses;

    if (variant === 'outline') {
        variantClasses = "border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:text-gray-100 dark:border-gray-600";
    } else if (variant === 'destructive') {
        variantClasses = "bg-red-600 text-white hover:bg-red-700";
    } else {
        variantClasses = "bg-blue-600 text-white hover:bg-blue-700";
    }

    return (
        <button 
            onClick={onClick} 
            className={`${baseClasses} ${variantClasses} ${className}`}
        >
            {children}
        </button>
    );
};


// --- Custom Modal Component ---
const CustomAlertDialog = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = () => {
        alert("Account Deletion Confirmed!"); // 🚨 এখানে আপনার ডিলিট লজিক থাকবে
        setIsOpen(false);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-950">
            
            {/* 1. ট্রিগার বাটন */}
            <Button 
                onClick={() => setIsOpen(true)} 
                variant="destructive"
            >
                Delete Account
            </Button>

            {/* 2. কন্ডিশনাল রেন্ডারিং এর মাধ্যমে Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    
                    {/* Overlay/Overlay */}
                    <div 
                        className="fixed inset-0 bg-black/80 transition-opacity duration-200" 
                        onClick={() => setIsOpen(false)} // Overlay ক্লিক করলে বন্ধ হবে
                    />

                    {/* Content Area */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-2xl z-50 w-full max-w-lg mx-4 transform transition-all duration-200">
                        
                        {/* Header/Title */}
                        <div className="flex flex-col space-y-2 text-center sm:text-left mb-4">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Are you absolutely sure?</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                This action cannot be undone. This will permanently delete your 
                                account and remove your data from our servers.
                            </p>
                        </div>
                        
                        {/* Footer/Actions */}
                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4 border-t dark:border-gray-700">
                            
                            {/* Cancel Button */}
                            <Button 
                                onClick={() => setIsOpen(false)} 
                                variant="outline" 
                                className="mt-2 sm:mt-0"
                            >
                                Cancel
                            </Button>
                            
                            {/* Action Button */}
                            <Button 
                                onClick={handleConfirm} 
                                variant="destructive"
                            >
                                Delete My Account
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomAlertDialog;