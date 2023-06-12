import { createSlice } from '@reduxjs/toolkit';

export interface IOtpState {
  otp?: any;
}

const initialState: IOtpState = {
  otp: '',
};

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    setOtp: (state: IOtpState, { payload }) => {
      state.otp = payload;
    },
  },
});

export const { setOtp } = otpSlice.actions;
export const otpReducer = otpSlice.reducer;
