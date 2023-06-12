import { StyleSheet } from "react-native";
import metrics from "../../utils/mertrics";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";

export default StyleSheet.create({
  SafeAreaView: { flex: 1, backgroundColor: colors.white },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: metrics.containerPadding,
    paddingVertical: 10,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 20,
  },
  title: {
    fontSize: fonts.size.regular,
    color: colors.textColor,
  },
  divide: {
    marginTop: 4,
    marginBottom: metrics.containerPadding,
    height: 0.8,
  },
  loyaltyWrapper: {
    backgroundColor: "#F6F6F6",
    borderRadius: 4,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  loyaltyCardWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  innerWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    color: colors.textColor,
    fontSize: fonts.size.medium,
    marginVertical: 15,
  },
  nameText: {
    color: colors.textColor,
    fontSize: fonts.size.large,
    fontWeight: "700",
  },
  difference: {
    borderLeftWidth: 0.5,
    borderColor: colors.grey1,
  },
  general: {
    marginHorizontal: metrics.containerPadding,
  },
  tableWrapper: {
    borderWidth: 0.4,
    borderColor: colors.textColor,
    marginBottom: 40,
  },
  tableHeader: {
    backgroundColor: "#F6F6F6",
  },
});
