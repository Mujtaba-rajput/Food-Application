import { createSlice } from "@reduxjs/toolkit";

export interface IState {
  product: object;
  orderProductModifiers?: any;
  dealsArray: {
    dealId: number;
    dealName: string;
    description: string;
    inStorePrice: string;
    products: [];
    totalCount: number;
  };
}

const initialState: IState = {
  product: {},
  orderProductModifiers: [],
  dealsArray: {
    dealId: 0,
    dealName: "",
    description: "",
    inStorePrice: "",
    products: [],
    totalCount: 1,
  },
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
    setDeals: (state: IState, action) => {
      state.dealsArray = action.payload;
    },
    updateDealCount: (state: IState, action) => {
      state.dealsArray = {
        ...state.dealsArray,
        totalCount: action.payload.totalCount,
      };
    },
  },
});

export const {
  setProduct,
  updateCount,
  setProductModifier,
  setDeals,
  updateDealCount,
} = productSlice.actions;
export const productReducer = productSlice.reducer;
