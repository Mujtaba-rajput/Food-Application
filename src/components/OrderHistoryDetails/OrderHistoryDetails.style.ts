import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";

export default StyleSheet.create({
  orderIdWrapper: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: colors.light,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 4,
  },
  row: {
    flexDirection: "row",
  },
  title: {
    fontSize: fonts.size.medium,
    color: colors.textColor,
    fontWeight: "600",
    paddingRight: 2,
  },
  typeText: {
    fontSize: fonts.size.medium,
    color: colors.textColor,
    fontWeight: "600",
  },
  idText: {
    fontSize: fonts.size.medium,
    color: colors.grey1,
  },
  detailsWrapper: {
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: colors.light,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 4,
  },
  transparentRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: colors.primaryColor,
  },
  subDetailsWrapper: {
    justifyContent: "center",
    paddingLeft: 10,
  },
  detailsTitle: {
    fontSize: fonts.size.medium,
    color: colors.textColor,
    fontWeight: "500",
    marginBottom: 5,
  },
  detailsTime: {
    fontSize: fonts.size.medium,
    color: colors.grey1,
  },
  strainghtLine: {
    borderLeftWidth: 4,
    borderColor: colors.primaryColor,
    padding: 30,
    marginLeft: 9,
    marginBottom: 15,
  },
  filledRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primaryColor,
  },
});
