import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Home from './ui/Home';
import Menu, {
  loader as menuLoader,
} from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as CreateOrderAction,
} from './features/order/CreateOrder';
import Order, {
  loader as orderLoader,
} from './features/order/Order';
import AppLayout from './ui/AppLayout';
import ErrorComponent from './ui/Error';
import { action as updateOrderAction } from './features/order/UpdateOrder';

const router = createBrowserRouter([
  {
    element: <AppLayout />, // kad nema path zove se layout route
    errorElement: <ErrorComponent />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        errorElement: <ErrorComponent />,
        loader: menuLoader,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: CreateOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        errorElement: <ErrorComponent />,
        loader: orderLoader,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
