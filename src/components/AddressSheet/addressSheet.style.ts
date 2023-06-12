import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";
import metrics from "../../utils/mertrics";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  divide: {
    backgroundColor: colors.textColor,
    marginVertical: metrics.containerPadding,
  },
  innerContainer: {
    marginHorizontal: metrics.containerPadding,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: metrics.containerPadding,
  },
  innerMargin: {
    marginRight: metrics.containerPadding,
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
  radioTransparent: {
    width: fonts.size.small,
    height: fonts.size.small,
    borderRadius: fonts.size.small,
    backgroundColor: colors.white,
  },
  text: {
    fontSize: fonts.size.small,
    color: colors.textColor,
  },
  newAddressContainer: {
    marginHorizontal: 30,
    flexDirection: "row",
    marginBottom: 20,
  },
  newAddress: {
    marginRight: 10,
  },
  newAddessText: {
    fontSize: fonts.size.medium,
    color: colors.primaryColor,
  },
  footerContainer: {
    flex: 1,
  },
  innerFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    backgroundColor: "yellow",
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
  cancelText: {
    color: colors.textColor,
  },
  noAddressContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  noAddress: {
    color: colors.textColor,
    fontSize: fonts.size.medium,
  },
});
