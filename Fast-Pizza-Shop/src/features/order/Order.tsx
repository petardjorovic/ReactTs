// Test ID: IIDSAT

import { useLoaderData, type LoaderFunctionArgs } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurants';
import { calcMinutesLeft, formatCurrency, formatDate } from '../../utils/helpers';

type OrderType = {
  cart: {
    addIngredients: [];
    name: string;
    pizzaId: number;
    quantity: number;
    removeIngredients: [];
    totalPrice: number;
    unitPrice: number;
  }[];
  customer: string;
  estimatedDelivery: string;
  id: string;
  orderPrice: number;
  priority: boolean;
  priorityPrice: number;
  status: string;
};

function Order() {
  const order: OrderType = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery, cart } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <div>
        <h2>Status</h2>

        <div>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export async function loader({ params }: LoaderFunctionArgs): Promise<OrderType> {
  if (!params.orderId) {
    throw new Error('No order ID provided');
  }
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
