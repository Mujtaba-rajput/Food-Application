import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import metrics from "../../utils/mertrics";

export default StyleSheet.create({
  textInputContainer: {
    backgroundColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    width: metrics.screenWidth / 2.2,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginLeft: 0,
    paddingLeft: 0,
  },
  textInput: {
    height: 48,
    margin: 20,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: colors.borderColor,
    color: colors.textColor,
  },
  predefinedPlacesDescription: {
    color: "black",
  },
  container: {
    borderWidth: 0,
  },
  listView: {
    borderWidth: 0,
    width: metrics.screenWidth / 2.3,
    marginTop: 10,
    left: 11,
    zIndex: 9999,
  },
  description: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "82%",
    color: colors.textColor,
  },
  poweredContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: "#c8c7cc",
    borderTopWidth: 0.5,
  },
  row: {
    color: "red",
    padding: 13,
    height: 44,
    width: 400,
    flexDirection: "row",
  },
  locationIcon: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryColor,
  },
});
