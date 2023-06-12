import React from 'react';
import { Text } from 'react-native-paper';
import styles from './heading.style';

type HeadingType = {
  title?: string;
  style?: any;
};

const Heading = ({ title = '', style }: HeadingType) => {
  return <Text style={[styles.headingContainer, style]}>{title}</Text>;
};

export default Heading;
