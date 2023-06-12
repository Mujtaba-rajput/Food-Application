import { createSlice } from "@reduxjs/toolkit";

export interface IState {
  product: object;
  orderProductModifiers?: any;
}

const initialState: IState = {
  product: {},
  orderProductModifiers: [],
};

const productSlice = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    setProduct: (state: IState, action) => {
      state.product = action.payload;
    },
    setProductModifier: (state: IState, action) => {
      state.orderProductModifiers = [
        ...state.orderProductModifiers,
        action.payload,
      ];
    },
    updateCount: (state: IState, action) => {
      state.product = {
        ...state.product,
        totalCount: action.payload.totalCount,
      };
    },
  },
});

export const { setProduct, updateCount, setProductModifier } =
  productSlice.actions;
export const productReducer = productSlice.reducer;
