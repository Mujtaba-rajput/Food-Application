import React from "react";
import { Text, View } from "react-native";
import styles from "./cartCalculationDetails.style";
import { Divider } from "react-native-paper";
import DashedLine from "react-native-dashed-line";

type CartCalculationDetailsType = {
  subTotal?: any;
  tax?: any;
  discount?: any;
  deliveryFee?: any;
  total?: any;
};

const CartCalculationDetails = ({
  subTotal,
  tax,
  discount,
  deliveryFee,
  total,
}: CartCalculationDetailsType) => {
  return (
    <View style={styles.container}>
      <Divider style={styles.divide} />
      <View style={styles.topWrapper}>
        <View>
          <Text style={styles.text}>Sub Total</Text>
        </View>
        <View>
          <Text style={styles.text}>{subTotal}</Text>
        </View>
      </View>
      <View style={styles.innerWrapper}>
        <View>
          <Text style={styles.text}>Tax</Text>
        </View>
        <View>
          <Text style={styles.text}>{tax}</Text>
        </View>
      </View>
      <View style={styles.innerWrapper}>
        <View>
          <Text style={styles.text}>Discount</Text>
        </View>
        <View>
          <Text style={styles.text}>{discount}</Text>
        </View>
      </View>
      <View style={styles.innerWrapper}>
        <View>
          <Text style={styles.text}>Delivery Charges</Text>
        </View>
        <View>
          <Text style={styles.text}>{deliveryFee}</Text>
        </View>
      </View>
      <DashedLine dashLength={4} dashThickness={2} dashColor={"#DCDFE3"} />
      <View style={styles.topWrapper}>
        <View>
          <Text style={styles.text}>Total</Text>
        </View>
        <View>
          <Text style={styles.text}>{total}</Text>
        </View>
      </View>
    </View>
  );
};

export default CartCalculationDetails;
