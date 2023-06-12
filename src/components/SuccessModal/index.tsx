import React from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";
import styles from "./successModal.style";
import Icon from "react-native-vector-icons/Ionicons";
import { CustomButton } from "..";

type SuccessModalType = {
  setShowModal?: any;
  showModal?: boolean;
  orderNumber?: number;
  storeName?: string;
  onPress?: any;
  onTrack?: any;
};

const SuccessModal = ({
  setShowModal,
  showModal = false,
  orderNumber = 0,
  onPress,
  storeName,
  onTrack,
}: SuccessModalType) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(!showModal);
      }}
    >
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.iconContainer}>
            <Icon name="checkmark-outline" size={80} color={"#008C15"} />
          </View>
          <View style={styles.success}>
            <Text style={styles.successText}>Thank you</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description} numberOfLines={2}>
              Your Order {orderNumber} has been sent to {storeName}.
            </Text>
            <Text style={styles.description} numberOfLines={2}>
              Please Contact: 0423-12344567
            </Text>
          </View>

          <TouchableOpacity
            style={styles.trackButtonContainer}
            onPress={onTrack}
          >
            <Text style={styles.trackButton}>Track Order</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <CustomButton
              label="Done"
              styles={styles.button}
              onClick={onPress}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;
