import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

export default StyleSheet.create({
  container: {
    flex: 0,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    top: 44,
    overflow: 'visible',
  },
  innerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerText: {
    fontSize: 10,
    color: colors.textColor,
  },
  badgeColored: {
    backgroundColor: colors.primaryColor,
  },
  badge: {
    backgroundColor: 'lightgrey',
    color: colors.textColor,
  },
  progressContainer: {
    marginTop: 20,
    overflow: 'hidden',
  },
  progress: {
    overflow: 'hidden',
    height: 0.4,
  },
});
