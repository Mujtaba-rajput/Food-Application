import { StyleSheet, Platform } from "react-native";
import metrics from "../../utils/mertrics";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: metrics.containerPadding,
  },
  innerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
  },
  inputStyle: {
    color: colors.textColor,
  },
  inputContainer: {
    marginVertical: 0,
  },
  underlineTextContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 40,
    paddingTop: 10,
    paddingBottom: 30,
  },
  underlineText: {
    color: colors.primaryColor,
    textDecorationLine: "underline",
  },
  footerWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: metrics.containerPadding,
    marginBottom: 10,
  },
  loginButton: {
    width: Platform.OS === "android" ? "45%" : "43%",
  },
  guestButton: {
    width: Platform.OS === "android" ? "45%" : "43%",
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
  },
  text: {
    color: colors.borderColor,
  },
  input: {
    width: metrics.screenWidth / 2.7,
  },
  custom: {
    marginBottom: 15,
  },
  dashedContainer: {
    flexDirection: "row",
    marginHorizontal: metrics.containerPadding * 2,
    marginTop: metrics.containerPadding,
    marginBottom: 2,
  },
  dashedLine: {
    borderBottomWidth: 1.5,
    borderColor: "#B1B1B1",
    width: "40%",
  },
  dashedTextWrapper: {
    justifyContent: "center",
    alignItems: "center",
    top: 5,
    width: "20%",
  },
  dashedText: {
    color: colors.textColor,
    fontSize: fonts.size.medium,
  },
  bottom: {
    justifyContent: "center",
    alignItems: "center",
  },
  facebookContainer: {
    backgroundColor: "#007BFF",
  },
  facebook: {
    color: colors.white,
  },
  googleContainer: {
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
  },
  bottomPadding: {
    paddingTop: metrics.containerPadding,
  },
  bottomText: {
    color: colors.primaryColor,
    fontSize: fonts.size.medium,
  },
});
