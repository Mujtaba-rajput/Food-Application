import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "./paymentMethod.style";
import colors from "../../utils/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const PaymentMethod = () => {
  const navigation: any = useNavigation();
  const cardDetails = [
    { name: "Visa", number: "****4573" },
    { name: "Mastercard", number: "****4573" },
    { name: "Visa", number: "****4573" },
  ];
  return (
    <>
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.container}>
          <View style={styles.headerWrapper}>
            <Icon
              name="chevron-back-outline"
              color={colors.primaryColor}
              size={25}
              style={styles.icon}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.title}>Payment Method</Text>
          </View>
        </View>
        <Divider style={styles.divide} />
        {cardDetails.map((item: any, index) => {
          return (
            <View style={styles.cardContainer} key={index}>
              <View style={styles.row}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require("../../assets/images/visa.png")}
                    style={styles.image}
                    resizeMode={"contain"}
                  />
                </View>
                <View>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.text}>{item.number}</Text>
                </View>
              </View>
              <View style={styles.radioContainer}>
                <TouchableOpacity style={styles.radio} />
              </View>
            </View>
          );
        })}
      </SafeAreaView>
    </>
  );
};

export default PaymentMethod;
