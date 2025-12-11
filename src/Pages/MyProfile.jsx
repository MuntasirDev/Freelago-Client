import React, { useState, useEffect } from "react";
import { User, Mail, Image, Save, Loader2 } from "lucide-react"; 
import { useAuth } from '../Provider/AuthProvider'; 
import { toast, Toaster } from "sonner"; 

const CustomCard = ({ children, className = '' }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-700 ${className}`}>
        {children}
    </div>
);
const CustomCardHeader = ({ children }) => (
    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        {children}
    </div>
);
const CustomCardTitle = ({ children }) => (
    <h2 className="text-2xl font-bold text-gray-800 dark:text-indigo-400">{children}</h2>
);
const CustomCardDescription = ({ children }) => (
    <p className="text-sm text-gray-500 dark:text-gray-400">{children}</p>
);
const CustomCardContent = ({ children, className = 'p-6' }) => (
    <div className={className}>
        {children}
    </div>
);


const MyProfile = () => {
    
    const { user, updateUserProfile, loading } = useAuth(); 
    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    
    
    const getPhotoUrl = (url) => url || "https://api.dicebear.com/7.x/avataaars/svg?seed=User";
    
  
    useEffect(() => {
        if (user) {
            setName(user.displayName || "");
            setPhotoURL(user.photoURL || "");
        }
    }, [user]);
    
   
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        
        if (!name.trim()) {
          
            toast.error("Name cannot be empty.")
            return;
        }

        setIsUpdating(true);

        try { 
            
            await updateUserProfile(name, photoURL); 
            
            toast.success("Profile updated successfully!")
            
        } catch (error) {
            console.error("Profile update failed:", error);
           
            toast.error("Failed to update profile: " + error.message);
        } finally {
            setIsUpdating(false);
        }
    };
    
    
    if (loading || user === null) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                <p className="text-xl text-gray-700 dark:text-indigo-400 ml-3">Loading profile...</p>
            </div>
        );
    }
    
   
    if (!user) {
        return (
            
            <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center">
                <Toaster richColors position="top-right" /> 
                <h1 className="text-2xl font-bold text-red-500 dark:text-red-400">Please log in to view your profile.</h1>
            </div>
        );
    }
    
   
    return (
       
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-white py-12">
            
           
            <Toaster richColors position="top-right" /> 

            <div className="container mx-auto px-4 max-w-2xl">
                <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-600 dark:text-indigo-400">
                    👤 My Profile
                </h1>
                
              
                <CustomCard className="mb-8">
                    <CustomCardHeader>
                        <CustomCardTitle>Current Information</CustomCardTitle>
                        <CustomCardDescription>View your account details</CustomCardDescription>
                    </CustomCardHeader>
                    <CustomCardContent className="space-y-6">
                       
                        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-gray-100 dark:bg-gray-900 shadow-inner border border-gray-300 dark:border-gray-700">
                            <img
                                src={getPhotoUrl(user.photoURL)}
                                alt={user.displayName || "User"}
                                className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-xl object-cover"
                            />
                            <div className="text-center sm:text-left">
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{user.displayName || "User Name Not Set"}</h3>
                                <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center sm:justify-start mt-1">
                                    <Mail className="h-4 w-4 mr-2 text-teal-500" />
                                    {user.email}
                                </p>
                            </div>
                        </div>
                        
                      
                        <div className="grid gap-4">
                            
                           
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-200/50 dark:bg-gray-700/50">
                                <User className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                                    <p className="font-semibold text-gray-800 dark:text-white">{user.displayName || "Not Set"}</p>
                                </div>
                            </div>
                            
                           
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-200/50 dark:bg-gray-700/50">
                                <Mail className="h-5 w-5 text-teal-500 dark:text-teal-400" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Email (Read-only)</p>
                                    <p className="font-semibold text-gray-800 dark:text-white">{user.email}</p>
                                </div>
                            </div>
                            
                           
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-200/50 dark:bg-gray-700/50">
                                <Image className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Photo URL</p>
                                    <p className="font-semibold text-gray-800 dark:text-white truncate" title={user.photoURL || "Not set"}>
                                        {user.photoURL || "Not set"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CustomCardContent>
                </CustomCard>
                
               
                <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Edit Profile</CustomCardTitle>
                        <CustomCardDescription>Update your name and profile picture URL.</CustomCardDescription>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            
                            
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 border border-gray-300 dark:border-gray-600 outline-none transition-colors"
                                    disabled={isUpdating}
                                />
                            </div>
                            
                            
                            <div className="space-y-2">
                                <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Photo URL</label>
                                <input
                                    id="photoURL"
                                    type="url"
                                    placeholder="https://example.com/photo.jpg"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 border border-gray-300 dark:border-gray-600 outline-none transition-colors"
                                    disabled={isUpdating}
                                />
                            </div>
                            
                           
                            <button 
                                type="submit" 
                                className="w-full py-3 rounded-xl text-lg font-bold transition shadow-md bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isUpdating}
                            >
                                {isUpdating ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-5 w-5" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </form>
                    </CustomCardContent>
                </CustomCard>
            </div>
        </div>
    );
};

export default MyProfile;