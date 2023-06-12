import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";
import metrics from "../../utils/mertrics";

export default StyleSheet.create({
  deliveryIcon: {
    width: 42,
    height: 42,
  },
  cardWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  cardContainer: {
    backgroundColor: colors.light,
    width: metrics.screenWidth * 0.42,
    height: metrics.screenHeight * 0.36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cardSubContainer: {
    backgroundColor: colors.light,
    width: metrics.screenWidth * 0.39,
    height: metrics.screenHeight * 0.3,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.4,
    borderColor: colors.textColor,
    flexDirection: "row",
  },
  margin: {
    marginLeft: metrics.containerPadding,
    width: "50%",
    fontWeight: "500",
  },
});
