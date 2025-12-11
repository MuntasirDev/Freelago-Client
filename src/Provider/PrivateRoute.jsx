import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../Components/UI/LoadinSpinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext); 
    const location = useLocation();
    const registerRequiredRoutes = [
        "/browse-tasks", 
    ];

    let redirectTo = "/auth/login"; 
    
    if (registerRequiredRoutes.includes(location.pathname)) {
        redirectTo = "/auth/register";
    }

    if (loading) {
       
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading /> 
            </div>
        );
    }

    
    if (user) { 
        return children; 
    }

    
    return <Navigate state={{ from: location.pathname }} to={redirectTo} replace />;
};

export default PrivateRoute;