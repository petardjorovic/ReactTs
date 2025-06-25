import {
  useFetcher,
  type LoaderFunctionArgs,
} from 'react-router-dom';
import Button from '../../ui/Button';
import type { OrderType } from './Order';
import { updateOrder } from '../../services/apiRestaurants';

export default function UpdateOrder({
  order,
}: {
  order: OrderType;
}) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form
      method="PATCH"
      className="text-right"
    >
      <Button type="primary">
        Make priority
      </Button>
    </fetcher.Form>
  );
}

export async function action({
  request,
  params,
}: LoaderFunctionArgs) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
