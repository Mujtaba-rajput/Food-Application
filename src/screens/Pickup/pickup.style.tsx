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
  SafeAreaView1: { backgroundColor: "#FFF", flex: 0 },
  SafeAreaView2: { flex: 1, backgroundColor: "#FFF" },
  outerStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  outerWrapper: {
    flexGrow: 0.8,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: colors.white,
    bottom: 30,
  },
  innerWrapper: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  margin: {
    marginTop: 20,
  },
  buttonStyle: {
    backgroundColor: "#EEE",
    paddingHorizontal: 40,
    paddingVertical: 30,
    borderWidth: 0.5,
    borderColor: "#F0F0F0",
    borderRadius: 10,
  },
  text: { fontSize: 18, color: "#808080", fontWeight: "bold" },
  inputColor: {
    color: colors.textColor,
    paddingLeft: 15,
  },
  inputMargin: {
    marginBottom: 10,
  },
  outerHeading: {
    paddingHorizontal: 40,
  },
  backIconContainer: {
    marginTop: 45,
    marginLeft: 25,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
