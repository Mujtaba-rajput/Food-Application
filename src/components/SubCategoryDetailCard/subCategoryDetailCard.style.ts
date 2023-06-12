import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";
import metrics from "../../utils/mertrics";

export default StyleSheet.create({
  container: {
    borderWidth: 0.6,
    borderColor: colors.primaryColor,
    borderRadius: 8,
    padding: metrics.containerPadding,
    marginHorizontal: metrics.containerPadding,
  },
  title: {
    fontSize: fonts.size.regular,
    color: colors.textColor,
  },
  subTitle: {
    fontSize: fonts.size.small,
    color: colors.primaryColor,
    paddingVertical: 5,
  },
  flatListContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  menuWrapper: {
    width: metrics.screenHeight * 0.26,
    padding: 2,
    marginVertical: 5,
    marginHorizontal: 2.5,
  },
  innerWrapper: {
    height: metrics.screenHeight * 0.27,
    borderWidth: 0.4,
    borderColor: colors.borderColor,
    borderRadius: 9.5,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: metrics.containerPadding,
  },
  activeInnerWrapper: {
    height: metrics.screenHeight * 0.27,
    borderWidth: 1,
    borderColor: colors.primaryColor,
    borderRadius: 9.5,
    padding: metrics.containerPadding,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  image: {
    width: metrics.screenWidth * 0.05,
    height: metrics.screenHeight * 0.07,
  },
  text: {
    color: colors.textColor,
    fontSize: fonts.size.small,
  },
  menuName: {
    fontSize: fonts.size.medium,
    color: colors.textColor,
    // textDecorationLine: "underline",
    // textDecorationStyle: "dashed",
    // textDecorationColor: colors.primaryColor,
    fontWeight: "600",
    paddingBottom: 5,
  },
  menuSize: {
    fontSize: fonts.size.medium,
    color: colors.textColor,
    fontWeight: "500",
    paddingBottom: 5,
  },
  multiInnerWrapper: {
    width: metrics.screenHeight * 0.8,
    height: metrics.screenHeight * 0.3,
    borderWidth: 0.4,
    borderColor: colors.borderColor,
    borderRadius: 8.5,

    padding: metrics.containerPadding,
    flexDirection: "row",
  },
  multiActiveInnerWrapper: {
    height: metrics.screenHeight * 0.3,
    width: metrics.screenHeight * 0.8,
    borderWidth: 1,
    borderColor: colors.primaryColor,
    borderRadius: 8.5,
    padding: metrics.containerPadding,
    flexDirection: "row",
  },
  multiImage: {
    width: metrics.screenWidth * 0.08,
    height: metrics.screenHeight * 0.2,
  },
  multiMenuWrapper: {
    width: metrics.screenHeight * 0.26,
    padding: 2,
    marginVertical: 5,
    marginHorizontal: 2.5,
    flexDirection: "row",
  },
});
