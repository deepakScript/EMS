import React from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

const RoleBaseRoutes = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    // ❌ Typo: 'inlcudes' should be 'includes'
    // ❌ Missing return statement for Navigate
    if (!requiredRole.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    // ✅ Only render children if user exists
    return user ? children : <Navigate to="/login" />;
};

export default RoleBaseRoutes;
