import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/router.tsx';
import { CitiesProvider } from './context/CitiesContext.tsx';
import { AuthProvider } from './context/FakeAuthContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <CitiesProvider>
                <RouterProvider router={router} />
            </CitiesProvider>
        </AuthProvider>
    </StrictMode>
);
