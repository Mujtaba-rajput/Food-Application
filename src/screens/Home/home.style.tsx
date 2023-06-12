import { StyleSheet, Platform } from "react-native";
import metrics from "../../utils/mertrics";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";

export default StyleSheet.create({
  opacity: {
    flex: 1,
    backgroundColor: colors.white,
    opacity: 0.3,
  },
  bannerImageContainer: {
    width: metrics.screenHeight,
    height:
      Platform.OS === "android"
        ? metrics.screenWidth * 0.18
        : metrics.screenWidth * 0.2,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: colors.primaryColor,
    elevation: 3,
    overflow: "hidden",
  },
  staticFeature: {
    marginHorizontal: metrics.containerPadding,
    width: metrics.screenWidth * 0.41,
    height: metrics.screenHeight * 0.3,
    marginTop: 8,
  },
  staticWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  SafeAreaView: { flex: 1, backgroundColor: colors.white },
  generalPadding: {
    padding: metrics.containerPadding,
  },
  advertiseTitleText: {
    fontWeight: "700",
  },
  advertiseImageSize: {
    height: metrics.screenHeight * 0.33,
    width:
      Platform.OS === "android"
        ? metrics.screenWidth * 0.23
        : metrics.screenWidth * 0.21,
  },
  leftBanner: {
    // flex: 1,
    width: metrics.screenWidth * 0.21,
    height: metrics.screenHeight * 0.33,
    backgroundColor: "#F8F8F8",
    // justifyContent: "space-evenly",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingLeft: 10,
  },
  title: {
    fontSize: fonts.size.xLarge,
    color: colors.white,
  },
  subTitleView: {
    paddingHorizontal: metrics.containerPadding,
  },
  subTitle: {
    fontSize: fonts.size.small,
    color: colors.white,
  },
  locationTitleView: {
    paddingHorizontal: metrics.containerPadding,
    paddingTop: 8,
  },
  locationTitle: {
    fontSize: fonts.size.regular,
    color: colors.white,
  },
  advertiseImageContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    // // paddingVertical: metrics.containerPadding,
  },
  flatlistContainerStyle: {
    flexGrow: 1,
    alignSelf: "center",
  },
  advertiseTitle: {
    paddingHorizontal: metrics.containerPadding,
    paddingTop: metrics.containerPadding,
  },
  bannerWrapper: {
    flexDirection: "row",
    marginHorizontal: metrics.containerPadding,
    width: 100,
    height: metrics.screenHeight * 0.6,
    marginTop: 8,
  },
  leftTitle: {
    fontSize: fonts.size.medium,
    color: colors.primaryColor,
    fontWeight: "700",
  },
  leftSubtitle: {
    fontSize: fonts.size.small,
    color: colors.textColor,
    fontWeight: "500",
  },
  leftDescription: {
    fontSize: fonts.size.small,
    color: colors.textColor,
    fontWeight: "800",
  },
  leftButton: {
    backgroundColor: colors.white,
    borderColor: colors.primaryColor,
    borderWidth: 0.8,
    paddingHorizontal: 2,
    color: "red",
    borderRadius: 4,
    paddingVertical: 4,
    width: metrics.screenWidth * 0.09,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3,
  },
  leftButtonWithBackground: {
    backgroundColor: colors.primaryColor,
    paddingHorizontal: 2,
    borderRadius: 4,
    paddingVertical: 4,
    width: metrics.screenWidth * 0.09,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3,
  },
  menuPadding: {
    paddingHorizontal: metrics.containerPadding,
    paddingBottom: 10,
    paddingTop: 10,
  },
  menu: {
    fontWeight: "700",
  },
  orderNow: {
    fontSize: fonts.size.small,
    color: colors.white,
  },
  leftButtonText: {
    fontSize: fonts.size.small,
    color: colors.primaryColor,
  },
  customize: {
    flexDirection: "row",
    marginTop: 4,
  },
});
