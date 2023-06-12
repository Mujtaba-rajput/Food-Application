import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import metrics from '../../utils/mertrics';

export default StyleSheet.create({
  container: {
    width: '80%',
    borderRadius: 8,
    justifyContent: 'center',
    padding: metrics.containerPadding,
    overflow: 'visible',
    height: 70,
    backgroundColor: colors.primaryColor,
    alignSelf: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: fonts.size.medium,
    color: colors.white,
  },
  textContainer1: {
    alignSelf: 'center',
  },
});
