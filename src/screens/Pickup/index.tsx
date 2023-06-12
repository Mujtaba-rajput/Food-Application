import React, { useEffect, useState } from "react";
import { View, Image, ImageBackground, ScrollView } from "react-native";
import styles from "./pickup.style";
import { CustomButton, CustomDropdown, Heading } from "../../components/index";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  useGetCitiesQuery,
  useLazyGetStoreByIdQuery,
  useLazyGetStoresByCityQuery,
} from "../Outlets/outlets.api";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import colors from "../../utils/colors";
import { setCurrentStore, setStore } from "../OrderType/orderType.slice";
import { reCalculateTax, setStoreData } from "../Cart/cart.slice";
import { getStoreSuccessData } from "../../utils/helper";

const Pickup = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const { orderType } = useAppSelector((state) => state.orderType);
  const [cityId, setCityId] = useState();
  const [cityName, setCityName] = useState();
  const [storeId, setStoreId] = useState();
  const [storeName, setStoreName] = useState();
  const { data } = useGetCitiesQuery("");
  const [loadStoreByCity, { data: storesByCity }] =
    useLazyGetStoresByCityQuery();
  const { data: cities = [] } = data || {};
  const { data: storeByCity = [] } = storesByCity || {};
  const { stores: cityAllStores } = storeByCity[0] || {};

  const { storeData } = useAppSelector((state) => state.cart);
  const [getStoreById] = useLazyGetStoreByIdQuery();

  useEffect(() => {
    if (cityId) {
      loadStoreByCity(cityId);
    }
  }, [cityId, loadStoreByCity]);

  useEffect(() => {
    if (storeData?.id) {
      dispatch(reCalculateTax());
    }
  }, [storeData, dispatch]);

  const saveStoreAddress = () => {
    if (cityId && storeId) {
      dispatch(
        setStore({
          orderType: orderType,
          store: {
            id: storeId,
            name: storeName,
          },
          city: {
            id: cityId,
            name: cityName,
          },
          area: {
            id: "",
            name: "",
          },
        })
      );
      navigation.navigate(Routes.HomeBase);
    } else {
      Toast.show({
        type: "error",
        text1: "Select Store",
        text2: "Select Your Store to Proceed",
      });
    }
  };

  return (
    <View style={styles.SafeAreaView2}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/Banner.png")}
          style={styles.bannerImageContainer}
        >
          <View style={styles.backIconContainer}>
            <Icon
              name="chevron-back-outline"
              color={colors.primaryColor}
              size={30}
              onPress={() => navigation.goBack()}
            />
          </View>
        </ImageBackground>
        <ScrollView style={styles.outerWrapper}>
          <View style={styles.outerStyle}>
            <Image source={require("../../assets/images/Shop.png")} />
          </View>

          <Heading
            title="Find Your Local The Shop"
            style={styles.outerHeading}
          />
          <View style={styles.innerWrapper}>
            <View style={styles.margin}>
              <View style={styles.inputMargin}>
                <CustomDropdown
                  placeHolder="City"
                  data={cities}
                  rowTextForSelection={(item: any) => {
                    return item.name;
                  }}
                  buttonTextAfterSelection={(selectedItem: any) => {
                    return selectedItem.name;
                  }}
                  onSelect={(selectedItem: any) => {
                    setCityId(selectedItem.id);
                    setCityName(selectedItem.name);
                  }}
                  label={"Select Your City"}
                />
              </View>
              <View style={styles.inputMargin}>
                <CustomDropdown
                  placeHolder="Store"
                  data={cityAllStores}
                  rowTextForSelection={(item: any) => {
                    return item.name;
                  }}
                  buttonTextAfterSelection={(selectedItem: any) => {
                    return selectedItem.name;
                  }}
                  onSelect={(selectedItem: any) => {
                    setStoreName(selectedItem.name);
                    setStoreId(selectedItem.id);
                    getStoreById(selectedItem.id)
                      .unwrap()
                      .then((result) => {
                        const { body } = getStoreSuccessData(result);
                        dispatch(setStoreData(body));
                        dispatch(setCurrentStore(data));
                      })
                      .catch((error) => console.log(error));
                  }}
                  label={"Select Your Store"}
                />
              </View>
            </View>
          </View>
          <View style={styles.outerStyle}>
            <CustomButton label="Continue" onClick={saveStoreAddress} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Pickup;
