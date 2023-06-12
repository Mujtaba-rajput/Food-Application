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
  generalPadding: {
    paddingTop: metrics.containerPadding,
  },
  iconContainer: {
    margin: 15,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: metrics.containerPadding,
  },
  flatlistContainerStyle: {
    // flexGrow: 1,
    alignSelf: "center",
  },
  cardMargin: {
    margin: 8,
  },
  footerPadding: {
    paddingVertical: metrics.containerPadding,
  },
  heading: {
    fontSize: fonts.size.xLarge,
    color: colors.white,
    fontWeight: "bold",
  },
  headingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.5,
  },
  noProductWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  noProductMesg: {
    color: "#cbcaca",
    fontSize: fonts.size.medium,
  },
  header: {
    marginHorizontal: 20,
    fontWeight: "600",
  },
});
