import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import styles from "./orderType.style";
import { Heading, OnboardingCard } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";
import { setOrderType } from "./orderType.slice";
import { useAppDispatch } from "../../hooks/redux";

type OrderTypeCard = {
  onPress: any;
  title: string;
  image: ImageSourcePropType;
};

const OrderTypeCard = ({ title, onPress, image }: OrderTypeCard) => {
  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity style={styles.innerContainer} onPress={onPress}>
        <Image
          source={image}
          style={styles.deliveryIcon}
          resizeMode="contain"
        />
        <Heading title={title} style={styles.orderText} />
      </TouchableOpacity>
    </View>
  );
};

type QuickMenuType = {
  title: string;
  image: ImageSourcePropType;
};

const quickMenu = [
  {
    title: "Menu",
    image: require("../../assets/images/dish.png"),
  },
  {
    title: "Deal & Offers",
    image: require("../../assets/images/discount-2.png"),
  },
  {
    title: "Loyalty Points",
    image: require("../../assets/images/gift-exchange.png"),
  },
];

const OrderType = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const navigateToDelivery = () => {
    dispatch(setOrderType("delivery"));
    navigation.navigate(Routes.Outlets);
  };

  const navigateToPickup = () => {
    dispatch(setOrderType("pickup"));
    navigation.navigate(Routes.Pickup);
  };

  return (
    <View style={styles.areaView}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/Banner.png")}
          style={styles.bannerImageContainer}
        />
        <View style={styles.outerWrapper}>
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.outerStyle}>
              <Image source={require("../../assets/images/Shop.png")} />
            </View>
            <View style={styles.outer}>
              <OrderTypeCard
                title="Delivery"
                onPress={navigateToDelivery}
                image={require("../../assets/images/Deliveries.png")}
              />
              <OrderTypeCard
                title="Pickup"
                onPress={navigateToPickup}
                image={require("../../assets/images/store.png")}
              />
            </View>
            {quickMenu.map((item: QuickMenuType) => {
              return <OnboardingCard title={item.title} image={item.image} />;
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default OrderType;
