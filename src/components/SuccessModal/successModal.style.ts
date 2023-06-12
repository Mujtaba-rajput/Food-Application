import { StyleSheet, Platform } from "react-native";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";
import metrics from "../../utils/mertrics";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  subContainer: {
    width: metrics.screenWidth * 0.38,
    height: metrics.screenHeight * 1.1,
    margin: metrics.containerPadding,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 35,
    paddingTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
  },
  success: {
    paddingTop: 30,
    paddingBottom: metrics.containerPadding,
  },
  successText: {
    fontSize: fonts.size.xLarge,
    color: colors.primaryColor,
  },
  descriptionContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: fonts.size.medium,
    color: colors.textColor,
    lineHeight: 24,
    textAlign: "center",
    fontWeight: "500",
  },
  button: {
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    paddingVertical: Platform.OS === "android" ? 0 : 20,
  },
  trackButtonContainer: {
    marginTop: 10,
    borderWidth: 0.4,
    borderRadius: 4,
    borderColor: colors.textColor,
    padding: 5,
  },
  trackButton: {
    fontSize: fonts.size.medium,
    color: colors.primaryColor,
    fontWeight: "600",
  },
});
