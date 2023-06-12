import { StyleSheet, Platform } from "react-native";
import metrics from "../../utils/mertrics";
import colors from "../../utils/colors";
import font from "../../utils/fonts";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingTop: metrics.containerPadding,
  },
  inputContainer: {
    marginVertical: 0,
  },
  inputStyle: {
    color: colors.textColor,
  },
  innerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  footer: {
    paddingTop: metrics.containerPadding,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width:
      Platform.OS === "android"
        ? metrics.screenWidth / 2.4
        : metrics.screenWidth / 2.7,
  },
  errorContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  errorLabel: {
    color: "red",
    marginTop: 7,
    fontSize: font.size.small,
    textAlign: "center",
  },
  custom: {
    marginBottom: 15,
  },
});
