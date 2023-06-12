import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";
import metrics from "../../utils/mertrics";

const width = metrics.screenWidth / 42;
const height = metrics.screenHeight / 21;

const newWidth = metrics.screenWidth / 60;
const newHeight = metrics.screenHeight / 30;

export default StyleSheet.create({
  container: {
    padding: metrics.containerPadding,
    borderRadius: 8,
    backgroundColor: colors.light,
    margin: metrics.containerPadding,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: fonts.size.regular,
    color: colors.textColor,
  },
  unSelectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0.4,
    borderRadius: 8,
    borderColor: colors.textColor,
    paddingHorizontal: 10,
    paddingVertical: metrics.containerPadding,
    marginVertical: 10,
  },
  unSelectText: {
    fontSize: fonts.size.small,
    color: colors.textColor,
  },
  unSelectRadio: {
    borderColor: colors.textColor,
    borderWidth: 0.4,
    width: width,
    height: height,
    borderRadius: width + height / 2,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  selectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0.4,
    borderRadius: 8,
    borderColor: colors.textColor,
    backgroundColor: colors.primaryColor,
    paddingHorizontal: 10,
    paddingVertical: metrics.containerPadding,
    marginVertical: 10,
  },
  selectText: {
    fontSize: fonts.size.small,
    color: colors.white,
  },
  selectRadio: {
    borderColor: colors.textColor,
    borderWidth: 0.4,
    width: width,
    height: height,
    borderRadius: width + height / 2,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  coloredCircle: {
    width: newWidth,
    height: newHeight,
    borderRadius: newWidth + newHeight / 2,
    backgroundColor: colors.primaryColor,
  },
});
