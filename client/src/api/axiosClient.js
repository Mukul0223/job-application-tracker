import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Variable to hold the getToken function reference
let tokenGetter = null;

// Function to attach Clerk's getToken from React
export const setTokenGetter = (getterFn) => {
  tokenGetter = getterFn;
};

// Async interceptor to await the fresh token
axiosClient.interceptors.request.use(
  async (config) => {
    if (tokenGetter) {
      const token = await tokenGetter();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
