import { createSlice } from '@reduxjs/toolkit';
import type { RootStore } from '../../store';

export type Item = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

type InitState = {
  cart: Item[];
};

const initialState: InitState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (
      state,
      action: { type: string; payload: Item }
    ) => {
      // payload = newItem;
      state.cart.push(action.payload);
    },
    deleteItem: (
      state,
      action: { type: string; payload: number }
    ) => {
      // payload = pizzaId;
      state.cart = state.cart.filter(
        (item) => item.pizzaId !== action.payload
      );
    },
    increaseItemQuantity: (
      state,
      action: { type: string; payload: number }
    ) => {
      // payload = pizzaId;
      const item = state.cart.find(
        (item) => item.pizzaId === action.payload
      );
      if (item) {
        item.quantity++;
        item.totalPrice =
          item.unitPrice * item.quantity;
      }
    },
    decreaseItemQuantity: (
      state,
      action: { type: string; payload: number }
    ) => {
      // payload = pizzaId;
      const item = state.cart.find(
        (item) => item.pizzaId === action.payload
      );
      if (item) {
        item.quantity--;
        item.totalPrice =
          item.quantity * item.unitPrice;

        if (item.quantity === 0)
          cartSlice.caseReducers.deleteItem(
            state,
            action
          );
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

//* reselect library for optimizing those selectors
//*(getTotalCartPrice, getTotalCartQuantity)

export const getCart = (state: RootStore) =>
  state.cartStore.cart;

export const getTotalCartQuantity = (
  state: RootStore
) =>
  state.cartStore.cart.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

export const getTotalCartPrice = (
  state: RootStore
) =>
  state.cartStore.cart.reduce(
    (acc, curr) => acc + curr.totalPrice,
    0
  );

export const getCurrentQuantityById =
  (id: number) => (state: RootStore) =>
    state.cartStore.cart.find(
      (item) => item.pizzaId === id
    )?.quantity ?? 0;
