import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./checkoutPayment.style";
import Icon from "react-native-vector-icons/Entypo";
import colors from "../../utils/colors";

type CheckoutPaymentType = {
  onPress?: any;
};

const CheckoutPayment = ({ onPress }: CheckoutPaymentType) => {
  const [payment, setPayment] = useState("cod");

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View>
          <Text style={styles.title}>Payment Method</Text>
        </View>
        <View>
          {/* <Icon
            name="edit"
            color={colors.primaryColor}
            size={20}
            onPress={onPress}
          /> */}
        </View>
      </View>
      {/* <TouchableOpacity
        style={
          payment === "credit"
            ? styles.selectContainer
            : styles.unSelectContainer
        }
        // onPress={() => setPayment("credit")}
        activeOpacity={0.3}
      >
        <View>
          <Text
            style={
              payment === "credit" ? styles.selectText : styles.unSelectText
            }
          >
            Credit / Debit Card
          </Text>
        </View>
        <View>
          <View
            style={
              payment === "credit" ? styles.selectRadio : styles.unSelectRadio
            }
          />
        </View>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={
          payment === "cod" ? styles.selectContainer : styles.unSelectContainer
        }
        // onPress={() => setPayment("cod")}
        activeOpacity={0.3}
      >
        <View>
          <Text
            style={payment === "cod" ? styles.selectText : styles.unSelectText}
          >
            Cash on Delivery
          </Text>
        </View>
        <View>
          <View
            style={
              payment === "cod" ? styles.selectRadio : styles.unSelectRadio
            }
          >
            <View style={styles.coloredCircle} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutPayment;
