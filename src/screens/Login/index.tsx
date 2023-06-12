import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./login.style";
import { Input, CustomButton } from "../../components/index";
import * as Yup from "yup";
import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "./login.api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import useEffectAfterSuccess from "../../lib/CustomHooks/useEffectAfterSuccess";
import { Routes } from "../../navigation/Routes";
import { setStorageData } from "../../service/asyncStorage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { setUser } from "./login.slice";
import { useAppDispatch } from "../../hooks/redux";

type UserSubmitLogin = {
  email?: string;
  password?: string;
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
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [onLogin, { isLoading, data: UserData, isSuccess }] =
    useLoginMutation();

  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserSubmitLogin>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (value: UserSubmitLogin) => {
    onLogin({
      emailOrPhoneNo: value?.email,
      password: value?.password,
    });
  };

  useEffectAfterSuccess(() => {
    const { data, access_token, status, message } = UserData;
    if (status === "SUCCESS") {
      setStorageData("token", access_token);
      dispatch(setUser(data));
      Toast.show({
        type: "success",
        text1: "Logged In Successfully!",
        text2: "",
      });
      navigation.replace(Routes.HomeBase);
    } else {
      Toast.show({
        type: "error",
        text1: "Invalid username or password!",
        text2: "",
      });
    }
  }, isSuccess);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerWrapper}>
          <CustomInput
            label="Email"
            name="email"
            placeholder="Email"
            control={control}
            error={errors?.email ? errors?.email?.message : ""}
            inputStyles={styles.custom}
          />
          <CustomInput
            label="Password"
            name="password"
            placeholder="Password"
            control={control}
            isSecure={true}
            error={errors?.password ? errors?.password?.message : ""}
          />
        </View>
        <TouchableOpacity style={styles.underlineTextContainer}>
          <Text style={styles.underlineText}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.footerWrapper}>
          <CustomButton
            label="Login"
            styles={styles.loginButton}
            onClick={handleSubmit(onSubmit)}
          />
          <CustomButton
            label="Checkout as guest"
            textStyles={styles.text}
            styles={styles.guestButton}
            onClick={() => navigation.replace(Routes.GuestCheckout)}
          />
        </View>

        <View style={styles.dashedContainer}>
          <View style={styles.dashedLine}></View>

          <View style={styles.dashedTextWrapper}>
            <Text style={styles.dashedText}>or</Text>
          </View>
          <View style={styles.dashedLine}></View>
        </View>
        <View style={styles.bottom}>
          {/* <CustomButton
            label="Login with Facebook"
            textStyles={styles.facebook}
            styles={styles.facebookContainer}
            leftImage={require("../../assets/images/facebook.png")}
          /> */}
          <CustomButton
            label="Login with Google"
            textStyles={styles.text}
            styles={styles.googleContainer}
            leftImage={require("../../assets/images/google.png")}
          />
          {/* <TouchableOpacity style={styles.bottomPadding}>
            <Text style={styles.bottomText}>Don't have an account?</Text>
          </TouchableOpacity> */}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Login;
