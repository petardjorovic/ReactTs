import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import Login from '../pages/Login/Login';
import Product from '../pages/Product/Product';
import Pricing from '../pages/Pricing/Pricing';
import MainLayout from '../layouts/MainLayout';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import AppLayout from '../layouts/AppLayout/AppLayout';
import CityList from '../components/CityList/CityList';

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
                element: <AppLayout />,
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
                        path: 'countries',
                        element: <p>Countries</p>,
                    },
                    {
                        path: 'form',
                        element: <p>Form</p>,
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
