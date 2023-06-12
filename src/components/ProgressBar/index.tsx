import React from 'react';
import { View, Text } from 'react-native';
import { ProgressBar, Badge } from 'react-native-paper';
import colors from '../../utils/colors';
import styles from './progressBar.style';

type ProgressType = {
  style?: any;
  value?: number;
};

const Progressbar = ({ style = {}, value = 0.88 }: ProgressType) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.innerWrapper}>
          <View>
            <Badge style={styles.badgeColored}>1</Badge>
          </View>
          <View>
            <Text style={styles.innerText}>Menu</Text>
          </View>
        </View>
        <View style={styles.innerWrapper}>
          <View>
            <Badge style={styles.badgeColored}>2</Badge>
          </View>
          <View>
            <Text style={styles.innerText}>Cart</Text>
          </View>
        </View>
        <View style={styles.innerWrapper}>
          <View>
            <Badge style={[styles.badge, style]}>3</Badge>
          </View>
          <View>
            <Text style={styles.innerText}>Checkout</Text>
          </View>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <ProgressBar
          progress={value}
          color={colors.primaryColor}
          style={styles.progress}
        />
      </View>
    </View>
  );
};

export default Progressbar;
