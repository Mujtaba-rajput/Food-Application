import React from "react";
import { Text, View } from "react-native";
import styles from "./checkoutSummary.style";
import { Divider } from "react-native-paper";
import DashedLine from "react-native-dashed-line";
import { DecoratedPrice, calculateModifierPrice } from "../../utils/helper";

type CartItemCardType = {
  product: {
    id: string;
    name: string;
    code: string;
    inStorePrice: string;
    description: string;
    totalCount: number;
    internalId: string;
    productModifier: Array<{ id: number }>;
    modifire?: {
      Cheese: Array<{ id: number }>;
    };
  };
};

type CheckoutSummaryType = {
  subTotal?: number;
  tax?: Number;
  discount?: number;
  deliveryFee?: number;
  total?: number;
  list?: any;
};

const CheckoutSummary = ({
  subTotal,
  tax,
  discount,
  deliveryFee,
  total,
  list,
}: CheckoutSummaryType) => {
  const CheckoutItems = ({ product }: CartItemCardType) => {
    const calculatePrice = () => {
      return DecoratedPrice(
        calculateModifierPrice(product.modifire) +
          parseFloat(product.inStorePrice)
      );
    };
    return (
      <View style={styles.listWrapper}>
        <View>
          <Text
            style={styles.item}
          >{`${product.totalCount} x ${product.name}`}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
        <View>
          <Text style={styles.item}>{calculatePrice()}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>Order Summary</Text>
        </View>
      </View>
      <View>
        {Object.keys(list).map((objKey: string, index) => {
          return <CheckoutItems product={list[`${objKey}`]} key={index} />;
        })}

        <Divider style={styles.divide} />
        <View style={styles.footerContainer}>
          <View>
            <Text style={styles.text}>SubTotal</Text>
          </View>
          <View>
            <Text style={styles.text}>{`Rs. ${subTotal}`}</Text>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <View>
            <Text style={styles.text}>Tax</Text>
          </View>
          <View>
            <Text style={styles.text}>{`Rs. ${tax?.toFixed(2)}`}</Text>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <View>
            <Text style={styles.text}>Discount</Text>
          </View>
          <View>
            <Text style={styles.text}>{`Rs. ${discount?.toFixed(2)}`}</Text>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <View>
            <Text style={styles.text}>Delivery Charges</Text>
          </View>
          <View>
            <Text style={styles.text}>{`Rs. ${deliveryFee?.toFixed(2)}`}</Text>
          </View>
        </View>
        <View style={styles.dashContainer}>
          <DashedLine dashLength={4} dashThickness={2} dashColor={"#DCDFE3"} />
        </View>
        <View style={styles.footerContainer}>
          <View>
            <Text style={styles.total}>Total</Text>
          </View>
          <View>
            <Text style={styles.totalText}>{`Rs. ${total?.toFixed(2)}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CheckoutSummary;
