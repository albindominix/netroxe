import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AuthGuard({ children }) {
    const user = useSelector(({ UserSlice }) => UserSlice.user);
    
    // If the user is not authenticated, redirect to the sign-in page
    if (!user?.email) {
        return <Navigate to="/signin" />;
    }

    // If the user is authenticated, render the child components
    return <>{children}</>;
}

export default AuthGuard;
