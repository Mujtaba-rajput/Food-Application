import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import style from "./customButton.style";
import { Loader } from "..";
import colors from "../../utils/colors";

type CustomButtonType = {
  onClick?: any;
  label?: string;
  styles?: object;
  image?: any;
  leftImage?: any;
  textStyles?: object;
  labelTwo?: string;
  isDisabled?: boolean;
  textStylesTwo?: object;
  isLoading?: boolean;
};

const CustomButton = ({
  onClick,
  label = "",
  styles = {},
  image = "",
  leftImage,
  textStyles = {},
  labelTwo = "",
  isDisabled = false,
  textStylesTwo = {},
  isLoading = false,
}: CustomButtonType) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.8}
      style={[
        style.container,
        styles,
        // disabled && { backgroundColor: Colors.cardBorderColor },
      ]}
      // disabled={disabled}
      disabled={isDisabled}
    >
      {leftImage !== undefined && (
        <Image source={leftImage} style={style.image} />
      )}
      {isLoading ? (
        <Loader isLoading={isLoading} color={colors.white} />
      ) : (
        <Text style={[style.label, textStyles]}>{label}</Text>
      )}
      {labelTwo && <Text style={[style.label, textStylesTwo]}>{labelTwo}</Text>}
    </TouchableOpacity>
  );
};

export default CustomButton;
