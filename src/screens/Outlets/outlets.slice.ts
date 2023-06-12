import { createSlice } from "@reduxjs/toolkit";

export interface IOutletsState {
  outlets?: any;
  currentAddress?: any;
  latLong?: any;
}

const initialState: IOutletsState = {
  outlets: [],
  currentAddress: {},
  latLong: {},
};

const outletsSlice = createSlice({
  name: "outlets",
  initialState,
  reducers: {
    setStoreAddress: (state: IOutletsState, { payload }) => {
      state.outlets = payload;
    },
    setCurrentAddress: (state: IOutletsState, { payload }) => {
      state.currentAddress = payload;
    },
    setLatLong: (state: IOutletsState, { payload }) => {
      state.latLong = payload;
    },
  },
});

export const { setStoreAddress, setCurrentAddress, setLatLong } =
  outletsSlice.actions;
export const outletsReducer = outletsSlice.reducer;
