import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "./profile.style";
import colors from "../../utils/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { Divider } from "react-native-paper";
import { EditProfileInfo, EditProfileAddress } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";
import { getStorageData } from "../../service/asyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { resetCart } from "../Cart/cart.slice";

const Profile = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const [userToken, setUserToken] = useState("");
  const { currentAddress } = useAppSelector((state) => state.outlets);
  const { orderType } = useAppSelector((state) => state.orderType);
  const { user } = useAppSelector((state) => state.login);

  const EditCard = ({ label, onPress }: any) => {
    return (
      <View style={styles.outerWrapper}>
        <TouchableOpacity
          style={styles.headerWrapper}
          activeOpacity={0.5}
          onPress={onPress}
        >
          <View>
            <Text style={styles.text}>{label}</Text>
          </View>
          <View>
            {/* <Icon
              name={"chevron-forward-outline"}
              size={20}
              color={colors.primaryColor}
            /> */}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const EditPaymentMethod = () => {
    return (
      <View style={styles.outerWrapper}>
        <TouchableOpacity
          style={styles.headerWrapper}
          activeOpacity={0.5}
          onPress={() => navigation.navigate(Routes.PaymentMethod)}
        >
          <View>
            <Text style={styles.text}>Payment Method</Text>
          </View>
          <View>
            <Icon
              name={"chevron-forward-outline"}
              size={20}
              color={colors.primaryColor}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    try {
      getStorageData("token").then((response: any) => {
        setUserToken(response);
      });
    } catch (e) {}
  }, []);

  const signOutCurrentUser = () => {
    AsyncStorage.clear();
    dispatch(resetCart());
    navigation.replace(Routes.AuthTabs);
  };

  const getLoggedIn = () => {
    navigation.replace(Routes.AuthTabs);
  };

  const handleAuthConfiguration = () => {
    if (userToken) {
      signOutCurrentUser();
    } else {
      getLoggedIn();
    }
  };

  return (
    <>
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.container}>
          <View style={styles.headerWrapper}>
            {/* <Icon
              name="close-outline"
              color={colors.primaryColor}
              size={25}
              style={styles.icon}
            /> */}
            <Text style={styles.title}>Profile</Text>
          </View>
          <TouchableOpacity
            style={styles.rightButtonContainer}
            onPress={handleAuthConfiguration}
          >
            <Text style={styles.signout}>
              {userToken ? "Sign Out" : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
        <Divider style={styles.divide} />
        <ScrollView>
          <EditProfileInfo
            name={user?.FirstName}
            email={user?.Email}
            phoneNumber={user?.PhoneNumber}
          />
          <EditCard
            label={"Order History"}
            onPress={() => navigation.navigate(Routes.OrderHistory)}
          />
          <EditCard
            label={"Loyalty History"}
            onPress={() => navigation.navigate(Routes.LoyaltyHistory)}
          />
          {orderType === "delivery" && (
            <EditProfileAddress description={currentAddress?.description} />
          )}
          <EditPaymentMethod />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Profile;
