import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";
import metrics from "../../utils/mertrics";

export default StyleSheet.create({
  container: {
    padding: metrics.containerPadding,
    borderRadius: 8,
    backgroundColor: colors.light,
    marginHorizontal: metrics.containerPadding,
  },
  innerContainer: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  title: {
    fontSize: fonts.size.regular,
    color: colors.textColor,
  },
  listWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  item: {
    fontSize: fonts.size.small,
    color: colors.textColor,
  },
  description: {
    fontSize: fonts.size.small,
    color: colors.borderColor,
  },
  divide: {
    height: 1,
    color: colors.borderColor,
    marginVertical: 20,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  text: {
    fontSize: fonts.size.small,
    color: colors.textColor,
  },
  total: {
    fontSize: fonts.size.medium,
    color: colors.textColor,
    fontWeight: "600",
  },
  totalText: {
    fontSize: fonts.size.regular,
    color: colors.textColor,
    fontWeight: "500",
  },
  dashContainer: {
    marginBottom: 20,
  },
});
