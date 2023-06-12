import { StyleSheet, Platform } from "react-native";
import metrics from "../../utils/mertrics";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";

export default StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: colors.white },
  safeAreaOpacity: {
    flex: 1,
    backgroundColor: colors.white,
    opacity: 0.1,
  },
  header: {
    marginTop: 40,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: metrics.containerPadding,
  },
  titleBarContainer: {
    paddingTop: metrics.containerPadding,
    paddingLeft: metrics.containerPadding,
  },
  title: {
    fontSize: fonts.size.regular,
    color: colors.textColor,
  },
  subTitle: {
    fontSize: fonts.size.small,
    color: colors.grey1,
    paddingTop: 10,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "90%",
    marginBottom: Platform.OS === "android" ? 30 : 10,
  },
  scrollContainer: {
    marginBottom: Platform.OS === "android" ? 5 : 30,
  },
  deliveryWrapper: {
    marginTop: 60,
  },
  backContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingTop: 10,
  },
  topWrapper: {
    flexDirection: "row",
  },
  rbSheet: {
    borderRadius: 40,
    flex: 0.8,
  },
  rbSheetAndroid: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 0.8,
  },
  specialInstructionContainer: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: colors.light,
    marginHorizontal: 20,
    marginTop: 20,
  },
  specialText: {
    fontSize: fonts.size.regular,
    color: colors.textColor,
  },
  specialInputField: {
    borderRadius: 4,
    borderColor: colors.textColor,
    width: "100%",
    height: Platform.OS === "android" ? 70 : 90,
    paddingHorizontal: 12,
    borderWidth: 0.5,
    color: colors.textColor,
    marginVertical: 10,
  },
  discountField: {
    borderColor: "#707070",
    borderWidth: 0.5,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginTop: 8,
    paddingVertical: Platform.OS === "android" ? 10 : 15,
    color: colors.textColor,
    backgroundColor: colors.white,
  },
  applyButton: {
    backgroundColor: colors.light,
    borderWidth: 0.4,
    borderColor: colors.textColor,
    width: "100%",
  },
  discountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: metrics.containerPadding,
  },
  discountButton: {
    width:
      Platform.OS === "android"
        ? metrics.screenWidth * 0.21
        : metrics.screenWidth * 0.2,
    backgroundColor: "white",
    borderWidth: 1,
  },
  discountColouredButton: {
    width:
      Platform.OS === "android"
        ? metrics.screenWidth * 0.21
        : metrics.screenWidth * 0.2,
  },
  redeemText: {
    fontSize: fonts.size.regular,
    color: colors.textColor,
    fontWeight: "500",
  },
  redeemContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  pointsText: {
    fontSize: fonts.size.regular,
    color: colors.primaryColor,
    fontWeight: "500",
  },
  availablePoints: {
    color: colors.textColor,
    fontSize: fonts.size.medium,
    paddingVertical: 10,
  },
});
