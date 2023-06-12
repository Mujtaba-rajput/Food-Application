import { StyleSheet, Platform } from "react-native";
import metrics from "../../utils/mertrics";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";

export default StyleSheet.create({
  SafeAreaView: { flex: 1, backgroundColor: colors.white },
  header: {
    marginTop: 40,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: metrics.containerPadding,
  },
  titleBarContainer: {
    paddingTop: metrics.containerPadding,
    paddingLeft: metrics.containerPadding,
  },
  title: {
    fontSize: fonts.size.regular,
    color: colors.textColor,
  },
  subTitle: {
    fontSize: fonts.size.small,
    color: colors.grey1,
    paddingTop: 10,
  },
  headerText: {
    color: colors.primaryColor,
    textDecorationLine: "underline",
  },
  container: {
    flexGrow: 1,
  },
  footer: {
    // flex: 1,
    alignSelf: "center",
    paddingBottom: 10,
    backgroundColor: "white",
  },
  footerButton: {
    width:
      Platform.OS === "android"
        ? metrics.screenWidth * 0.44
        : metrics.screenWidth * 0.42,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "white",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 100,
  },
  rowBack: {
    backgroundColor: colors.white,
    height: metrics.screenWidth * 0.14,
    marginHorizontal: metrics.containerPadding,
    marginVertical: 12,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 50,
    height: "80%",
    borderRadius: 8,
    // flex: 1,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 0,
  },
  backRightBtnRight: {
    backgroundColor: colors.delete,
    right: 5,
  },
});
