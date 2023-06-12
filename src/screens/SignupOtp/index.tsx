import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import styles from "./signupOtp.style";
import { CustomButton, Heading } from "../../components/index";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  useLazySendOtpQuery,
  useLazyVerifyOtpQuery,
  useSignUpMutation,
} from "../Login/login.api";
import useCountdown from "./useCountDown";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { setSignupUser } from "../Login/login.slice";

const CELL_COUNT = 4;

const SignupOtp = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const { signupPhoneNumber, signupUser } = useAppSelector(
    (state) => state.login
  );
  const { countDown, setCountDown } = useCountdown(60);
  const [otp, setOtp] = useState("");
  const [isResend, setIsResend] = useState(false);
  const [sendOtp, { isSuccess }] = useLazySendOtpQuery();
  const [verifyOtp, { isSuccess: verifyOtpSuccess, isError: otpFailure }] =
    useLazyVerifyOtpQuery();
  const [
    onSignUp,
    {
      isSuccess: onSignupSuccess,
      isError: onSignupError,
      isLoading: onSignupLoading,
    },
  ] = useSignUpMutation();

  const onClickResend = () => {
    sendOtp(signupPhoneNumber);
    setCountDown(60);
  };

  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const phoneNumber = signupPhoneNumber;
  const handleVerifyOtp = () => {
    if (countDown === 0) {
      Toast.show({
        type: "error",
        text1: "Please Activate Your OTP!",
        text2: "",
      });
    } else if (countDown > 0 && otp.length < 4) {
      Toast.show({
        type: "error",
        text1: "Incomplete Otp!",
        text2: "",
      });
    } else {
      verifyOtp({ phoneNumber, otp });
    }
  };

  useEffect(() => {
    if (verifyOtpSuccess) {
      setIsResend(false);
      onSignUp(signupUser);
      dispatch(setSignupUser({}));
    }
  }, [verifyOtpSuccess, phoneNumber]);

  useEffect(() => {
    if (otpFailure) {
      Toast.show({
        type: "error",
        text1: "Failed to Verify Otp!",
        text2: "",
      });
    }
  }, [otpFailure]);

  useEffect(() => {
    if (onSignupSuccess) {
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "",
      });
      dispatch(setSignupUser({}));
      navigation.replace(Routes.AuthTabs);
    }
  }, [onSignupSuccess]);

  useEffect(() => {
    if (onSignupError) {
      Toast.show({
        type: "error",
        text1: "Failed to Signup!",
        text2: "",
      });
      dispatch(setSignupUser({}));
      navigation.replace(Routes.AuthTabs);
    }
  }, [onSignupError]);

  return (
    <View style={styles.SafeAreaView}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/Img.png")}
          style={styles.bannerImageContainer}
        />
        <View style={styles.outerWrapper}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="always"
            alwaysBounceVertical={false}
            contentContainerStyle={styles.keyboardAvoidingView}
          >
            <Heading title="Verify OTP" style={styles.otpTitle} />

            <View style={styles.codeField}>
              <CodeField
                ref={ref}
                {...props}
                value={otp}
                onChangeText={setOtp}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                // keyboardType=""
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            </View>
            <View>
              <CustomButton
                label="Proceed"
                onClick={handleVerifyOtp}
                styles={styles.proceedButton}
              />
            </View>
            {countDown === 0 ? (
              <View>
                <CustomButton
                  label="Resend Code"
                  styles={styles.resendButton}
                  onClick={onClickResend}
                  textStyles={styles.resendButtonText}
                />
              </View>
            ) : (
              <Text style={styles.timer}>{countDown}</Text>
            )}
          </KeyboardAwareScrollView>
        </View>
      </View>
    </View>
  );
};

export default SignupOtp;
