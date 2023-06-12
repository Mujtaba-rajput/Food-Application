import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";
import metrics from "../../utils/mertrics";

export default StyleSheet.create({
  container: {
    height: metrics.screenWidth * 0.12,
    marginHorizontal: metrics.containerPadding,
    marginVertical: 10,
    backgroundColor: colors.light,
    borderRadius: 8,
    flexDirection: "row",
  },
  subContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: metrics.screenWidth * 0.07,
    height: metrics.screenHeight * 0.13,
    borderWidth: 0.3,
    borderRadius: 4,
    borderColor: colors.borderColor,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: metrics.screenWidth * 0.09,
    height: metrics.screenHeight * 0.08,
    resizeMode: "contain",
  },
  titleContainer: {
    paddingLeft: 10,
  },
  text: {
    fontSize: fonts.size.medium,
    color: colors.textColor,
  },
  description: {
    fontSize: fonts.size.small,
    color: colors.grey1,
  },
  footerContainer: {
    flex: 0.5,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  innerfooter: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  flex: {
    flex: 1,
  },
  circle: {
    width: 26,
    height: 26,
    borderWidth: 1,
    borderRadius: 13,
    justifyContent: "center",
    backgroundColor: colors.white,
    alignItems: "center",
    borderColor: "#DCDFE3",
  },
  circle1: {
    width: 26,
    height: 26,
    borderWidth: 1,
    borderRadius: 13,
    justifyContent: "center",
    backgroundColor: colors.white,
    alignItems: "center",
    alignSelf: "flex-end",
    borderColor: "#DCDFE3",
  },
  quantityContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  quantity: {
    color: "#323F4B",
    fontSize: fonts.size.medium,
  },
  swipeContainer: {
    flex: 1,
    marginTop: 10,
  },
  deleteWrapper: {
    height: metrics.screenHeight * 0.23,
    width: metrics.screenWidth * 0.06,
    backgroundColor: colors.primaryColor,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
