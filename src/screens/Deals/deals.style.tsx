import { StyleSheet, Platform } from "react-native";
import metrics from "../../utils/mertrics";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";

export default StyleSheet.create({
  bannerImageContainer: {
    width: metrics.screenHeight,
    height: metrics.screenWidth * 0.22,
  },
  SafeAreaView: { flex: 1, backgroundColor: colors.white },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: metrics.containerPadding,
    paddingTop: metrics.containerPadding,
  },
  subTitleContainer: {
    paddingVertical: 10,
  },
  subTitle: {
    fontSize: fonts.size.regular,
    color: colors.textColor,
  },
  heading: {
    color: colors.primaryColor,
  },
  generalFlex: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  minContainer: {
    paddingRight: 10,
  },
  minButton: {
    width: 34,
    height: 34,
    borderWidth: 0.4,
    borderRadius: 17,
    justifyContent: "center",
    backgroundColor: colors.white,
    alignItems: "center",
    borderColor: "#707070",
  },
  textContainer: {
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  text: {
    fontSize: fonts.size.xLarge,
    color: colors.textColor,
    fontWeight: "600",
  },
  maxContainer: {
    paddingLeft: 10,
  },
  maxButton: {
    width: 34,
    height: 34,
    borderWidth: 0.4,
    borderRadius: 17,
    justifyContent: "center",
    backgroundColor: colors.white,
    alignItems: "center",
    borderColor: "#707070",
  },
  descriptionContainer: {
    flex: 1,
    paddingHorizontal: metrics.containerPadding,
  },
  description: {
    fontSize: fonts.size.small,
    color: "#707070",
    lineHeight: 15,
    paddingBottom: 8,
  },
  outerWrapper: {
    paddingVertical: 12,
  },
  cancelIconContainer: {
    padding: metrics.containerPadding,
  },
  cancelIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 0.1,
    borderColor: colors.textColor,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  footerContainer: {
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width:
      Platform.OS === "android"
        ? metrics.screenWidth * 0.44
        : metrics.screenWidth * 0.42,
  },
  tabView: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: fonts.size.regular,
    color: colors.textColor,
    fontWeight: "500",
  },
  tabWrapper: {
    borderWidth: 0.6,
    borderColor: colors.primaryColor,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    paddingBottom: 10,
  },
  tabDetail: {
    fontSize: fonts.size.medium,
    color: colors.primaryColor,
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  selectionTitleWrapper: {
    marginHorizontal: 20,
  },
  selectionTitle: {
    borderWidth: 1,
    borderColor: colors.primaryColor,
    backgroundColor: "#F6F6F6",
    width: metrics.screenWidth * 0.2,
    marginRight: 15,
  },
  selectionText: {
    color: colors.textColor,
    fontSize: fonts.size.regular,
  },
});
