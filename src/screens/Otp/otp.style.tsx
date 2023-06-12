import { StyleSheet } from "react-native";
import metrics from "../../utils/mertrics";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  bannerImageContainer: { width: metrics.screenHeight, flexGrow: 1 },
  SafeAreaView: { flex: 1, backgroundColor: "#FFF" },
  outerWrapper: {
    flexGrow: 3,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.white,
    bottom: 30,
  },
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
    margin: 5,
    color: colors.textColor,
  },
  focusCell: {
    borderColor: "#000",
  },
  keyboardAvoidingView: {
    alignItems: "center",
    justifyContent: "center",
  },
  otpTitle: {
    marginTop: 30,
    fontWeight: "600",
  },
  codeField: {
    height: 80,
    padding: 20,
    marginBottom: 30,
  },
  resendButton: {
    backgroundColor: colors.white,
    borderWidth: 0.4,
    borderColor: colors.textColor,
    width: metrics.screenWidth * 0.3,
  },
  resendButtonText: {
    color: colors.textColor,
  },
  proceedButton: {
    width: metrics.screenWidth * 0.3,
  },
  timer: {
    color: "red",
    fontSize: 14,
    paddingTop: 15,
  },
});
