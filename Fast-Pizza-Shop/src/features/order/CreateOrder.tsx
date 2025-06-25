import { useState } from 'react';
import { createOrder } from '../../services/apiRestaurants';
import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  type LoaderFunctionArgs,
} from 'react-router-dom';
import Button from '../../ui/Button';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import type {
  AppDispatch,
  RootStore,
} from '../../store';
import {
  clearCart,
  getCart,
  getTotalCartPrice,
} from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import { formatCurrency } from '../../utils/helpers';
import store from '../../store';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] =
    useState('false');
  const navigation = useNavigation();
  const isSubmiting =
    navigation.state === 'submitting';
  const formErrors = useActionData();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector(
    (state: RootStore) => state.userStore
  );
  const isLoadingAddress =
    addressStatus === 'loading';
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(
    getTotalCartPrice
  );
  const dispatch: AppDispatch = useDispatch();
  const priority =
    withPriority === 'true'
      ? 0.2 * totalCartPrice
      : 0;
  const totalPrice = totalCartPrice + priority;

  if (!cart.length) return <EmptyCart />;

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
            defaultValue={username}
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

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">
            Address
          </label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {!position?.latitude &&
            !position?.longitude && (
              <span className="absolute right-[3px] top-[34px] z-50 sm:top-[3px] md:top-[5px]">
                <Button
                  type="small"
                  disabled={isLoadingAddress}
                  onClick={(e) => {
                    e?.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  Get position
                </Button>
              </span>
            )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) =>
              setWithPriority(
                e.target.checked.toString()
              )
            }
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
          <input
            type="hidden"
            name="position"
            value={
              position?.latitude &&
              position.longitude &&
              `${position.latitude}, ${position.longitude}`
            }
          />
          <Button
            disabled={
              isSubmiting || isLoadingAddress
            }
            type="primary"
          >
            {isSubmiting
              ? 'Placing order...'
              : `Order now ${formatCurrency(totalPrice)}`}
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
    priority: data.priority === 'true',
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

  // do not overuse this kind of using store because of optimization
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);

  return null;
}

export default CreateOrder;
