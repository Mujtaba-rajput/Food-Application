import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const metrics = {
  screenWidth: height,
  screenHeight: width,
  containerPadding: 20,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 60,
  },
  images: {
    small: 20,
    medium: 40,
    large: 80,
    logo: 120,
  },
};

const ScreenWidht = Dimensions.get('window').width;
export const Adjust = (num: number) => (num * ScreenWidht) / 375;

export default metrics;
