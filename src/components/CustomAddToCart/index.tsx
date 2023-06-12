import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './customAddToCart.style';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';

type CustomAddToCartType = {
  totalCount?: string;
  totalPrice?: any;
  onPress?: any;
};

const CustomAddToCart = ({
  totalCount = '',
  totalPrice,
  onPress,
}: CustomAddToCartType) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.innerContainer}>
        <View style={styles.itemContainer}>
          <View style={styles.image}>
            <Icon name={'cart-outline'} size={20} color={colors.primaryColor} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{totalCount}</Text>
          </View>
        </View>
        <View style={styles.textContainer1}>
          <Text style={styles.text}>{totalPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomAddToCart;
