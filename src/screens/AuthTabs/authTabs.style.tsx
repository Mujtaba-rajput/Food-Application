import { StyleSheet } from "react-native";
import metrics from "../../utils/mertrics";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  bannerImageContainer: {
    width: metrics.screenHeight,
    height: metrics.screenWidth * 0.3,
  },
  SafeAreaView: { flex: 1, backgroundColor: "#FFF" },
  outerWrapper: {
    flexGrow: 3,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: colors.white,
    bottom: 30,
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
    backgroundColor: "#FFF",
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    paddingVertical: 5,
    borderColor: "#FFF",
  },
});
