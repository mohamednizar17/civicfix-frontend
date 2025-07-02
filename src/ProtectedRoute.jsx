// src/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useAuth();

  // 🔒 Not logged in at all
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔒 Logged in, but role not allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Access granted
  return children;
};

export default ProtectedRoute;
