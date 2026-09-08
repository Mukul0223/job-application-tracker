import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ClerkProvider } from '@clerk/react';

import App from './App.jsx';
import AxiosBridge from './components/AxiosBridge.jsx';
import queryClient from './lib/queryClient';
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
          <AxiosBridge>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </AxiosBridge>
        </ClerkProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
