import { StyleSheet } from "react-native";
import font from "../../utils/fonts";
import colors from "../../utils/colors";

export default StyleSheet.create({
  container: {
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.primaryColor,
    borderRadius: 4,
    marginTop: 20,
    height: 48,
  },
  label: {
    color: colors.white,
    fontSize: font.size.medium,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 20,
    resizeMode: "contain",
  },
});
