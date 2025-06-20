import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import CityList from '../components/CityList/CityList';
import CountryList from '../components/CountryList/CountryList';
import City from '../components/City/City';
import Form from '../components/Form/Form';
import ProtectedRoute from '../pages/ProtectedRoute/ProtectedRoute';

// import HomePage from '../pages/HomePage/HomePage';
// import Login from '../pages/Login/Login';
// import Product from '../pages/Product/Product';
// import Pricing from '../pages/Pricing/Pricing';
// import MainLayout from '../layouts/MainLayout';
// import PageNotFound from '../pages/PageNotFound/PageNotFound';
// import AppLayout from '../layouts/AppLayout/AppLayout';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const Login = lazy(() => import('../pages/Login/Login'));
const Product = lazy(() => import('../pages/Product/Product'));
const Pricing = lazy(() => import('../pages/Pricing/Pricing'));
const MainLayout = lazy(() => import('../layouts/MainLayout'));
const PageNotFound = lazy(() => import('../pages/PageNotFound/PageNotFound'));
const AppLayout = lazy(() => import('../layouts/AppLayout/AppLayout'));

// dist/index.html                   0.52 kB │ gzip:   0.32 kB
// dist/assets/index-C2cT8aNW.css   30.72 kB │ gzip:   5.08 kB
// dist/assets/index-CEzEm0qU.js   613.24 kB │ gzip: 181.96 kB

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <PageNotFound />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'product',
                element: <Product />,
            },
            {
                path: 'pricing',
                element: <Pricing />,
            },
            {
                path: 'app',
                element: (
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <Navigate to={'cities'} replace />,
                    },
                    {
                        path: 'cities',
                        element: <CityList />,
                    },
                    {
                        path: 'cities/:id',
                        element: <City />,
                    },
                    {
                        path: 'countries',
                        element: <CountryList />,
                    },
                    {
                        path: 'form',
                        element: <Form />,
                    },
                ],
            },
            {
                path: 'login',
                element: <Login />,
            },
        ],
    },
]);

export default router;
