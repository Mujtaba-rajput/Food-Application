import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";
import metrics from "../../utils/mertrics";

export default StyleSheet.create({
  container: {
    marginHorizontal: metrics.containerPadding,
    flex: 1,
  },
  divide: {
    color: colors.textColor,
    height: 1,
    marginTop: 10,
  },
  topWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: metrics.containerPadding,
  },
  text: {
    fontSize: fonts.size.small,
    color: colors.textColor,
  },
  innerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: metrics.containerPadding,
  },
  divider: {
    color: colors.textColor,
    height: 1,
  },
  dashContainer: {
    marginBottom: 20,
  },
});
