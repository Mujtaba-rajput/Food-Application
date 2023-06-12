import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./addressSheet.style";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../utils/colors";
import { Divider } from "react-native-paper";
import Heading from "../Heading";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useGetAddressQuery } from "../../screens/Login/login.api";
import { setUserAddress } from "../../screens/Login/login.slice";
import useEffectAfterSuccess from "../../lib/CustomHooks/useEffectAfterSuccess";

type AddressSheetType = {
  address?: string;
  onAddNew?: any;
};

interface DefaultAddressProps {
  latitude: number;
  longitude: number;
  address: string;
  id: number;
  isDefault?: boolean;
}

const AddressSheet = ({ address = "", onAddNew }: AddressSheetType) => {
  const dispatch = useAppDispatch();
  const { currentAddress } = useAppSelector((state) => state.outlets);
  const {
    user,
    guest,
    userAddress: activeAddress,
  } = useAppSelector((state) => state.login);
  const [skip, setSkip] = useState(false);
  const {
    data,
    refetch,
    isLoading: isAddressesLoading,
  } = useGetAddressQuery(user?.Id, {
    skip,
  });
  const { data: customerAddresses = [] } = data || {};

  const getDefaultAddress = (addresses: DefaultAddressProps[]) => {
    const result = addresses?.filter((address) => address?.isDefault)[0];
    return {
      latitude: result?.latitude,
      longitude: result?.longitude,
      address: result?.address,
      id: result?.id,
    };
  };

  useEffect(() => {
    if (customerAddresses.length) {
      const result = customerAddresses[0];
      dispatch(setUserAddress(result));
    }
  }, [customerAddresses, dispatch]);

  useEffect(() => {
    if (user.Id) {
      setSkip(false);
    }
  }, [user]);

  const handleAddressRadio = (e: any) => {
    const userAddress = customerAddresses.reduce((acc: any, address: any) => {
      if (address.id === parseInt(e)) {
        acc = {
          latitude: address.latitude,
          longitude: address.longitude,
          address: address.address,
          id: address.id,
        };
        return acc;
      }
      return acc;
    }, {});
    dispatch(setUserAddress(userAddress));
  };
  return (
    <View>
      <View style={styles.container}>
        <Heading title="Delivery address" />
      </View>
      <Divider style={styles.divide} />
      {customerAddresses.length > 0 &&
        customerAddresses.map((item: any) => {
          return (
            <View style={styles.innerContainer}>
              <View style={styles.radioContainer}>
                <TouchableOpacity
                  style={styles.radio}
                  onPress={() => handleAddressRadio(item.id)}
                >
                  <TouchableOpacity
                    style={
                      activeAddress?.id === item.id
                        ? styles.radioColor
                        : styles.radioTransparent
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.innerMargin}>
                <Text style={styles.text}>{item.name}</Text>
                <Text numberOfLines={2} style={styles.text}>
                  {item?.address}
                </Text>
              </View>
            </View>
          );
        })}
      {customerAddresses.length === 0 && (
        <View style={styles.noAddressContainer}>
          <Text style={styles.noAddress}>You don't have saved address</Text>
        </View>
      )}

      <View style={styles.newAddressContainer}>
        <View style={styles.newAddress}>
          <Icon name="add-outline" size={20} color={colors.primaryColor} />
        </View>
        <TouchableOpacity onPress={onAddNew}>
          <Text style={styles.newAddessText}>{"Add a new Address"}</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.footerContainer}>
        <View style={styles.innerFooter}>
          <CustomButton
            label="Cancel"
            styles={styles.cancelButton}
            textStyles={styles.cancelText}
          />
          <CustomButton label="Apply" styles={styles.applyButton} />
        </View>
      </View> */}
    </View>
  );
};

export default AddressSheet;
