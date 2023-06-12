import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import font from "../../utils/fonts";

export default StyleSheet.create({
  feildContainer: {
    marginVertical: 5,
  },
  fieldLabel: {
    marginBottom: 10,
    fontSize: font.size.medium,
    color: colors.textColor,
  },
  errorLabel: {
    color: "red",
    marginTop: 7,
    fontSize: font.size.small,
    textAlign: "center",
  },
  input: {
    width: 350,
    fontSize: font.size.regular,
    borderWidth: 0.5,
    height: 48,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    borderColor: colors.borderColor,
  },
  errorContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
