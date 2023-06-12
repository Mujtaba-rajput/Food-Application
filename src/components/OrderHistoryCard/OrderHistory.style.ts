import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";
import metrics from "../../utils/mertrics";

export default StyleSheet.create({
  container: {
    borderWidth: 0.4,
    borderRadius: 4,
    borderColor: colors.textColor,
    marginHorizontal: metrics.containerPadding,
    marginBottom: metrics.containerPadding,
  },
  subContainer: {
    flexDirection: "row",
  },
  imageWrapper: {
    width: metrics.screenWidth * 0.16,
    height: metrics.screenHeight * 0.26,
    backgroundColor: "#EEF2F5",
    borderTopLeftRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: metrics.screenWidth * 0.2,
    height: metrics.screenHeight * 0.2,
  },
  textWrapper: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "space-evenly",
  },
  title: {
    color: colors.textColor,
    fontSize: fonts.size.regular,
    fontWeight: "500",
  },
  time: {
    fontSize: fonts.size.medium,
    color: colors.grey1,
  },
  description: {
    color: colors.textColor,
    fontSize: fonts.size.small,
  },
  priceWrapper: {
    justifyContent: "space-around",
    paddingRight: 10,
  },
  price: {
    fontWeight: "700",
    color: colors.textColor,
    fontSize: fonts.size.medium,
  },
  iconWrapper: {
    backgroundColor: "#EEF2F5",
    width: 34,
    height: 34,
    borderRadius: 17,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
});
