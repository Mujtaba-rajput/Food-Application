import { createSlice } from "@reduxjs/toolkit";
import { USER } from "./types";

export interface IState {
  user: USER;
  guestUser: {
    id: string | number;
  };
  userAddress: {
    latitude: number | string;
    longitude: number | string;
    address: string;
    id?: number | string;
    name?: string;
  };
  guestPhoneNumber: any;
  signupPhoneNumber: any;
  signupUser?: any;
}

const initialState: IState = {
  user: {
    Address: "",
    Code: "",
    DOB: "",
    Email: "",
    FirstName: "",
    Gender: 1,
    Id: "",
    IsActive: 0,
    LastName: "",
    PhoneNumber: "",
    Points: "",
  },
  guestUser: {
    id: "",
  },
  userAddress: {
    latitude: 0,
    longitude: 0,
    address: "",
    id: "",
  },
  guestPhoneNumber: "",
  signupPhoneNumber: "",
  signupUser: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state: IState, action) => {
      state.user = action.payload;
    },
    resetUser: (state: IState) => {
      state.user = {
        Address: "",
        Code: "",
        DOB: "",
        Email: "",
        FirstName: "",
        Gender: 1,
        Id: "",
        IsActive: 0,
        LastName: "",
        PhoneNumber: "",
        Points: "",
      };
    },
    setGuestUser: (state: IState, action) => {
      state.guestUser.id = action.payload;
    },
    setUserAddress: (state: IState, action) => {
      state.userAddress = action.payload;
    },
    setGuestPhoneNumber: (state: IState, action) => {
      state.guestPhoneNumber = action.payload;
    },
    setSignupPhoneNumber: (state: IState, action) => {
      state.signupPhoneNumber = action.payload;
    },
    setSignupUser: (state: IState, action) => {
      state.signupUser = action.payload;
    },
  },
});

export const {
  setUser,
  resetUser,
  setGuestUser,
  setUserAddress,
  setGuestPhoneNumber,
  setSignupPhoneNumber,
  setSignupUser,
} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
