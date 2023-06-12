import metrics from "../../utils/mertrics";
import { StyleSheet, Platform } from "react-native";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";

export default StyleSheet.create({
  titleContainer: {
    width:
      Platform.OS === "android"
        ? metrics.screenWidth / 7
        : metrics.screenWidth / 7.5,
    height: metrics.screenHeight / 2.5,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DCDFE3",
    shadowColor: "black",
    marginHorizontal: 3,
    marginBottom: 10,
  },
  background: {
    width:
      Platform.OS === "android"
        ? metrics.screenWidth / 7.5
        : metrics.screenWidth / 7.5,
    height: metrics.screenHeight / 2.5,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 3,
    marginBottom: 10,
  },
  imageSize: {
    width: metrics.screenWidth / 8,
    height: metrics.screenHeight / 4.8,
  },
  text: {
    fontSize: fonts.size.medium,
    color: colors.textColor,
    textAlign: "left",
    fontWeight: "700",
  },
  subView: {
    paddingHorizontal: 5,
    width: "90%",
  },
});
