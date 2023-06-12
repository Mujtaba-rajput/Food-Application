import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import metrics from "../../utils/mertrics";
import fonts from "../../utils/fonts";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 4,
    marginHorizontal: metrics.containerPadding,
    marginTop: 20,
    padding: metrics.containerPadding,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: colors.light,
    width: metrics.screenHeight * 0.8,
    color: colors.textColor,
  },
  footer: {
    paddingVertical: 10,
  },
  footerButton: {
    width: metrics.screenHeight * 0.8,
  },
  cardOpen: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.textColor,
    fontSize: fonts.size.medium,
  },
});
