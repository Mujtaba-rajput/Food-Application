import React from "react";
import { Text, View } from "react-native";
import styles from "./orderSummary.style";
import { Divider } from "react-native-paper";
import DashedLine from "react-native-dashed-line";
import { DecoratedPrice } from "../../utils/helper";

const data = [
  {
    totalCount: 1,
    product: { name: "Pizza" },
    description: "Cheesy Pizza",
    price: "2000",
    quantity: 1,
    id: 0,
  },
  {
    totalCount: 1,
    product: { name: "Pizza" },
    description: "Cheesy Pizza",
    price: "2000",
    quantity: 1,
    id: 1,
  },
  {
    totalCount: 1,
    product: { name: "Pizza" },
    description: "Cheesy Pizza",
    price: "2000",
    quantity: 1,
    id: 2,
  },
  {
    totalCount: 3,
    product: { name: "Pizza" },
    description: "Cheesy Pizza",
    price: "2000",
    quantity: 1,
    id: 3,
  },
];

type OrderSummaryType = {
  subTotal?: number;
  tax?: number;
  discount?: number;
  deliveryFee?: number;
  total?: number;
  list?: any;
};

const OrderSummary = ({
  subTotal = 100,
  tax = 10,
  discount = 0,
  deliveryFee = 60,
  total = 170,
  list = data,
}: OrderSummaryType) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>Item Details</Text>
        </View>
      </View>
      <View>
        {list?.map((item: any, index: number) => {
          return (
            <View style={styles.listWrapper} key={item.id}>
              <View>
                <Text
                  style={styles.item}
                >{`${item.quantity} x ${item.product.name}`}</Text>
                {/* <Text style={styles.description}>{item.description}</Text> */}
              </View>
              <View>
                <Text style={styles.item}>{`${DecoratedPrice(
                  item.price
                )}`}</Text>
              </View>
            </View>
          );
        })}

        <Divider style={styles.divide} />
        <View style={styles.footerContainer}>
          <View>
            <Text style={styles.text}>SubTotal</Text>
          </View>
          <View>
            <Text style={styles.text}>{`Rs. ${subTotal.toFixed(2)}`}</Text>
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

export default OrderSummary;
