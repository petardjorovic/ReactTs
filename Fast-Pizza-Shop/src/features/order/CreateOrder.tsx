import { useState } from 'react';
import { createOrder } from '../../services/apiRestaurants';
import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  type LoaderFunctionArgs,
} from 'react-router-dom';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

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
  const isSubmiting = navigation.state === 'submitting';
  const formErrors = useActionData();
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      {/* <Form method="POST" action='/order/new'> */}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button disabled={isSubmiting}>{isSubmiting ? 'Placing order...' : 'Order now'}</button>
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

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const data: { [k: string]: FormDataEntryValue } = Object.fromEntries(formData);

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
    errors.phone = 'Please give us your correct phone number.We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  // If everything is ok create new order and redirect
  const newOrder: SavedOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
