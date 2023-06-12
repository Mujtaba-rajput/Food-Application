import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./OrderHistory.style";
import colors from "../../utils/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { CustomButton, OrderHistoryDetails } from "..";

type OrderHistoryType = {
  title?: string;
  time?: string;
  description?: string;
  price?: string;
  showButton?: boolean;
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
  index?: number;
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

const OrderHistoryCard = ({
  title = "Pizza Shop - Model Town",
  time = "22 Mar, 9:25 AM",
  description = "Crazy Deal 2",
  price = "Rs. 1099",
  showButton = false,
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
  index,
}: OrderHistoryType) => {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={require("../../assets/images/pizza.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textWrapper}>
          <Text numberOfLines={3} style={styles.title}>
            {title}
          </Text>
          <Text style={styles.time}>{time}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.priceWrapper}>
          <Text style={styles.price}>{price}</Text>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => setOpen(!open)}
          >
            <Icon
              name={open ? "chevron-down-outline" : "chevron-up-outline"}
              color={colors.primaryColor}
              size={19}
            />
          </TouchableOpacity>
        </View>
      </View>

      {open && (
        <OrderHistoryDetails
          orderId={orderId}
          orderType={orderType}
          storeName={storeName}
          creationTime={creationTime}
          deliveryAddress={deliveryAddress}
          deliveryFee={deliveryFee}
          discount={discount}
          subTotal={subTotal}
          list={list}
          tax={tax}
          total={total}
        />
      )}
      {showButton && (
        <View style={styles.footer}>
          <CustomButton label="Reorder" />
        </View>
      )}
    </View>
  );
};

export default OrderHistoryCard;
