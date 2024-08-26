import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AuthGuard({ children }) {
    const user = useSelector(({ UserSlice }) => UserSlice.user);
    
    if (!user?.email) {
        return <Navigate to="/signup" />;
    }

    return <>{children}</>;
}

export default AuthGuard;
