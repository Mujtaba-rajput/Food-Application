import React from "react";
import { Text, Image, View, TouchableOpacity, FlatList } from "react-native";
import styles from "./customProductCard.style";
import fonts from "../../utils/fonts";
import colors from "../../utils/colors";
import metrics from "../../utils/mertrics";
import { CustomButton, CustomDropdown } from "..";
import { DecoratedPrice } from "../../utils/helper";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

type CustomProductCardType = {
  description?: string;
  calories?: string;
  image?: string;
  selected?: boolean;
  price?: string;
  onClick?: () => void;
  modifierSubValue?:
    | Array<{
        name: string;
        id: number;
        active?: number;
        cost?: string | number;
        deliveryPrice?: string | number;
        inStorePrice?: string | number;
      }>
    | [];
  isSubModifier?: boolean;
  onSubChildChange?: any;
};

const CustomProductCard = ({
  description,
  price,
  image,
  selected,
  onClick,
  modifierSubValue,
  isSubModifier,
  onSubChildChange,
}: CustomProductCardType) => {
  return (
    <View style={styles.multiMenuWrapper}>
      <TouchableOpacity
        style={
          isSubModifier && !selected
            ? styles.subModifierWrapper
            : !isSubModifier && selected
            ? styles.multiActiveInnerWrapper
            : isSubModifier && selected
            ? styles.activeSubModifierWrapper
            : styles.multiInnerWrapper
        }
        onPress={onClick}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../../assets/images/pizza.png")}
            style={
              isSubModifier && !selected
                ? styles.subMultiImage
                : !isSubModifier && selected
                ? styles.subMultiImage
                : styles.multiImage
            }
            resizeMode="contain"
          />
        </View>
        <View style={styles.listInner}>
          <View>
            <Text style={styles.menuName}>{description}</Text>
          </View>
          <View>
            <Text style={styles.menuSize}>{"20 Cals"}</Text>
          </View>
          <View>
            <Text style={styles.subTitle}>{price}</Text>
          </View>
          {isSubModifier && selected ? (
            <View
              style={{
                marginTop: 10,
                marginLeft: 70,
              }}
            >
              <CustomDropdown
                containerStyle={{
                  width: metrics.screenWidth * 0.15,
                  height: metrics.screenHeight * 0.09,
                }}
                data={modifierSubValue}
                placeHolder="Regular"
                rowTextForSelection={(item: any) => {
                  return item.name;
                }}
                buttonTextAfterSelection={(selectedItem: any) => {
                  return selectedItem.name;
                }}
                onSelect={onSubChildChange}
              />
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomProductCard;
