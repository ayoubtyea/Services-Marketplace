import React from 'react'

const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem('userData'));
    
    if (!user?.token) {
      return <Navigate to="/login" />;
    }
    
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" />;
    }
    
    return children;
  };

export default ProtectedRoute
