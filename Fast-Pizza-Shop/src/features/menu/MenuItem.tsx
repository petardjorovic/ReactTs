import {
  useDispatch,
  useSelector,
} from 'react-redux';
import type { AppDispatch } from '../../store';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import {
  addItem,
  getCurrentQuantityById,
  type Item,
} from '../cart/cartSlice';
import DeleteItem from '../../ui/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

export type PizzaItem = {
  id: number;
  imageUrl: string;
  ingredients: string[];
  name: string;
  soldOut: boolean;
  unitPrice: number;
};

function MenuItem({
  pizza,
}: {
  pizza: PizzaItem;
}) {
  const {
    id,
    name,
    unitPrice,
    ingredients,
    soldOut,
    imageUrl,
  } = pizza;
  const dispatch: AppDispatch = useDispatch();

  function handleAddToCart() {
    const newItem: Item = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  const currentQuantity = useSelector(
    getCurrentQuantityById(id)
  );
  const isInCart = currentQuantity > 0;

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex flex-grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                currentQuantity={currentQuantity}
                pizzaId={id}
              />
              <DeleteItem pizzaId={id}>
                Delete
              </DeleteItem>
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button
              type={'small'}
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
