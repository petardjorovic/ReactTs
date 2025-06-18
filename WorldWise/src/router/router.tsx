import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import Login from '../pages/Login/Login';
import Product from '../pages/Product/Product';
import Pricing from '../pages/Pricing/Pricing';
import MainLayout from '../layouts/MainLayout';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import AppLayout from '../layouts/AppLayout/AppLayout';
import CityList from '../components/CityList/CityList';
import CountryList from '../components/CountryList/CountryList';
import City from '../components/City/City';
import Form from '../components/Form/Form';
import ProtectedRoute from '../pages/ProtectedRoute/ProtectedRoute';

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
