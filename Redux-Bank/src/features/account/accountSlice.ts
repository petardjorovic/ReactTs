import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitState = {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
};

const iniitialState: InitState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

type FetchCurrencyArgs = {
  amount: number;
  currency: string;
};

export const convertAndDeposit = createAsyncThunk(
  "account/convertAndDeposit",
  async ({ amount, currency }: FetchCurrencyArgs, thunkAPI) => {
    if (currency === "USD") {
      // Direktan dispatch deposit bez konverzije
      thunkAPI.dispatch(deposit({ amount, currency }));
      return;
    }

    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convertedAmount = data.rates.USD;
    thunkAPI.dispatch(deposit({ amount: convertedAmount, currency: "USD" }));
    return convertedAmount;
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: iniitialState,
  reducers: {
    deposit: (
      state,
      action: { type: string; payload: { amount: number; currency: string } }
    ) => {
      state.balance = state.balance + action.payload.amount;
    },
    withdraw: (state, action: { type: string; payload: number }) => {
      state.balance = state.balance - action.payload;
    },
    requestLoan: (
      state,
      action: { type: string; payload: { loan: number; loanPurpose: string } }
    ) => {
      if (state.loan > 0) return;
      state.loan = action.payload.loan;
      state.loanPurpose = action.payload.loanPurpose;
      state.balance = state.balance + action.payload.loan;
    },
    payLoan: (state) => {
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(convertAndDeposit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(convertAndDeposit.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;
