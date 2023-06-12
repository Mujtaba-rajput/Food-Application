import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import metrics from '../../utils/mertrics';

export default StyleSheet.create({
  container: {
    padding: metrics.containerPadding,
    borderWidth: 0.4,
    borderRadius: 8,
    marginHorizontal: metrics.containerPadding,
    borderColor: colors.primaryColor,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: fonts.size.regular,
    color: colors.textColor,
  },
  subTitle: {
    fontSize: fonts.size.small,
    color: colors.borderColor,
  },
  time: {
    fontSize: fonts.size.small,
    color: colors.textColor,
  },
  innerPadding: {
    paddingVertical: 5,
  },
  imageContainer: {
    paddingTop: 10,
  },
  image: {
    width: '100%',
    height: 90,
    borderRadius: 8,
  },
});
