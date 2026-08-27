import { useEffect, useRef } from 'react';
import { useUser } from '@clerk/react';
import axiosClient from '../api/axiosClient';

export const useSyncUser = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || hasSynced.current) return;

    const syncUserToBackend = async () => {
      hasSynced.current = true;

      try {
        const userDetails = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.primaryEmailAddress?.emailAddress,
        };

        await axiosClient.post('/users/sync', userDetails);
      } catch (error) {
        hasSynced.current = false;
        console.error('Failed to sync user:', error);
      }
    };

    syncUserToBackend();
  }, [isLoaded, isSignedIn, user]);
};
