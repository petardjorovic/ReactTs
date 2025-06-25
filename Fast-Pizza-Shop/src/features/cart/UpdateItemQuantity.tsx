import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import Button from '../../ui/Button';
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from './cartSlice';

interface UpdateItemQuantityProps {
  pizzaId: number;
  currentQuantity: number;
}

export default function UpdateItemQuantity({
  pizzaId,
  currentQuantity,
}: UpdateItemQuantityProps) {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        type="round"
        onClick={() =>
          dispatch(decreaseItemQuantity(pizzaId))
        }
      >
        -
      </Button>
      <span className="text-sm font-medium">
        {currentQuantity}
      </span>
      <Button
        type="round"
        onClick={() =>
          dispatch(increaseItemQuantity(pizzaId))
        }
      >
        +
      </Button>
    </div>
  );
}
