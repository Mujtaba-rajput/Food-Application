import { createSlice } from '@reduxjs/toolkit';

export interface ICheckoutState {
  checkout: object[];
}

const initialState: ICheckoutState = {
  checkout: [],
};

const CheckoutSlice = createSlice({
  name: 'Checkout',
  initialState,
  reducers: {
    setCheckout: (state: ICheckoutState) => {
      state.checkout = [];
    },
  },
});

export const { setCheckout } = CheckoutSlice.actions;
export const checkoutReducer = CheckoutSlice.reducer;
