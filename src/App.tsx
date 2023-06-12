import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import MainNavigation from "./navigation";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import colors from "./utils/colors";
import fonts from "./utils/fonts";

const App = () => {
  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={style.isSuccess}
        contentContainerStyle={style.container}
        text1Style={style.successText}
        text2Style={style.description}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        text1Style={style.errorText}
        text2Style={style.description}
        style={style.isError}
      />
    ),
  };

  return (
    <Provider store={store}>
      <MainNavigation />
      <Toast config={toastConfig} />
    </Provider>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 12,
    color: "#000",
  },
  successText: {
    fontSize: fonts.size.medium,
    color: colors.textColor,
  },
  errorText: {
    fontSize: fonts.size.medium,
    color: colors.error,
  },
  description: {
    fontSize: fonts.size.small,
  },
  isSuccess: {
    borderLeftColor: colors.primaryColor,
  },
  isError: {
    borderLeftColor: colors.error,
  },
});
