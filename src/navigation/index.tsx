import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, View } from "react-native";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import SignIn from "../screens/Auth/SignIn";
import Cart from "../screens/Cart";
import Favourites from "../screens/Favourites";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../utils/colors";
import Splash from "../screens/Splash";
import SubCategory from "../screens/SubCategory";
import Map from "../screens/Map";
import Outlets from "../screens/Outlets";
import NewAddress from "../screens/NewAddress";
import SubCategoryDetails from "../screens/SubCategoryDetails";
import Checkout from "../screens/Checkout";
import GuestCheckout from "../screens/GuestCheckout";
import OrderType from "../screens/OrderType";
import Login from "../screens/Login";
import AuthTabs from "../screens/AuthTabs";
import Info from "../screens/Info";
import PaymentMethod from "../screens/PaymentMethod";
import { useAppSelector } from "../hooks/redux";
import { Routes } from "./Routes";
import Otp from "../screens/Otp";
import Pickup from "../screens/Pickup";
import { Badge } from "react-native-paper";
import LoyaltyHistory from "../screens/LoyaltyHistory";
import OrderHistory from "../screens/OrderHistory";
import SignupOtp from "../screens/SignupOtp";
import Deals from "../screens/Deals";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  const { totalItems } = useAppSelector((state) => state.cart);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={Routes.Home}
        component={Home}
        options={{
          title: "",
          headerTransparent: true,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: colors.primaryColor,
          tabBarStyle: {
            height: Platform.OS === "android" ? 80 : 100,
          },
          tabBarIcon: ({ color }: any) => {
            return (
              <Icon
                name={color === "black" ? "home" : "home-outline"}
                size={25}
                color={color === "black" ? colors.primaryColor : color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={Routes.Favourites}
        component={Favourites}
        options={{
          title: "",
          headerTransparent: true,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: colors.primaryColor,
          tabBarStyle: {
            height: Platform.OS === "android" ? 80 : 100,
          },
          tabBarIcon: ({ color }: any) => {
            return (
              <Icon
                name={color === "black" ? "heart" : "heart-outline"}
                size={25}
                color={color === "black" ? colors.primaryColor : color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={Routes.Cart}
        component={Cart}
        options={{
          title: "",
          headerTransparent: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: colors.primaryColor,
          tabBarStyle: {
            height: Platform.OS === "android" ? 80 : 100,
          },
          tabBarIcon: ({ color }: any) => {
            return (
              <View>
                {totalItems > 0 && (
                  <Badge
                    style={{
                      color: colors.white,
                      backgroundColor: "black",
                      left: 10,
                      top: 2,
                    }}
                  >
                    {totalItems}
                  </Badge>
                )}
                <Icon
                  name={color === "black" ? "cart" : "cart-outline"}
                  size={25}
                  color={color === "black" ? colors.primaryColor : color}
                  style={{ bottom: totalItems === 0 ? 0 : 10 }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name={Routes.Profile}
        component={Profile}
        options={{
          title: "",
          headerTransparent: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: colors.primaryColor,
          tabBarStyle: {
            height: Platform.OS === "android" ? 80 : 100,
          },
          tabBarIcon: ({ color }: any) => {
            return (
              <Icon
                name={color === "black" ? "person" : "person-outline"}
                size={25}
                color={color === "black" ? colors.primaryColor : color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        options={{ headerShown: false }}
        component={SignIn}
      />
      <Stack.Screen
        name={Routes.AuthTabs}
        options={{ headerShown: false }}
        component={AuthTabs}
      />
      {/* add your another screen here using -> Stack.Screen */}
    </Stack.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Routes.Splash}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name={Routes.Splash}
          options={{ headerShown: false }}
          component={Splash}
        />
        <Stack.Screen
          name={Routes.OrderHistory}
          options={{ headerShown: false }}
          component={OrderHistory}
        />
        <Stack.Screen
          name={Routes.Pickup}
          options={{ headerShown: false }}
          component={Pickup}
        />
        <Stack.Screen
          name={Routes.LoyaltyHistory}
          options={{ headerShown: false }}
          component={LoyaltyHistory}
        />
        <Stack.Screen
          name={Routes.OrderType}
          options={{ headerShown: false }}
          component={OrderType}
        />
        <Stack.Screen
          name={Routes.AuthTabs}
          options={{ headerShown: false }}
          component={AuthTabs}
        />
        <Stack.Screen
          name={Routes.GuestCheckout}
          options={{ headerShown: false }}
          component={GuestCheckout}
        />
        <Stack.Screen
          name={Routes.Otp}
          options={{ headerShown: false }}
          component={Otp}
        />
        <Stack.Screen
          name={Routes.Map}
          options={{ headerShown: false }}
          component={Map}
        />
        <Stack.Screen
          name={Routes.PaymentMethod}
          options={{ headerShown: false }}
          component={PaymentMethod}
        />

        <Stack.Screen
          name={Routes.Login}
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name={Routes.SignupOtp}
          options={{ headerShown: false }}
          component={SignupOtp}
        />
        <Stack.Screen
          name={Routes.SubCategoryDetails}
          options={{ headerShown: false }}
          component={SubCategoryDetails}
        />
        <Stack.Screen
          name={Routes.NewAddress}
          options={{ headerShown: false }}
          component={NewAddress}
        />
        <Stack.Screen
          name={Routes.Checkout}
          options={{ headerShown: false }}
          component={Checkout}
        />
        <Stack.Screen
          name={Routes.Outlets}
          options={{ headerShown: false }}
          component={Outlets}
        />
        <Stack.Screen
          name={Routes.HomeBase}
          options={{ headerShown: false }}
          component={MyTabs}
        />
        <Stack.Screen
          name={Routes.Profile}
          options={{ headerShown: false }}
          component={Profile}
        />
        <Stack.Screen
          name={Routes.SubCategory}
          options={{ headerShown: false }}
          component={SubCategory}
        />
        <Stack.Screen
          name={Routes.Deals}
          options={{ headerShown: false }}
          component={Deals}
        />
        <Stack.Screen
          name={Routes.AuthBase}
          options={{ headerShown: false }}
          component={Auth}
        />
        {/* add your another screen here using -> Stack.Screen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
