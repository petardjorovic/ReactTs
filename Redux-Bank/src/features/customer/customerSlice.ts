import { createSlice } from "@reduxjs/toolkit";

type InitState = {
  fullName: string;
  nationalId: string;
  createdAt: string;
};

const initialState: InitState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: initialState,
  reducers: {
    createCustomer: {
      prepare: (fullName: string, nationalId: string) => {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer: (
        state,
        action: {
          type: string;
          payload: { fullName: string; nationalId: string; createdAt: string };
        }
      ) => {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName: (state, action: { type: string; payload: string }) => {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;
