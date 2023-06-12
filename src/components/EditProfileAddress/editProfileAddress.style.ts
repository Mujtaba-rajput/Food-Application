import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";
import metrics from "../../utils/mertrics";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 4,
    marginHorizontal: metrics.containerPadding,
    marginTop: 20,
    padding: metrics.containerPadding,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: colors.light,
  },
  footer: {
    paddingVertical: 10,
  },
  innerContainer: {
    marginHorizontal: metrics.containerPadding,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  radioContainer: {
    marginRight: metrics.containerPadding,
  },
  radio: {
    width: fonts.size.regular,
    height: fonts.size.regular,
    borderRadius: fonts.size.regular,
    borderWidth: 0.4,
    borderColor: colors.textColor,
    justifyContent: "center",
    alignItems: "center",
  },
  radioColor: {
    width: fonts.size.small,
    height: fonts.size.small,
    borderRadius: fonts.size.small,
    backgroundColor: colors.primaryColor,
  },
  newAddressContainer: {
    marginHorizontal: 10,
    flexDirection: "row",
    paddingTop: 20,
  },
  text: {
    fontSize: fonts.size.small,
    color: colors.textColor,
  },
  newAddress: {
    marginRight: 10,
  },
  newAddessText: {
    fontSize: fonts.size.medium,
    color: colors.primaryColor,
  },
  innerFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  cancelButton: {
    width: "45%",
    backgroundColor: colors.white,
    borderWidth: 0.4,
    borderColor: colors.borderColor,
  },
  applyButton: {
    width: "45%",
  },
  generalContainer: {
    paddingVertical: metrics.containerPadding,
  },
  title: {
    color: colors.textColor,
    fontSize: fonts.size.medium,
  },
});
