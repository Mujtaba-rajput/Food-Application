import React, { forwardRef } from 'react';
import { View, TextInput, Text } from 'react-native';
import styles from './input.style';
import colors from '../../utils/colors';

type CustomInputType = {
  containerStyles?: object;
  label?: string;
  inputStyles?: object;
  secureTextEntry?: boolean;
  value: any;
  onChange: (t: string) => void;
  error?: any;
  placeholderTextColor?: string;
  placeholder?: string;
};

const CustomInput = forwardRef(
  (
    {
      containerStyles = {},
      label = '',
      inputStyles = {},
      secureTextEntry = false,
      value,
      onChange,
      error = '',
      placeholderTextColor = '',
      placeholder = '',
    }: CustomInputType,
    ref: any,
  ) => {
    return (
      <View style={[styles.feildContainer, containerStyles]}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <TextInput
          ref={ref}
          style={[styles.input, inputStyles]}
          onChangeText={(text: string) => onChange(text)}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          value={value}
        />
        {error !== '' && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorLabel}>{error}</Text>
          </View>
        )}
      </View>
    );
  },
);

export default CustomInput;
