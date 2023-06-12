import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, ImageBackground } from "react-native";
import styles from "./outlets.style";
import {
  Input,
  CustomButton,
  CustomDropdown,
  Heading,
} from "../../components/index";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
  useGetCitiesQuery,
  useLazyGetAreasQuery,
  useLazyGetStoresQuery,
  useLazyGetStoreByIdQuery,
} from "./outlets.api";
import colors from "../../utils/colors";
import { setStore, setCurrentStore } from "../OrderType/orderType.slice";
import { reCalculateTax, setStoreData } from "../Cart/cart.slice";
import { getStoreSuccessData } from "../../utils/helper";

const Outlets = () => {
  const navigation: any = useNavigation();
  const { store, orderType, city, area } = useAppSelector(
    (state) => state.orderType
  );
  const dispatch = useAppDispatch();
  const [cityId, setCityId] = useState();
  const [cityName, setCityName] = useState();
  const [areaId, setAreaId] = useState();
  const [areaName, setAreaName] = useState();
  const { data } = useGetCitiesQuery("");
  const [loadAreas, { data: cityAreas }] = useLazyGetAreasQuery();
  const [loadStoresAreas, { data: cityStores }] = useLazyGetStoresQuery();
  const { data: cities = [] } = data || {};
  const { data: areas = [] } = cityAreas || {};
  const { data: myStores } = cityStores || {};
  const { store: stores = [] } = myStores || {};
  const { storeData, tax } = useAppSelector((state) => state.cart);
  const [getStoreById] = useLazyGetStoreByIdQuery();

  const Loading = [{ label: "Loading...", id: 1 }];

  useEffect(() => {
    if (cityId) {
      loadAreas(cityId);
    }
  }, [cityId, loadAreas]);

  useEffect(() => {
    if (cityId && areaId) {
      loadStoresAreas({
        cityId: cityId,
        areaId: areaId,
      });
    }
  }, [cityId, areaId, loadStoresAreas]);
  useEffect(() => {
    if (storeData?.id) {
      dispatch(reCalculateTax());
    }
  }, [storeData, dispatch]);

  useEffect(() => {
    if (stores[0]?.id) {
      getStoreById(stores[0]?.id)
        .unwrap()
        .then((result) => {
          const { body } = getStoreSuccessData(result);
          dispatch(setStoreData(body));
          dispatch(setCurrentStore(data));
        })
        .catch((error) => console.log(error));
    }
  }, [stores, getStoreById, dispatch]);

  const saveStoreAddress = () => {
    if (cityName && areaName && stores.length > 0) {
      dispatch(
        setStore({
          orderType: orderType,
          store: {
            id: stores[0].id,
            name: stores[0].name,
          },
          city: {
            id: cityId,
            name: cityName,
          },
          area: {
            id: areaId,
            name: areaName,
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
          <TouchableOpacity
            style={styles.backIconContainer}
            onPress={() => navigation.goBack()}
            activeOpacity={0.3}
          >
            <Icon
              name="chevron-back-outline"
              color={colors.primaryColor}
              size={30}
            />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.outerWrapper}>
          <View style={styles.outerStyle}>
            <Image source={require("../../assets/images/Shop.png")} />
          </View>

          <Heading
            title="Enter Your Delivery Area"
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
                  placeHolder="Area"
                  data={areas}
                  rowTextForSelection={(item: any) => {
                    return item.area;
                  }}
                  buttonTextAfterSelection={(selectedItem: any) => {
                    return selectedItem.area;
                  }}
                  onSelect={(selectedItem: any) => {
                    setAreaId(selectedItem.id);
                    setAreaName(selectedItem.area);
                  }}
                  label={"Select Your Main Area"}
                />
              </View>

              <Input
                label={"Select Your Store"}
                onChange={() => {}}
                value={stores[0]?.name ? stores[0].name : ""}
                placeholder={"Store"}
                inputStyles={styles.inputColor}
                secureTextEntry={false}
                error={""}
              />
            </View>
          </View>
          <View style={styles.outerStyle}>
            <CustomButton label="Continue" onClick={saveStoreAddress} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Outlets;
