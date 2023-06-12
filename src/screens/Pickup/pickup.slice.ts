import { createSlice } from "@reduxjs/toolkit";

export interface IOutletsState {
  outlets?: any;
  currentAddress?: any;
}

const initialState: IOutletsState = {
  outlets: [],
  currentAddress: {},
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
  },
});

export const { setStoreAddress, setCurrentAddress } = outletsSlice.actions;
export const outletsReducer = outletsSlice.reducer;
