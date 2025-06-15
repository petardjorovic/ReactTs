import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/router.tsx';
import { CitiesProvider } from './context/CitiesContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CitiesProvider>
            <RouterProvider router={router} />
        </CitiesProvider>
    </StrictMode>
);
