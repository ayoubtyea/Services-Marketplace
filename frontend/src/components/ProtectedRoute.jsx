import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  if (!allowedRoles.includes(userData.role)) {
    // Redirect to home if wrong role
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;