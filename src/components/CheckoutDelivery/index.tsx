import React from "react";
import { Text, View, Image } from "react-native";
import styles from "./checkoutDelivery.style";
import Icon from "react-native-vector-icons/Entypo";
import colors from "../../utils/colors";

type CheckoutDeliveryType = {
  addresstitle?: string;
  address?: string;
  onPress?: any;
};

const CheckoutDelivery = ({
  address = "",
  onPress,
  addresstitle = "Delivery Address",
}: CheckoutDeliveryType) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View>
          <Text style={styles.title}>{addresstitle}</Text>
        </View>
        <View>
          <Icon
            name="edit"
            color={colors.primaryColor}
            size={20}
            onPress={onPress}
          />
        </View>
      </View>
      <View style={styles.innerPadding}>
        <Text style={styles.subTitle}>{address}</Text>
      </View>
      <View style={styles.innerPadding}>
        <Text style={styles.time}>
          {addresstitle === "Delivery Address"
            ? "Est. Delivery Time (20min)"
            : "Est. Preparation Time (25min)"}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/map.png")}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default CheckoutDelivery;
