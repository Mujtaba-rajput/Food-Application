import React from "react";
import { Text, Image, View, ImageSourcePropType } from "react-native";
import CustomButton from "../CustomButton";
import styles from "./subCategoryCard.style";
import { MotiView } from "moti";

type SubCategoryType = {
  title?: string;
  price?: string;
  description?: string;
  image: ImageSourcePropType;
  onPressCustomise?: any;
  onAddToCart?: any;
  modifier?: Boolean;
  compulsoryModifier?: boolean;
  isDeal?: boolean;
  dealItems?: object[];
  index?: number;
};

const SubCategoryCard = ({
  title = "",
  image,
  index = 0,
  onPressCustomise,
  onAddToCart,
  price,
  description = "",
  modifier = false,
  compulsoryModifier = false,
  isDeal,
  dealItems = [],
}: SubCategoryType) => {
  return (
    <MotiView
      style={styles.container}
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 1000 + index * 200 }}
    >
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.imageSize} />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.inner}>
          <Text style={styles.titleStyle} numberOfLines={2}>
            {title}
          </Text>
          <View>
            <Text style={styles.priceStyle}>{price}</Text>
          </View>
        </View>
        {dealItems.length === 0 && (
          <View style={styles.dealContainer}>
            <Text numberOfLines={3} style={styles.description}>
              {description}
            </Text>
          </View>
        )}
        {dealItems.length > 0 &&
          dealItems.map((item: any) => {
            return (
              <View style={styles.dealContainer}>
                <Text numberOfLines={3} style={styles.description}>
                  {item.componentName}
                </Text>
              </View>
            );
          })}

        <View style={styles.footer}>
          {isDeal ||
            (modifier && (
              <CustomButton
                label="Customize"
                styles={styles.customizebuttonContainer}
                textStyles={styles.customizeText}
                onClick={onPressCustomise}
              />
            ))}
          {!compulsoryModifier && (
            <CustomButton
              label="Add to Cart"
              styles={styles.buttonContainer}
              textStyles={styles.buttonText}
              onClick={onAddToCart}
            />
          )}
        </View>
      </View>
    </MotiView>
  );
};

export default SubCategoryCard;
