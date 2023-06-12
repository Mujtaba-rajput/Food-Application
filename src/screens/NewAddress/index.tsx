import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Platform,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./newAddress.style";
import MapView, { Marker } from "react-native-maps";
import { Heading, CustomButton, GoogleAutoPlaces } from "../../components";
import { Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";
import GetLocation from "react-native-get-location";
import Geocoder from "react-native-geocoding";
import { setCurrentAddress, setLatLong } from "../Outlets/outlets.slice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../utils/colors";
import { useAddAddressMutation } from "../Login/login.api";

Geocoder.init("AIzaSyDUiKRuT0sJcubUKd2I4Mn5_WqqRxyDKjI");

const NewAddress = () => {
  const [selectAddress, setSelectedAddress] = useState("");
  const [locationCurrent, setLocationCurrent] = useState<any>({});
  const [addressDetails, setAddressDetails] = useState<any>({});
  const { currentAddress, latLong } = useAppSelector((state) => state.outlets);
  const { user, guest } = useAppSelector((state) => state.login);
  const [addCustomerAddress, { isLoading: isCreateAddress }] =
    useAddAddressMutation();

  const dispatch = useAppDispatch();
  const current_Location = () =>
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        setLocationCurrent(location);
        Geocoder.from(location.latitude, location.longitude)
          .then((json) => {
            var addressComponent = json.results[1].formatted_address;
            let filterLocation = {
              latitude: location.latitude,
              longitude: location.longitude,
            };
            dispatch(setLatLong(filterLocation));
            onSelectAddress(filterLocation, addressComponent);
          })
          .catch((error) => console.log(JSON.stringify(error)));
      })
      .catch(() => {
        Alert.alert(
          "Location Disabled !!",
          "To continue, turn on device location which uses Google's location services",
          [
            {
              text: "NO THANKS",
              onPress: () => console.log("Cancel"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {},
            },
          ],
          { cancelable: false }
        );
      });

  useEffect(() => {
    current_Location();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigation: any = useNavigation();

  const onSelectAddress = (details: any, address: any) => {
    let location = {
      latitude: details?.geometry?.location.lat
        ? details.geometry.location.lat
        : details.latitude,
      longitude: details?.geometry?.location.lng
        ? details?.geometry?.location.lng
        : details.longitude,
    };
    let newAddress = address;
    setLocationCurrent(location);
    if (newAddress?.description) {
      setAddressDetails(newAddress);
      setSelectedAddress(newAddress.description);
    } else {
      let customAddress = {
        description: newAddress,
        matched_substrings: [],
        place_id: "",
        reference: "",
        structured_formatting: {},
        terms: [],
        types: [],
      };
      setAddressDetails(customAddress);
      setSelectedAddress(newAddress);
    }
  };

  const getAddress = () => {
    Geocoder.from(locationCurrent.latitude, locationCurrent.longitude)
      .then((json: any) => {
        var addressComponent = json.results[1].formatted_address;
        setSelectedAddress(addressComponent);
      })
      .catch((error: any) => console.log("errorr", error));
  };

  const save = () => {
    if (user?.Id) {
      const payload = {
        address: addressDetails?.description,
        latitude: latLong.lat,
        longitude: latLong.lng,
        name: "Work",
      };
      addCustomerAddress({
        ...payload,
        phoneNumber: user?.PhoneNumber,
        entityId: user.Id,
        entityType: 2,
      });
    }
    if (addressDetails?.description) {
      dispatch(setCurrentAddress(addressDetails));
      navigation.navigate(Routes.HomeBase);
    } else {
      Toast.show({
        type: "error",
        text1: "Please Select Address",
        text2: "",
      });
    }
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <MapView
        style={styles.mapView}
        region={{
          latitude: locationCurrent?.latitude
            ? locationCurrent.latitude
            : 54.884507,
          longitude: locationCurrent?.longitude
            ? locationCurrent.longitude
            : -2.9615021,
          latitudeDelta: locationCurrent?.latitudeDelta
            ? locationCurrent.latitudeDelta
            : 0.00222,
          longitudeDelta: locationCurrent?.longitudeDelta
            ? locationCurrent.longitudeDelta
            : 0.00121,
        }}
        onRegionChangeComplete={(region) => {
          setLocationCurrent(region);
          getAddress();
        }}
        mapType={Platform.OS === "android" ? "standard" : "standard"}
        onLongPress={(e) => {
          setLocationCurrent(e.nativeEvent.coordinate);
        }}
      >
        <Marker
          maxZoomLevel={0}
          showsMyLocationButton={true}
          draggable
          coordinate={{
            latitude: locationCurrent?.latitude
              ? locationCurrent.latitude
              : 54.884507,
            longitude: locationCurrent?.longitude
              ? locationCurrent.longitude
              : -2.9615021,
          }}
          initialRegion={{
            latitude: locationCurrent?.latitude
              ? locationCurrent.latitude
              : 54.884507,
            longitude: locationCurrent?.longitude
              ? locationCurrent.longitude
              : -2.9615021,
            latitudeDelta: 0.00222,
            longitudeDelta: 0.00121,
          }}
          region={{
            latitude: locationCurrent?.latitude
              ? locationCurrent.latitude
              : 54.884507,
            longitude: locationCurrent?.longitude
              ? locationCurrent.longitude
              : -2.9615021,
            latitudeDelta: 0.00222,
            longitudeDelta: 0.00121,
          }}
          // description={selectAddress}
          onDragEnd={(e: any) => {
            setLocationCurrent(e.nativeEvent.coordinate);
          }}
        />
      </MapView>

      {/* <View style={styles.locationIconContainer}>
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => current_Location()}
        >
          <View style={styles.locationIcon}>
            <Icon name={"locate"} size={25} color={colors.white} />
          </View>
        </TouchableOpacity>
      </View> */}
      {/* </MapView> */}

      <View style={styles.addressView}>
        <View style={styles.title}>
          <Heading title="Select Location" />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.addressField}>
          <View style={{}}>
            <GoogleAutoPlaces
              onSelectAddress={(addressDetials: any, address: any) => {
                onSelectAddress(addressDetials, address);
                dispatch(setLatLong(addressDetials?.geometry?.location));
              }}
              onEnterAddress={(text: any) => {
                setSelectedAddress(text);
              }}
              value={selectAddress}
            />
          </View>
          <View></View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.confirmButton}>
          <CustomButton
            label="Confirm Location"
            styles={styles.customWidth}
            onClick={save}
          />
        </View>
        <View style={styles.locate}>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => current_Location()}
          >
            <View style={styles.locationIcon}>
              <Icon name={"locate"} size={25} color={colors.white} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewAddress;
