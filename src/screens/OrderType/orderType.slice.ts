import { createSlice } from "@reduxjs/toolkit";

export interface IState {
  orderType: "delivery" | "pickup";
  store: {
    id: string | number;
    name: string;
  };
  city: {
    id: string | number;
    name: string;
  };
  area: {
    id: string | number;
    name: string;
  };
  address: {
    customerAddress: string;
    city: string;
  };
  notes: string;
}

const initialState: IState = {
  orderType: "delivery",
  store: {
    id: "",
    name: "",
  },
  city: {
    id: "",
    name: "",
  },
  area: {
    id: "",
    name: "",
  },
  address: {
    customerAddress: "",
    city: "",
  },
  notes: "",
};

const orderTypeSlice = createSlice({
  name: "addressReducer",
  initialState,
  reducers: {
    setStore: (state: IState, action) => {
      const {
        payload: { store, orderType, city, area },
      } = action;
      state.orderType = orderType;
      state.store = store;
      state.city = city;
      state.area = area;
    },
    setAddress: (state: IState, action) => {
      const {
        payload: { address },
      } = action;
      state.address = address;
    },
    setNotes: (state: IState, action) => {
      state.notes = action.payload;
    },
    setOrderType: (state: IState, action) => {
      state.orderType = action.payload;
    },
    setCurrentStore: (state: IState, action) => {
      state.store = action.payload;
    },
  },
});

export const { setStore, setAddress, setNotes, setOrderType, setCurrentStore } =
  orderTypeSlice.actions;
export const orderTypeReducer = orderTypeSlice.reducer;
