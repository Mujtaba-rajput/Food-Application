import { StyleSheet, Platform } from "react-native";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";
import metrics from "../../utils/mertrics";

export default StyleSheet.create({
  container: {
    width:
      Platform.OS === "android"
        ? metrics.screenWidth / 2.2
        : metrics.screenWidth / 2.4,
    height: metrics.screenHeight / 2.9,
    borderRadius: 4,
    margin: Platform.OS === "android" ? 12 : 8,
    justifyContent: "flex-start",
    overflow: "visible",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.background,
  },
  badge: {
    color: "white",
    backgroundColor: "green",
  },
  imageContainer: {
    width: metrics.screenWidth / 6.8,
    height: metrics.screenHeight / 2.9,
    backgroundColor: "#F7F9FA",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  imageSize: {
    width: metrics.screenWidth * 0.13,
    resizeMode: "contain",
    height: metrics.screenHeight * 0.18,
  },
  subContainer: {
    alignSelf: "flex-start",
    width: metrics.screenWidth / 3,
    height: metrics.screenHeight / 12,
    paddingTop: 10,
  },
  titleStyle: {
    flex: 1,
    fontSize: fonts.size.regular,
    fontWeight: "600",
    color: colors.textColor,
    flexWrap: "wrap",
  },
  priceContainer: {
    width: metrics.screenWidth / 8,
    height: metrics.screenHeight / 13,
    alignSelf: "flex-start",
  },
  priceStyle: {
    fontSize: fonts.size.regular,
    color: colors.textColor,
    fontWeight: "600",
  },
  buttonContainer: {
    width: metrics.screenWidth / 8.5,
    height: metrics.screenHeight / 12,
    borderRadius: 2,
    marginTop: 8,
  },
  customizebuttonContainer: {
    width: metrics.screenWidth / 8.5,
    height: metrics.screenHeight / 12,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    backgroundColor: colors.white,
    marginTop: 8,
    marginRight: 10,
  },
  buttonText: {
    fontSize: fonts.size.small,
  },
  customizeText: {
    fontSize: fonts.size.small,
    color: colors.textColor,
  },
  description: {
    fontSize: fonts.size.small,
    color: colors.textColor,
  },
  footer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  innerContainer: {
    flex: 1,
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  dealContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
