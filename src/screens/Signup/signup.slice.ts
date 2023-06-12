import { createSlice } from '@reduxjs/toolkit';

export interface ISignupState {
  signupData?: any;
}

const initialState: ISignupState = {
  signupData: {},
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setSignup: (state: ISignupState, { payload }) => {
      state.signupData = payload;
    },
  },
});

export const { setSignup } = signupSlice.actions;
export const signupReducer = signupSlice.reducer;
