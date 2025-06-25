import { useSelector } from 'react-redux';
import DeleteItem from '../../ui/DeleteItem';
import { formatCurrency } from '../../utils/helpers';
import UpdateItemQuantity from './UpdateItemQuantity';
import { getCurrentQuantityById } from './cartSlice';

type CartItemProps = {
  item: {
    pizzaId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  };
};

function CartItem({ item }: CartItemProps) {
  const { pizzaId, name, quantity, totalPrice } =
    item;

  const currentQuantity = useSelector(
    getCurrentQuantityById(pizzaId)
  );

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">
          {formatCurrency(totalPrice)}
        </p>
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem pizzaId={pizzaId}>
          Delete
        </DeleteItem>
      </div>
    </li>
  );
}

export default CartItem;
