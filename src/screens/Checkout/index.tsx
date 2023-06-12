import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Platform,
  TextInput,
} from "react-native";
import styles from "./checkout.style";
import {
  Progressbar,
  CustomButton,
  CheckoutDelivery,
  CheckoutPayment,
  CheckoutSummary,
  AddressSheet,
  SuccessModal,
} from "../../components";
import colors from "../../utils/colors";
import RBSheet from "react-native-raw-bottom-sheet";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import BackIcon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";
import { getStorageData } from "../../service/asyncStorage";
import { orderPayload } from "./constants";
import {
  useCreateOrderMutation,
  useLazyCheckPointsValidationQuery,
  useLazyGetPointsConversionQuery,
  useValidateDiscountMutation,
} from "./checkout.api";
import Toast from "react-native-toast-message";
import {
  resetCart,
  resetDiscount,
  setDiscount,
  setLoyaltyDiscount,
} from "../Cart/cart.slice";
import { discountOrderTypes } from "../../utils/constants";
import { ModifierI, ResultI } from "./type";
import { getOrderProducts, getProductModifiers } from "../../utils/helper";

const Checkout = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [userToken, setUserToken] = useState();
  const [discountValue, setDiscountValue] = React.useState<string | number>("");
  const [discountType, setDiscountType] = useState(
    discountOrderTypes.couponCode
  );
  const [coupon, setCoupon] = useState("");
  const [loyaltyPoints, setLoyaltyPoints] = useState<any>("");
  const refRBSheet: any = useRef();
  const [
    createOrder,
    { data: orderResponse, isLoading: isCreatingOrder, isSuccess, isError },
  ] = useCreateOrderMutation();
  const [
    validateDiscount,
    { isLoading: isVerifyingCoupon, isError: isCouponError },
  ] = useValidateDiscountMutation();
  const { currentAddress, outlets, latLong } = useAppSelector(
    (state) => state.outlets
  );
  const { user, userAddress, guestUser } = useAppSelector(
    (state) => state.login
  );
  const { store, orderType } = useAppSelector((state) => state.orderType);
  const {
    totalItems,
    totalAmount,
    mergedItems,
    cartItems,
    tax,
    discount,
    storeData,
    deliveryCharges,
  } = useAppSelector((state) => state.cart);
  const [getPointsConversion, { data: successData }] =
    useLazyGetPointsConversionQuery();
  const [checkPointsValidity, { isLoading: isValidatingLoyaltyPoints }] =
    useLazyCheckPointsValidationQuery();
  const { data = null } = orderResponse || {};
  const { data: pointsRate = [] } = successData || {};
  const { value: pointsValue = 0, point = 0 } = pointsRate[0] || {};

  const calculateTotal = () => {
    if (storeData.priceExclusiveTax) {
      return Math.max(totalAmount + tax + deliveryCharges - discount, 0);
    }
    return Math.max(totalAmount + deliveryCharges - discount, 0);
  };

  useEffect(() => {
    try {
      getStorageData("token").then((response: any) => {
        setUserToken(response);
      });
    } catch {}
  }, []);

  const isValidOrder = () => {
    if (!userToken) {
      navigation.replace(Routes.AuthTabs);
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setModalVisible(true);
      dispatch(resetCart());
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: "error",
        text1: "Unable to Place Your Order",
        text2: "",
      });
    }
  }, [isError]);

  useEffect(() => {
    if (user.Id && userToken) {
      getPointsConversion("");
    }
  }, [user, getPointsConversion, userToken]);

  const getDiscountData = () => {
    if (discount === 0 || discountValue === "" || discountValue === 0)
      return {};
    return {
      discountType: discountType,
      [isDiscountTypeCode() ? "discountCode" : "loyaltyPoints"]: discountValue,
    };
  };

  const isDiscountTypeCode = () =>
    discountType === discountOrderTypes.couponCode;

  const MergeItemsKeys = Object.keys(mergedItems);
  const placeOrder = () => {
    if (isValidOrder()) {
      let orderDetails = {};
      if (orderType === "delivery") {
        orderDetails = {
          ...userAddress,
          notes: instruction,
        };
      } else {
        orderDetails = {
          notes: instruction,
        };
      }

      const data = {
        ...orderPayload.order,
        ...getDiscountData(),
        priceExclusiveTax: storeData?.priceExclusiveTax,
        type: orderType === "delivery" ? 3 : 1,
        customerId: user.Id || guestUser.id,
        guestUserOrder: Boolean(guestUser.id),
        storeId: store.id,
        notes: instruction,
        orderProducts: getOrderProducts({ MergeItemsKeys, mergedItems }),
        [`order${orderType === "delivery" ? "Delivery" : "Pickup"}`]: {
          ...orderDetails,
        },
        orderPayments: [
          {
            ...orderPayload.orderPayments,
            totalAmount: calculateTotal(),
            subTotal: totalAmount,
            deliveryCharges: deliveryCharges,
            tax: tax,
            customerId: user.Id || guestUser.id,
          },
        ],
      };
      createOrder(data);
    }
  };

  const handleDiscount = () => {
    if (user?.Id) {
      if (coupon.length && cartItems.length && user?.Id && store?.id) {
        const body = {
          code: coupon,
          customerId: user.Id,
          discountProductId: cartItems.map((item: { id: number }) => item.id),
          discountStoreId: store.id,
        };
        validateDiscount(body)
          .unwrap()
          .then((result) => {
            if (result.status === "SUCCESS") {
              setLoyaltyPoints(0);
              const { discount, products } = result.data;
              const { type, amount, maximumAmount } = discount || {};
              dispatch(
                setDiscount({
                  type: type,
                  validProductArray: products,
                  amount: parseInt(amount),
                  maximumAmount,
                })
              );
            } else {
              Toast.show({
                type: "error",
                text1: result?.message,
                text2: "",
              });
              dispatch(resetDiscount());
            }
          })
          .catch(() => {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "",
            });
            dispatch(resetDiscount());
          });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Please Login to avail Discounts",
        text2: "",
      });
    }
  };

  const handleLoyaltyPoints = () => {
    if (user?.Id) {
      if (Number(loyaltyPoints) > 0 && cartItems.length) {
        checkPointsValidity({
          id: user.PhoneNumber,
          points: Number(loyaltyPoints),
        })
          .unwrap()
          .then((result) => {
            if (result.status === "SUCCESS") {
              setCoupon("");
              const { priceOnRedemptionPoints = 0 } = result.data || {};
              dispatch(setLoyaltyDiscount(priceOnRedemptionPoints));
            } else {
              Toast.show({
                type: "error",
                text1: result?.message,
                text2: "",
              });
              dispatch(resetDiscount());
            }
          })
          .catch((error) => console.log(error, "error+"));
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Please Login to avail Loyalty Rewards",
        text2: "",
      });
    }
  };

  useEffect(() => {
    setCoupon("");
    setLoyaltyPoints(0);
  }, [cartItems]);

  return (
    <>
      <SafeAreaView
        style={modalVisible ? styles.safeAreaOpacity : styles.safeAreaView}
      >
        <View style={styles.topWrapper}>
          <View style={styles.backContainer}>
            <BackIcon
              name="chevron-back-outline"
              color={colors.primaryColor}
              size={25}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.titleBarContainer}>
            <Text style={styles.title}>Checkout</Text>
            {orderType === "delivery" ? (
              <Text style={styles.subTitle} numberOfLines={2}>
                {userAddress?.address ? userAddress.address : ""}
              </Text>
            ) : (
              <Text style={styles.subTitle}>{store?.name}</Text>
            )}
          </View>
        </View>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Progressbar
            value={1}
            style={{
              backgroundColor: colors.primaryColor,
              color: colors.white,
            }}
          />

          <View style={styles.deliveryWrapper}>
            <CheckoutDelivery
              address={
                orderType === "delivery"
                  ? currentAddress
                    ? currentAddress?.description
                    : ""
                  : store?.name
              }
              addresstitle={
                orderType === "delivery" ? "Delivery Address" : "Pickup Address"
              }
              onPress={() =>
                orderType === "delivery" ? refRBSheet.current.open() : null
              }
            />
          </View>

          <View style={styles.specialInstructionContainer}>
            <Text style={styles.specialText}>Special Instructions</Text>
            <TextInput
              value={instruction}
              onChangeText={(text) => {
                setInstruction(text);
              }}
              multiline={true}
              placeholder={"Type here..."}
              placeholderTextColor={colors.textColor}
              style={styles.specialInputField}
            />
          </View>

          <CheckoutPayment
            onPress={() => navigation.navigate(Routes.PaymentMethod)}
          />
          {totalItems > 0 && (
            <CheckoutSummary
              list={mergedItems}
              subTotal={totalAmount.toFixed(2)}
              tax={tax}
              discount={discount}
              deliveryFee={deliveryCharges}
              total={calculateTotal()}
            />
          )}
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            customStyles={{
              wrapper: {},
              container:
                Platform.OS === "android"
                  ? styles.rbSheetAndroid
                  : styles.rbSheet,
              draggableIcon: {
                backgroundColor: "#000",
              },
            }}
          >
            <AddressSheet
              onAddNew={() => {
                refRBSheet.current.close();
                navigation.navigate(Routes.NewAddress);
              }}
            />
          </RBSheet>

          <View style={styles.discountContainer}>
            <CustomButton
              label="Coupon"
              styles={
                discountType === discountOrderTypes.couponCode
                  ? styles.discountColouredButton
                  : styles.discountButton
              }
              textStyles={{
                color:
                  discountType === discountOrderTypes.couponCode
                    ? colors.white
                    : colors.textColor,
              }}
              onClick={() => {
                setDiscountType(discountOrderTypes.couponCode);
              }}
            />
            <CustomButton
              label="Points"
              styles={
                discountType === discountOrderTypes.points
                  ? styles.discountColouredButton
                  : styles.discountButton
              }
              onClick={() => {
                setDiscountType(discountOrderTypes.points);
              }}
              textStyles={{
                color:
                  discountType === discountOrderTypes.points
                    ? colors.white
                    : colors.textColor,
              }}
            />
          </View>

          {/* Code for discount coupon */}
          {discountType === discountOrderTypes.couponCode && (
            <View style={styles.specialInstructionContainer}>
              <Text style={styles.specialText}>Discount Code</Text>
              <TextInput
                value={coupon}
                onChangeText={(text) => {
                  setCoupon(text);
                }}
                placeholder={"Enter Coupan Code"}
                style={styles.discountField}
                placeholderTextColor="#B6B7B7"
              />
              <CustomButton
                label="Apply"
                styles={styles.applyButton}
                textStyles={{ color: colors.textColor }}
                onClick={handleDiscount}
              />
            </View>
          )}

          {/* Code for redeem points */}
          {discountType === discountOrderTypes.points && (
            <View style={styles.specialInstructionContainer}>
              <Text style={styles.redeemText}>Redeem Points</Text>
              <View style={styles.redeemContainer}>
                <Text style={styles.redeemText}>Available Points: </Text>
                <Text style={styles.pointsText}>
                  {parseFloat(user?.Points) || 0}
                </Text>
              </View>
              <Text style={styles.availablePoints}>
                {point} Points = {pointsValue} Pkr
              </Text>
              <TextInput
                value={loyaltyPoints}
                onChangeText={(text) => {
                  setLoyaltyPoints(text);
                }}
                placeholder={"Redeem Point"}
                style={styles.discountField}
                placeholderTextColor="#B6B7B7"
              />

              <CustomButton
                label="Apply"
                styles={styles.applyButton}
                textStyles={{ color: colors.textColor }}
                onClick={handleLoyaltyPoints}
                isDisabled={parseFloat(user?.Points) > 0 ? false : true}
              />
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <CustomButton
            label="Place Order"
            styles={styles.button}
            onClick={() => placeOrder()}
            isLoading={isCreatingOrder}
          />
        </View>

        <SuccessModal
          setShowModal={setModalVisible}
          showModal={modalVisible}
          orderNumber={orderResponse?.data}
          storeName={store?.name}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate(Routes.OrderType);
          }}
          onTrack={() => {
            setModalVisible(false);
            navigation.navigate(Routes.OrderHistory);
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default Checkout;
