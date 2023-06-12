import React from "react";
import { Text, View } from "react-native";
import styles from "./OrderHistoryDetails.style";
import { OrderSummary } from "..";

type OrderHistoryDetailsType = {
  orderId?: string;
  orderType?: string;
  storeName?: string;
  creationTime?: string;
  deliveryAddress?: string;
  subTotal?: number;
  tax?: number;
  discount?: number;
  deliveryFee?: number;
  total?: number;
  list?: any;
};

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

const OrderHistoryDetails = ({
  orderId = "#e0sl-76",
  orderType = "Delivery",
  storeName = "Pizza Shop - Model Town",
  creationTime = "22 Mar, 9:25 AM",
  deliveryAddress = "Pizza Shop - Model Town",
  subTotal = 100,
  tax = 10,
  discount = 0,
  deliveryFee = 60,
  total = 170,
  list = data,
}: OrderHistoryDetailsType) => {
  return (
    <View>
      <View style={styles.orderIdWrapper}>
        <View style={styles.row}>
          <Text style={styles.title}>Order ID:</Text>
          <Text style={styles.idText}>{orderId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Order Type:</Text>
          <Text style={styles.typeText}>{orderType}</Text>
        </View>
      </View>
      <View style={styles.detailsWrapper}>
        <View style={styles.row}>
          <View style={styles.transparentRadio} />
          <View style={styles.subDetailsWrapper}>
            <Text style={styles.detailsTitle}>{storeName}</Text>
            <Text style={styles.detailsTime}>{creationTime}</Text>
          </View>
        </View>
        <View style={styles.strainghtLine} />
        <View style={styles.row}>
          <View style={styles.filledRadio} />
          <View style={styles.subDetailsWrapper}>
            <Text style={styles.detailsTitle}>{deliveryAddress}</Text>
            <Text style={styles.detailsTime}>{creationTime}</Text>
          </View>
        </View>
      </View>
      <View>
        <OrderSummary
          deliveryFee={deliveryFee}
          discount={discount}
          subTotal={subTotal}
          list={list}
          tax={tax}
          total={total}
        />
      </View>
    </View>
  );
};

export default OrderHistoryDetails;
