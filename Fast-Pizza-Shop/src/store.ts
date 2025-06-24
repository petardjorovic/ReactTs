import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../src/features/user/userSlice';

const store = configureStore({
  reducer: {
    userStore: userSlice,
  },
});

export default store;

// Tipovi za korišćenje u useSelector i useDispatch
export type RootStore = ReturnType<
  typeof store.getState
>;
export type AppDispatch = typeof store.dispatch;
