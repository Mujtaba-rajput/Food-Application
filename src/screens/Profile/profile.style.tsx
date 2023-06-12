import { StyleSheet } from "react-native";
import metrics from "../../utils/mertrics";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";

export default StyleSheet.create({
  SafeAreaView: { flex: 1, backgroundColor: colors.white },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: metrics.containerPadding,
    paddingVertical: 10,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  outerWrapper: {
    backgroundColor: colors.light,
    borderRadius: 4,
    marginHorizontal: metrics.containerPadding,
    marginTop: 20,
    padding: metrics.containerPadding,
  },
  icon: {
    marginRight: 20,
  },
  title: {
    fontSize: fonts.size.regular,
    color: colors.textColor,
  },
  rightButtonContainer: {
    justifyContent: "center",
  },
  signout: {
    fontSize: fonts.size.small,
    color: colors.primaryColor,
  },
  divide: {
    marginVertical: 8,
  },
  text: {
    color: colors.textColor,
    fontSize: fonts.size.medium,
  },
});
