import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import font from "../../utils/fonts";

export default StyleSheet.create({
  dropdown1BtnStyle: {
    width: 350,
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
  },
  dropdown1BtnTxtStyle: {
    color: colors.textColor,
    textAlign: "left",
  },
  dropdown1DropdownStyle: {},
  dropdown1RowStyle: {
    backgroundColor: colors.white,
    borderBottomColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown1RowTxtStyle: {
    color: colors.textColor,
    textAlign: "left",
    // backgroundColor: colors.white,
  },
  dropdown1SelectedRowStyle: { backgroundColor: colors.primaryColor },
  dropdown1searchInputStyleStyle: {
    backgroundColor: colors.white,
  },
  fieldLabel: {
    marginBottom: 10,
    fontSize: font.size.medium,
    color: colors.textColor,
  },
});
