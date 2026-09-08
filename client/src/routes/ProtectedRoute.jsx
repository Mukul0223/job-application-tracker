import { useAuth } from '@clerk/react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSyncUser } from '../hooks/useSyncUser';

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  // 1. Trigger the sync hook (quietly handles the POST /users/sync request)
  useSyncUser();

  // 2. Loading state while Clerk initializes
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-600">
        Loading...
      </div>
    );
  }

  // 3. Redirect unauthenticated users
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  // 4. Render protected layout with a temporary header for <UserButton />
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
