import type React from 'react';
import Button from './Button';
import type { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../features/cart/cartSlice';

interface DeleteItemProps {
  children: React.ReactNode;
  pizzaId: number;
}

export default function DeleteItem({
  children,
  pizzaId,
}: DeleteItemProps) {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Button
      type="small"
      onClick={() =>
        dispatch(deleteItem(pizzaId))
      }
    >
      {children}
    </Button>
  );
}
