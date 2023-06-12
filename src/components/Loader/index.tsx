import React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "./loader.style";
import colors from "../../utils/colors";

type LoaderType = {
  isLoading?: boolean;
  color?: string;
};

const Loader = ({ isLoading, color = colors.primaryColor }: LoaderType) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={isLoading}
        color={color}
        size={"small"}
        style={styles.indicator}
      />
    </View>
  );
};

export default Loader;
