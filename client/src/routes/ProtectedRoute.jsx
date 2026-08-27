import { useAuth, UserButton } from '@clerk/react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSyncUser } from '../hooks/useSyncUser';

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  // 1. Trigger the sync hook (quietly handles the POST /users/sync request)
  useSyncUser();

  // 2. Loading state while Clerk initializes
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  // 3. Redirect unauthenticated users
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  // 4. Render protected layout with a temporary header for <UserButton />
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <h1 className="text-lg font-semibold text-gray-800">Job Tracker</h1>
        {/* Clerk's built-in avatar menu & sign-out button */}
        <UserButton />
      </header>

      <main className="p-6">{children ? children : <Outlet />}</main>
    </div>
  );
};

export default ProtectedRoute;
