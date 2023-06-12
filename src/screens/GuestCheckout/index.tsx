import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Image, ScrollView } from "react-native";
import { useForm, useController } from "react-hook-form";
import styles from "./guestCheckout.style";
import * as Yup from "yup";
import { CustomButton, CheckoutSummary, Input } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useLazySendOtpQuery } from "../Login/login.api";
import { setGuestPhoneNumber } from "../Login/login.slice";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toast } from "react-native-toast-message/lib/src/Toast";

type guestSignupForm = {
  phoneNumber: string;
};

const CustomInput = ({
  label,
  name,
  control: internalControl,
  placeholder,
  isSecure = false,
  error = "",
  inputStyles,
}: {
  label: string;
  name: string;
  control: any;
  isSecure?: boolean;
  placeholder?: string;
  error?: any;
  inputStyles?: any;
}) => {
  const { field } = useController({
    name,
    control: internalControl,
    defaultValue: "",
  });

  return (
    <Input
      label={label}
      onChange={field.onChange}
      placeholder={placeholder}
      value={field.value}
      secureTextEntry={isSecure}
      error={error}
      inputStyles={styles.input}
    />
  );
};

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .max(11, "Phone Number must not exceed"),
});

const GuestCheckout = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<guestSignupForm>({
    resolver: yupResolver(validationSchema),
  });
  const [sendOtp, { isSuccess, isError, isLoading }] = useLazySendOtpQuery();
  const { totalAmount, mergedItems, cartItems } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (isSuccess) {
      navigation.replace(Routes.Otp);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setPhoneNumber("");
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "",
      });
    }
  }, [isError]);

  const onSubmit = async (values: guestSignupForm) => {
    const { phoneNumber: phone } = values || {};
    const phoneNumber = phone.split(" ").join("").slice(1, phone.length);
    const code = "92";
    setPhoneNumber(phoneNumber);
    const newCode = code + phoneNumber;
    dispatch(setGuestPhoneNumber(newCode));
    await sendOtp(newCode);
  };

  const Tax = totalAmount * 0.17;
  const Delivery_Charges = 60;
  const Discount = 0;
  const calculateTotal = () => {
    return totalAmount + Tax + Delivery_Charges;
  };

  return (
    <>
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.innerWrapper}>
          <Image source={require("../../assets/images/Shop.png")} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Checkout</Text>
          <Text style={styles.subTitle}>as a guest</Text>
        </View>
        <View style={styles.inputWrapper}>
          <CustomInput
            label="Phone"
            name="phoneNumber"
            placeholder="xxxx-xxxxxx-x"
            control={control}
            error={errors?.phoneNumber ? errors?.phoneNumber?.message : ""}
          />
        </View>
        <ScrollView>
          {cartItems.length > 0 && (
            <CheckoutSummary
              list={mergedItems}
              subTotal={totalAmount.toFixed(2)}
              tax={Tax}
              discount={Discount}
              deliveryFee={Delivery_Charges}
              total={calculateTotal()}
            />
          )}
        </ScrollView>

        <View style={styles.footer}>
          <CustomButton
            label="Continue"
            styles={styles.button}
            onClick={handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default GuestCheckout;
