import { Dimensions } from 'react-native';
import colors from './colors';

const type = {
  light: 'SpaceGrotesk-light',
  regular: 'SpaceGrotesk-Regular',
  medium: 'SpaceGrotesk-Medium',
  semiBold: 'SpaceGrotesk-SemiBold',
  bold: 'SpaceGrotesk-Bold',
};

const size = {
  xLarge: (20 * Dimensions.get('window').width) / 375,
  large: (18 * Dimensions.get('window').width) / 375,
  regular: (16 * Dimensions.get('window').width) / 375,
  default: (15 * Dimensions.get('window').width) / 375,
  medium: (14 * Dimensions.get('window').width) / 375,
  small: (12 * Dimensions.get('window').width) / 375,
};

const style = {
  description: {
    fontFamily: type.light,
    fontSize: size.small,
    color: colors.textColor,
  },
  label: {
    fontFamily: type.semiBold,
    fontSize: size.medium,
    color: colors.textColor,
  },
  input: {
    fontFamily: type.regular,
    fontSize: size.default,
    color: colors.textColor,
  },
  heading: {
    fontFamily: type.bold,
    fontSize: size.xLarge,
    color: colors.textColor,
    lineHeight: 28,
  },
  subHeading: {
    fontFamily: type.light,
    fontSize: size.medium,
    color: colors.textColor,
  },
};

export default {
  type,
  size,
  style,
};
