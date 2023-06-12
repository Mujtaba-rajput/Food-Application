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
    marginVertical: 8,
  },
  cardContainer: {
    borderWidth: 0.4,
    borderRadius: 4,
    borderColor: colors.textColor,
    marginHorizontal: metrics.containerPadding,
    padding: metrics.containerPadding,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: metrics.containerPadding,
  },
  image: {
    width: 30,
    height: 30,
  },
  radioContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  text: {
    color: colors.textColor,
    fontSize: fonts.size.small,
  },
});
