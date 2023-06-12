import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import styles from "./cart.style";
import {
  CartItemCard,
  Progressbar,
  CustomButton,
  CartCalculationDetails,
} from "../../components";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";
import { useAppSelector } from "../../hooks/redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Cart = () => {
  const navigation: any = useNavigation();
  const { currentAddress } = useAppSelector((state) => state.outlets);
  const { store, orderType } = useAppSelector((state) => state.orderType);
  const {
    totalItems,
    totalAmount,
    mergedItems,
    discount,
    tax,
    deliveryCharges,
    storeData,
  } = useAppSelector((state) => state.cart);

  const { userAddress } = useAppSelector((state) => state.login);

  const calculateTotal = () => {
    if (storeData.priceExclusiveTax) {
      return Math.max(totalAmount + tax + deliveryCharges - discount, 0);
    }
    return Math.max(totalAmount + deliveryCharges - discount, 0);
  };

  const moveToCheckout = () => {
    if (totalItems > 0) {
      navigation.navigate(Routes.Checkout);
    } else {
      Toast.show({
        type: "error",
        text1: "Empty Cart",
        text2: "Can not proceed to Checkout",
      });
    }
  };

  return (
    <>
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.titleBarContainer}>
          <Text style={styles.title}>Cart</Text>
          <Text style={styles.subTitle}>
            {orderType === "delivery" ? userAddress?.address : store?.name}
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Progressbar />
          <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.navigate(Routes.Home)}
          >
            <Text style={styles.headerText}>Add more items</Text>
          </TouchableOpacity>

          {Object.keys(mergedItems)?.map((objKey: string, index) => (
            <CartItemCard product={mergedItems[`${objKey}`]} key={index} />
          ))}
          {totalItems > 0 ? (
            <CartCalculationDetails
              subTotal={`Rs ${totalAmount.toFixed(2)}`}
              tax={`Rs ${tax.toFixed(2)}`}
              discount={`Rs ${discount.toFixed(2)}`}
              deliveryFee={`Rs ${deliveryCharges.toFixed(2)}`}
              total={`Rs ${calculateTotal().toFixed(2)}`}
            />
          ) : null}
        </ScrollView>
        {totalItems > 0 && (
          <View style={styles.footer}>
            <CustomButton
              label="Review Payment & Address"
              styles={styles.footerButton}
              onClick={moveToCheckout}
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default Cart;
