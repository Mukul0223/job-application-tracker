import { useEffect } from 'react';
import { useAuth } from '@clerk/react';
import { setTokenGetter } from '../api/axiosClient';

const AxiosBridge = ({ children }) => {
  const { getToken } = useAuth();

  useEffect(() => {
    setTokenGetter(getToken);
  }, [getToken]);

  return children;
};

export default AxiosBridge;
