import React from "react";
import styles from "./onboarding.style";
import {
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { Heading } from "..";

type OnboardingCardType = {
  title: string;
  style?: any;
  image: ImageSourcePropType;
};

const OnboardingCard = ({ title = "", style, image }: OnboardingCardType) => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.cardSubContainer}>
          <Image
            source={image}
            style={styles.deliveryIcon}
            resizeMode="contain"
          />
          <Heading title={title} style={styles.margin} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingCard;
