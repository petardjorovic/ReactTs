import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/router.tsx';
import { CitiesProvider } from './context/CitiesContext.tsx';
import { AuthProvider } from './context/FakeAuthContext.tsx';
import SpinnerFullPage from './components/SpinnerFullPage/SpinnerFullPage.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <CitiesProvider>
                <Suspense fallback={<SpinnerFullPage />}>
                    <RouterProvider router={router} />
                </Suspense>
            </CitiesProvider>
        </AuthProvider>
    </StrictMode>
);
