import React from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  ImageSourcePropType,
} from "react-native";
import styles from "./categoryCard.style";
import colors from "../../utils/colors";
import { MotiView } from "moti";

type CategoryType = {
  title?: any;
  image: ImageSourcePropType;
  onPress?: any;
  backgroundColor?: string;
  index?: number;
};

const CategoryCard = ({
  title = "",
  image,
  onPress,
  backgroundColor,
  index = 0,
}: CategoryType) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 1000 + index * 200 }}
    >
      <TouchableOpacity
        style={{
          ...styles.titleContainer,
          backgroundColor: backgroundColor,
        }}
        onPress={onPress}
        activeOpacity={0.2}
      >
        <View style={styles.subView}>
          <Text
            style={{
              ...styles.text,
              color:
                backgroundColor === "#ffffff"
                  ? "#000000"
                  : backgroundColor === "#EF6065"
                  ? "#ffffff"
                  : backgroundColor === "#525D70"
                  ? "#ffffff"
                  : backgroundColor === "#dddfe0"
                  ? "#000000"
                  : backgroundColor === "#b24f4d"
                  ? "#ffffff"
                  : colors.textColor,
            }}
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>
        <Image source={image} style={styles.imageSize} resizeMode="contain" />
      </TouchableOpacity>
    </MotiView>
  );
};

export default CategoryCard;
