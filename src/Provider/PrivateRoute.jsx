// src/PrivateRoute.jsx (Final Logic - সামান্য পরিবর্তন)

import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../Components/UI/LoadinSpinner'; // আপনার Loading কম্পোনেন্টের সঠিক পাথ নিশ্চিত করুন

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext); 
    const location = useLocation();

    // /browse-tasks এর জন্য Register এ রিডাইরেক্ট করতে হবে
    const registerRequiredRoutes = [
        "/browse-tasks", 
    ];

    let redirectTo = "/auth/login"; 
    
    if (registerRequiredRoutes.includes(location.pathname)) {
        redirectTo = "/auth/register";
    }

    if (loading) {
        // লোডিং থাকলে স্পিনার দেখাবে
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading /> 
            </div>
        );
    }

    // ⭐ এখানে পরিবর্তন করা হলো: user অবজেক্টটি null নয় তা নিশ্চিত করা
    if (user) { 
        return children; // Protected রুটটি রেন্ডার করবে
    }

    // Not Authenticated (Redirect)
    return <Navigate state={{ from: location.pathname }} to={redirectTo} replace />;
};

export default PrivateRoute;