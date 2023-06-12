import { StyleSheet } from "react-native";
import metrics from "../../utils/mertrics";
import colors from "../../utils/colors";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  bannerImageContainer: {
    width: metrics.screenHeight,
    height: metrics.screenWidth * 0.3,
  },
  areaView: { flex: 1, backgroundColor: "#FFF" },
  outerWrapper: {
    flexGrow: 3,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: colors.white,
    bottom: 30,
  },
  outerStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 30,
  },
  outerContainer: {
    backgroundColor: colors.light,
    width: metrics.screenWidth * 0.2,
    height: metrics.screenHeight * 0.45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    backgroundColor: colors.light,
    width: metrics.screenWidth * 0.17,
    height: metrics.screenHeight * 0.38,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.4,
    borderColor: colors.textColor,
  },
  deliveryIcon: {
    width: 42,
    height: 42,
    marginBottom: 15,
  },
  pickupIcon: {
    width: 60,
    height: 55,
  },
  outer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },
  scroll: {
    flex: 1,
  },
  orderText: {
    fontWeight: "500",
  },
});
