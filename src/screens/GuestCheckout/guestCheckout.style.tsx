import { StyleSheet } from "react-native";
import metrics from "../../utils/mertrics";
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";

export default StyleSheet.create({
  SafeAreaView: { flex: 1, backgroundColor: colors.white },
  innerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  titleContainer: {
    paddingHorizontal: metrics.containerPadding,
    paddingTop: metrics.containerPadding,
  },
  title: {
    fontSize: fonts.size.xLarge,
    color: colors.textColor,
  },
  subTitle: {
    fontSize: fonts.size.regular,
    color: colors.textColor,
  },
  inputWrapper: {
    marginHorizontal: metrics.containerPadding,
    marginTop: 10,
    marginBottom: metrics.containerPadding,
  },
  input: {
    width: "100%",
    borderColor: colors.textColor,
    borderWidth: 0.4,
    paddingLeft: 15,
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    width: "90%",
  },
});
