import React, { useEffect } from "react";
import { Image } from "react-native";
import styles from "./splash.style";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

const Splash = () => {
  const navigation: any = useNavigation();

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        setTimeout(async () => {
          navigation.navigate(Routes.OrderType);
        }, 5000);
      } else {
        Toast.show({
          type: "error",
          text1: "Network Failed!",
          text2: "Please connect to the network.",
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Image
        source={require("../../assets/images/PizzaSplash.gif")}
        style={styles.container}
      />
    </>
  );
};

export default Splash;
