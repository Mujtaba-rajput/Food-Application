import { homeApi } from "../screens/Home/home.api";
import { homeReducer } from "../screens/Home/home.slice";
import { configureStore } from "@reduxjs/toolkit";
import { outletsApi } from "../screens/Outlets/outlets.api";
import { outletsReducer } from "../screens/Outlets/outlets.slice";
import { subCategoryReducer } from "../screens/SubCategory/subCategory.slice";
import { subCategoryApi } from "../screens/SubCategory/subCategory.api";
import { checkoutApi } from "../screens/Checkout/checkout.api";
import { checkoutReducer } from "../screens/Checkout/checkout.slice";
import { signupApi } from "../screens/Signup/signup.api";
import { signupReducer } from "../screens/Signup/signup.slice";
import { orderTypeReducer } from "../screens/OrderType/orderType.slice";
import { loginApi } from "../screens/Login/login.api";
import { loginReducer } from "../screens/Login/login.slice";
import { otpApi } from "../screens/Otp/otp.api";
import { otpReducer } from "../screens/Otp/otp.slice";
import { cartReducer } from "../screens/Cart/cart.slice";
import { productReducer } from "../screens/SubCategoryDetails/subCategoryDetail.slice";

export const store = configureStore({
  reducer: {
    orderType: orderTypeReducer,
    cart: cartReducer,
    home: homeReducer,
    product: productReducer,
    [homeApi.reducerPath]: homeApi.reducer,
    signup: signupReducer,
    [signupApi.reducerPath]: signupApi.reducer,
    login: loginReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    otp: otpReducer,
    [otpApi.reducerPath]: otpApi.reducer,
    outlets: outletsReducer,
    [outletsApi.reducerPath]: outletsApi.reducer,
    subCategory: subCategoryReducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
    checkout: checkoutReducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      homeApi.middleware,
      signupApi.middleware,
      loginApi.middleware,
      otpApi.middleware,
      outletsApi.middleware,
      checkoutApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
