import { configureStore } from "@reduxjs/toolkit";

import accountSlice from "../features/account/accountSlice";
import customerSlice from "../features/customer/customerSlice";

import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

const store = configureStore({
  reducer: {
    accountStore: accountSlice,
    customerStore: customerSlice,
  },
});

export default store;

// Tipovi za korišćenje u useSelector i useDispatch
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
