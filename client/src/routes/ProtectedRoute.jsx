import { useAuth } from '@clerk/react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;

  if (!isSignedIn) {
    return <Navigate replace to="/sign-in" />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
