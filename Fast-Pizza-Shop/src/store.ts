import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import cartSlice from './features/cart/cartSlice';

const store = configureStore({
  reducer: {
    userStore: userSlice,
    cartStore: cartSlice,
  },
});

export default store;

// Tipovi za korišćenje u useSelector i useDispatch
export type RootStore = ReturnType<
  typeof store.getState
>;
export type AppDispatch = typeof store.dispatch;
