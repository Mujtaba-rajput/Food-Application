import React, { useEffect } from "react";
import { View } from "react-native";
import styles from "./signup.style";
import { Input, CustomButton } from "../../components/index";
import * as Yup from "yup";
import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../hooks/redux";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useLazySendOtpQuery, useSignUpMutation } from "../Login/login.api";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { setSignupPhoneNumber, setSignupUser } from "../Login/login.slice";

type UserSubmitForm = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
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
      containerStyles={[styles.inputContainer, inputStyles]}
      error={error}
      inputStyles={styles.inputStyle}
    />
  );
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .max(11, "Phone Number must not exceed"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Confirm Password does not match"),
});

const Signup = () => {
  const [onSignUp, { isSuccess, isError, isLoading }] = useSignUpMutation();
  const [
    sendOtp,
    { isSuccess: otpSuccess, isError: otpError, isLoading: otpLoading },
  ] = useLazySendOtpQuery();
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (value: UserSubmitForm) => {
    const { phoneNumber: phone, ...rest } = value || {};
    const phoneNumber = phone.split(" ").join("").slice(1, phone.length);
    const code = "92";
    // await onSignUp({
    //   ...rest,
    //   phoneNumber: code + phoneNumber,
    // });
    let data = { ...rest, phoneNumber: code + phoneNumber };
    dispatch(setSignupPhoneNumber(code + phoneNumber));
    dispatch(setSignupUser(data));
    await sendOtp(code + phoneNumber);
  };

  useEffect(() => {
    if (otpSuccess) {
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "",
      });
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: Routes.SignupOtp }],
          })
        );
      }, 1000);
    }
  }, [otpSuccess]);

  useEffect(() => {
    if (otpError) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "",
      });
    }
  }, [otpError]);

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.innerWrapper}>
        <CustomInput
          label="First Name"
          name="firstName"
          placeholder="Enter"
          control={control}
          error={errors?.firstName ? errors?.firstName?.message : ""}
          inputStyles={styles.custom}
        />

        <CustomInput
          label="Last Name"
          name="lastName"
          placeholder="Enter"
          control={control}
          error={errors?.lastName ? errors?.lastName?.message : ""}
          inputStyles={styles.custom}
        />

        <CustomInput
          label="Email"
          name="email"
          placeholder="Enter"
          control={control}
          error={errors?.email ? errors?.email?.message : ""}
          inputStyles={styles.custom}
        />

        <CustomInput
          label="Phone"
          name="phoneNumber"
          placeholder="xxxx-xxxxxx-x"
          control={control}
          error={errors?.phoneNumber ? errors?.phoneNumber?.message : ""}
          inputStyles={styles.custom}
        />
        <CustomInput
          label="Password"
          name="password"
          placeholder="Enter"
          control={control}
          isSecure={true}
          error={errors?.password ? errors?.password?.message : ""}
          inputStyles={styles.custom}
        />

        <CustomInput
          label="Retype Password"
          name="confirmPassword"
          placeholder="Enter"
          control={control}
          isSecure={true}
          error={
            errors?.confirmPassword ? errors?.confirmPassword?.message : ""
          }
        />
      </View>

      <View style={styles.footer}>
        <CustomButton
          label="Sign up"
          styles={styles.input}
          onClick={handleSubmit(onSubmit)}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
