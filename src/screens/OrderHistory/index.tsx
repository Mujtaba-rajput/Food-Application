import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, FlatList } from "react-native";
import styles from "./orderHistory.style";
import colors from "../../utils/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { OrderHistoryCard, Loader } from "../../components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Divider } from "react-native-paper";
import { useLazyGetOrderHistoryQuery } from "../Home/home.api";
import { useAppSelector } from "../../hooks/redux";
import { OrderState } from "../../utils/constants";
import moment from "moment";
import { Routes } from "../../navigation/Routes";

interface OrderHistoryProducts {
  dealId: string;
  internalId?: string;
  id: string;
  price: string;
  quantity: number;
  orderProductModifiers: Array<{
    orderProductModifiersValue: Array<{
      price: string;
    }>;
  }>;
  product: {
    name: string;
    inStorePrice: string;
    id: number;
  };
  products: Array<{ name: string; id: number }>;
  isDeal?: boolean;
  name: string;
  deal: {
    name: string;
  };
}

interface OrderProductsHistory {
  [key: string]: OrderHistoryProducts;
}

const OrderHistory = () => {
  const navigation: any = useNavigation();
  const Tab = createMaterialTopTabNavigator();

  const Pending = () => {
    const [orderState, setOrderState] = useState(OrderState.PENDING);
    const { user } = useAppSelector((state) => state.login);
    const [allOrders, setAllOrders] = useState<any>([]);

    const [
      getOrderHistory,
      { data: { pagination } = { pagination: {} }, isLoading, isFetching },
    ] = useLazyGetOrderHistoryQuery();
    const {
      data: orderHistory = [],
      currentPage = 1,
      lastPage,
    } = pagination || {};

    useEffect(() => {
      if (user.Id) {
        getOrderHistory({
          id: user.PhoneNumber,
          orderState: orderState,
          page: 1,
        });
      }
    }, [orderState, user, getOrderHistory]);

    useEffect(() => {
      if (!isLoading && orderHistory.length > 0 && currentPage > 1) {
        setAllOrders((v: any) => [...v, ...orderHistory]);
      }
      if (!isLoading && orderHistory.length > 0 && currentPage === 1) {
        setAllOrders(orderHistory);
      }
    }, [orderHistory, isLoading, currentPage]);
    const fetchOrders = () => {
      getOrderHistory({
        id: user.PhoneNumber,
        orderState: orderState,
        page: currentPage + 1,
      });
    };
    const de = allOrders.map((item: any) => {
      return item?.orderProducts;
    });

    return (
      <View style={styles.background}>
        {isLoading && <Loader isLoading={isLoading} />}
        <FlatList
          data={allOrders}
          style={styles.scroll}
          renderItem={({ item, index }) => (
            <OrderHistoryCard
              index={index}
              key={index}
              title={item?.store?.name}
              description={item?.orderProducts[0]?.product?.name}
              price={`Rs ${parseFloat(item?.orderPayments[0]?.totalAmount)}`}
              time={moment(item?.creationTime).utc().format("DD MMMM, H:MM a")}
              orderId={item?.code}
              orderType={item?.orderTypeValue}
              storeName={item?.store?.name}
              deliveryAddress={item?.orderDelivery?.address}
              creationTime={moment(item?.creationTime)
                .utc()
                .format("DD MMMM, H:MM a")}
              list={item?.orderProducts}
              subTotal={Number(item?.orderPayments[0]?.subTotal)}
              tax={Number(item?.orderPayments[0]?.tax)}
              discount={Number(item?.orderPayments[0]?.discount)}
              deliveryFee={Number(item?.orderPayments[0]?.deliveryCharges)}
              total={Number(item?.orderPayments[0]?.totalAmount)}
            />
          )}
          onEndReachedThreshold={1}
          onEndReached={fetchOrders}
          keyExtractor={(item: any) => item.id}
        />
      </View>
    );
  };
  const Completed = () => {
    const [orderState, setOrderState] = useState(OrderState.COMPLETED);
    const { user } = useAppSelector((state) => state.login);
    const [allOrders, setAllOrders] = useState<any>([]);

    const [
      getOrderHistory,
      { data: { pagination } = { pagination: {} }, isLoading, isFetching },
    ] = useLazyGetOrderHistoryQuery();
    const {
      data: orderHistory = [],
      currentPage = 1,
      lastPage,
    } = pagination || {};

    useEffect(() => {
      if (user.Id) {
        getOrderHistory({
          id: user.PhoneNumber,
          orderState: orderState,
          page: 1,
        });
      }
    }, [orderState, user, getOrderHistory]);

    useEffect(() => {
      if (!isLoading && orderHistory.length > 0 && currentPage > 1) {
        setAllOrders((v: any) => [...v, ...orderHistory]);
      }
      if (!isLoading && orderHistory.length > 0 && currentPage === 1) {
        setAllOrders(orderHistory);
      }
    }, [orderHistory, isLoading, currentPage]);
    const fetchOrders = () => {
      getOrderHistory({
        id: user.PhoneNumber,
        orderState: orderState,
        page: currentPage + 1,
      });
    };
    return (
      <View style={styles.background}>
        {isLoading && <Loader isLoading={isLoading} />}
        <FlatList
          data={allOrders}
          style={styles.scroll}
          renderItem={({ item, index }) => (
            <OrderHistoryCard
              index={index}
              title={item?.store?.name}
              description={
                item?.orderProducts[0]?.deal?.name
                  ? item?.orderProducts[0].deal.name
                  : item?.orderProducts[0]?.product?.name
              }
              price={`Rs ${parseFloat(item?.orderPayments[0]?.totalAmount)}`}
              time={moment(item?.creationTime).utc().format("DD MMMM, H:MM a")}
              orderId={item?.code}
              orderType={item?.orderTypeValue}
              storeName={item?.store?.name}
              deliveryAddress={item?.orderDelivery?.address}
              creationTime={moment(item?.creationTime)
                .utc()
                .format("DD MMMM, H:MM a")}
              list={item?.orderProducts}
              subTotal={Number(item?.orderPayments[0]?.subTotal)}
              tax={Number(item?.orderPayments[0]?.tax)}
              discount={Number(item?.orderPayments[0]?.discount)}
              deliveryFee={Number(item?.orderPayments[0]?.deliveryCharges)}
              total={Number(item?.orderPayments[0]?.totalAmount)}
            />
          )}
          keyExtractor={(item: any) => item.id}
          onEndReached={fetchOrders}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.container}>
          <View style={styles.headerWrapper}>
            <Icon
              name="close-outline"
              color={colors.primaryColor}
              size={25}
              style={styles.icon}
              onPress={() => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: Routes.HomeBase }],
                  })
                );
              }}
            />
            <Text style={styles.title}>Order History</Text>
          </View>
        </View>
        <Divider style={styles.divide} />

        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: styles.tabbarLabel,
            tabBarItemStyle: {},
            tabBarActiveTintColor: colors.white,
            tabBarPressOpacity: 0,
            tabBarInactiveTintColor: colors.textColor,
            tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
            tabBarIndicatorContainerStyle: {},
            tabBarStyle: styles.tabBar,
          }}
        >
          <Tab.Screen name="Pending" component={Pending} />
          <Tab.Screen name="Completed" component={Completed} />
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
};

export default OrderHistory;
