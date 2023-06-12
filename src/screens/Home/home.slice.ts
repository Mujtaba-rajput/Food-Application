import { createSlice } from "@reduxjs/toolkit";

export interface IState {
  product: object;
  categoryId: number;
}

const initialState: IState = {
  product: {},
  categoryId: 0,
};

const homeSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setProduct: (state: IState, action) => {
      state.product = action.payload;
    },
    setCategoryId: (state: IState, action) => {
      state.categoryId = action.payload;
    },
  },
});

export const { setProduct, setCategoryId } = homeSlice.actions;
export const homeReducer = homeSlice.reducer;
