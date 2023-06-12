import React from "react";
import { View, Image } from "react-native";
import styles from "./authTabs.style";
import colors from "../../utils/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Login from "../Login";
import Signup from "../Signup";

const AuthTabs = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={styles.SafeAreaView}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/Banner.png")}
          style={styles.bannerImageContainer}
        />
        <View style={styles.outerWrapper}>
          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: styles.tabbarLabel,
              tabBarItemStyle: {},
              tabBarActiveTintColor: colors.primaryColor,
              tabBarPressOpacity: 0,
              tabBarInactiveTintColor: colors.textColor,
              tabBarIndicatorStyle: styles.tabBarIndicator,
              tabBarIndicatorContainerStyle: {},
              tabBarStyle: styles.tabBar,
            }}
          >
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen name="Sign up" component={Signup} />
          </Tab.Navigator>
        </View>
      </View>
    </View>
  );
};

export default AuthTabs;
