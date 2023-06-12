import { StyleSheet, Platform } from "react-native";
import metrics from "../../utils/mertrics";
import colors from "../../utils/colors";

export default StyleSheet.create({
  SafeAreaView: { flex: 1, backgroundColor: colors.white },
  mapView: {
    flex: 0.7,
  },
  addressView: {
    flex: 0.5,
    backgroundColor: "white",
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    bottom: 30,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    padding: metrics.containerPadding,
  },
  divider: {
    height: 1,
    marginBottom: 5,
  },
  addressField: {
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    paddingBottom: Platform.OS === "android" ? metrics.containerPadding : 0,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  customWidth: {
    width: metrics.screenWidth * 0.34,
  },
  locationIcon: {
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.primaryColor,
  },
  locationIconContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 50,
    paddingRight: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  locate: {
    justifyContent: Platform.OS === "android" ? "center" : "flex-end",
  },
});
