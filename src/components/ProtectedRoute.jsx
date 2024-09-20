import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Atau komponen loading kustom Anda
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};