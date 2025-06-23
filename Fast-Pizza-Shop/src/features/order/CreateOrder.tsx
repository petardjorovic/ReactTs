// import { useState } from 'react';
import { createOrder } from '../../services/apiRestaurants';
import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  type LoaderFunctionArgs,
} from 'react-router-dom';
import Button from '../../ui/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmiting =
    navigation.state === 'submitting';
  const formErrors = useActionData();
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let's go!
      </h2>

      {/* <Form method="POST" action='/order/new'> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">
            First Name
          </label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">
            Phone number
          </label>
          <div className="grow">
            <input
              type="tel"
              name="phone"
              required
              className="input w-full"
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">
            Address
          </label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label
            htmlFor="priority"
            className="font-medium"
          >
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input
            type="hidden"
            name="cart"
            value={JSON.stringify(cart)}
          />
          <Button
            disabled={isSubmiting}
            type="primary"
          >
            {isSubmiting
              ? 'Placing order...'
              : 'Order now'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export type NewOrderType = {
  customer: string;
  phone: string;
  address: string;
  cart: {
    name: string;
    pizzaId: number;
    quantity: number;
    totalPrice: number;
    unitPrice: number;
  }[];
  priority: boolean;
};

type SavedOrder = {
  address: string;
  cart: [];
  createdAt: string;
  customer: string;
  estimatedDelivery: string;
  id: string;
  orderPrice: number;
  phone: string;
  priority: boolean;
  priorityPrice: number;
  status: string;
};

export async function action({
  request,
}: LoaderFunctionArgs) {
  const formData = await request.formData();
  const data: {
    [k: string]: FormDataEntryValue;
  } = Object.fromEntries(formData);

  const phone = data.phone as string;

  const order = {
    ...data,
    cart: JSON.parse(data.cart as string),
    priority: data.priority === 'on',
  };

  type ErrorsObj = {
    phone?: string;
  };

  const errors: ErrorsObj = {};
  if (!isValidPhone(phone))
    errors.phone =
      'Please give us your correct phone number.We might need it to contact you.';

  if (Object.keys(errors).length > 0)
    return errors;

  //If everything is ok create new order and redirect
  const newOrder: SavedOrder =
    await createOrder(order);

  return redirect(`/order/${newOrder.id}`);

  return null;
}

export default CreateOrder;
