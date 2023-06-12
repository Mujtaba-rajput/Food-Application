import { createSlice } from '@reduxjs/toolkit';
import { UserType } from './types';

type IState = {
  user: UserType;
};
const initialState: IState = {
  user: {
    email: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
// Not using Right Now
export const { setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
