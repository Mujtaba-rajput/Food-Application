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
  divide: {
    marginVertical: 3,
    height: 0.8,
  },
  icon: {
    marginRight: 20,
  },
  title: {
    fontSize: fonts.size.regular,
    color: colors.textColor,
  },
  tabbarLabel: {
    fontSize: fonts.size.regular,
    textTransform: "none",
  },
  tabBarIndicator: {
    backgroundColor: colors.primaryColor,
  },
  tabBarIos: {
    backgroundColor: "#FFF",
    marginHorizontal: 40,
    borderRadius: 32,
    paddingVertical: 5,
    borderColor: "#FFF",
  },
  tabBar: {
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 20,
    marginHorizontal: 20,
    borderColor: colors.primaryColor,
  },
  tabBarIndicatorStyle: {
    backgroundColor: colors.primaryColor,
    height: "100%",
    borderRadius: 8,
  },
  scroll: {
    backgroundColor: colors.white,
    flexGrow: 1,
  },
  background: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
