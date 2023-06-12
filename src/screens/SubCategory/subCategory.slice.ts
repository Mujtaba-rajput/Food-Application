import { createSlice } from "@reduxjs/toolkit";

export interface ISubCategoryState {
  product_id?: number;
}

const initialState: ISubCategoryState = {
  product_id: 0,
};

const SubCategorySlice = createSlice({
  name: "SubCategory",
  initialState,
  reducers: {
    setProductId: (state: ISubCategoryState, { payload }) => {
      state.product_id = payload;
    },
  },
});

export const { setProductId } = SubCategorySlice.actions;
export const subCategoryReducer = SubCategorySlice.reducer;
