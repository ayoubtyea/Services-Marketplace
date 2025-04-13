import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  if (!userData?.role || !allowedRoles.includes(userData.role)) {

    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
