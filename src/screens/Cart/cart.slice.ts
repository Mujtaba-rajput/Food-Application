import {
  CalculatePrice,
  mergedArr,
  applyDiscount,
  calculateTax,
} from "../../utils/helper";
import { createSlice } from "@reduxjs/toolkit";

export interface IState {
  cartItems: Array<object>;
  totalItems: number;
  totalAmount: number;
  mergedItems: Array<object>;
  expandedTab: string | false;
  discount: number;
  tax: number;
  storeData: {
    id: string | number;
    name: string;
    taxRate: number;
    taxType: number;
    priceExclusiveTax: boolean;
    taxId: number;
    taxName: string;
  };
  coupon: string;
  deliveryCharges: number;
}

const initialState: IState = {
  cartItems: [],
  totalItems: 0,
  totalAmount: 0,
  mergedItems: [],
  expandedTab: "panel1",
  discount: 0,
  tax: 0,
  storeData: {
    id: "",
    name: "",
    taxRate: 0,
    taxType: 0,
    priceExclusiveTax: false,
    taxId: 0,
    taxName: "",
  },
  coupon: "",
  deliveryCharges: 0,
};

const cartSlice = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state: IState, action) => {
      state.cartItems = [...state.cartItems, action.payload];
      state.totalItems = state.cartItems.length;
      state.totalAmount = CalculatePrice(state.cartItems);
      state.mergedItems = mergedArr(state.cartItems);
      // state.tax = calculateTax(state.cartItems, state.storeData.taxRate);
      const { tax, items } = calculateTax(
        [...state.cartItems, action.payload],
        state.storeData.taxRate,
        state.storeData.taxId,
        state.storeData.taxName
      );
      // state.cartItems = items;
      state.tax = tax;
      state.discount = 0;
    },
    removeFromCart: (state: IState, action) => {
      const filteredItems = RemoveFromItems(
        state.cartItems,
        action.payload?.id
      );
      state.cartItems = [...filteredItems];
      const { tax, items } = calculateTax(
        filteredItems,
        state.storeData.taxRate,
        state.storeData.taxId,
        state.storeData.taxName
      );
      state.tax = tax;
      // state.cartItems = items;
      state.totalItems = state.cartItems.length;
      state.totalAmount = CalculatePrice(state.cartItems);
      state.mergedItems = mergedArr(state.cartItems);
      // state.tax = calculateTax(state.cartItems, state.storeData.taxRate);
      state.discount = 0;
    },
    deleteFormCart: (state: IState, action) => {
      const filteredItems = state.cartItems.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => item?.internalId !== action.payload?.id
      );

      state.cartItems = [...filteredItems];
      const { tax, items } = calculateTax(
        filteredItems,
        state.storeData.taxRate,
        state.storeData.taxId,
        state.storeData.taxName
      );
      state.tax = tax;
      // state.cartItems = items;
      state.totalItems = state.cartItems.length;
      state.totalAmount = CalculatePrice(state.cartItems);
      state.mergedItems = mergedArr(state.cartItems);
      // state.tax = calculateTax(state.cartItems, state.storeData.taxRate);
      state.discount = 0;
    },
    resetCart: (state: IState) => {
      state.cartItems = [];
      state.totalItems = 0;
      state.totalAmount = 0;
      state.mergedItems = [];
      state.discount = 0;
      state.tax = 0;
    },
    setExpandedTab: (state: IState, action) => {
      state.expandedTab = action.payload;
    },

    setDiscount: (state: IState, action) => {
      const { type, validProductArray, amount, maximumAmount } = action.payload;
      const { discount } = applyDiscount({
        inputArray: state.cartItems,
        validProductArray,
        type,
        amount,
        maximumAmount,
        orderTotal: state.totalAmount,
      });
      // state.totalAmount = total;
      state.discount = discount;
    },
    setStoreData: (state: IState, action) => {
      state.storeData = action.payload;
    },

    reCalculateTax: (state: IState) => {
      // state.tax = calculateTax(state.cartItems, state.storeData.taxRate);
      const { tax, items } = calculateTax(
        state.cartItems,
        state.storeData.taxRate,
        state.storeData.taxId,
        state.storeData.taxName
      );
      state.tax = tax;
      // state.cartItems = items;
      state.mergedItems = mergedArr(state.cartItems);
      state.totalItems = state.cartItems.length;
    },
    resetDiscount: (state: IState) => {
      state.discount = 0;
    },
    setLoyaltyDiscount: (state: IState, action) => {
      state.discount = action.payload;
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RemoveFromItems = (items: Array<any>, id: number | string) => {
  const array = [...items];
  const index = array.findIndex((obj) => obj.internalId === id);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
};

export const {
  addToCart,
  removeFromCart,
  deleteFormCart,
  resetCart,
  setExpandedTab,
  setDiscount,
  setStoreData,
  reCalculateTax,
  resetDiscount,
  setLoyaltyDiscount,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
