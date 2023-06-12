import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./editProfileAddress.style";
import { CustomButton } from "..";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../utils/colors";

type EditProfileAddressType = {
  type?: string;
  description?: string;
};

const EditProfileAddress = ({
  type,
  description = " 3p sir syed rd,gulberg 2, near mm alam road, Lahore",
}: EditProfileAddressType) => {
  const [openCard, setOpenCard] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.headerWrapper}
        onPress={() => setOpenCard(!openCard)}
        activeOpacity={0.5}
      >
        <View>
          <Text style={styles.title}>Address</Text>
        </View>
        <View>
          <Icon
            name={openCard ? "chevron-down-outline" : "chevron-forward-outline"}
            size={20}
            color={colors.primaryColor}
          />
        </View>
      </TouchableOpacity>
      {openCard && (
        <View style={styles.generalContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.radioContainer}>
              <TouchableOpacity style={styles.radio}>
                <TouchableOpacity style={styles.radioColor} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.text}>Work</Text>
              <Text numberOfLines={2} style={styles.text}>
                {description}
              </Text>
            </View>
          </View>
          {/* <View style={styles.newAddressContainer}>
            <View style={styles.newAddress}>
              <Icon name="add-outline" size={20} color={colors.primaryColor} />
            </View>
            <View>
              <Text style={styles.newAddessText}>Add a new address</Text>
            </View>
          </View>

          <View style={styles.innerFooter}>
            <CustomButton
              label="Cancel"
              styles={styles.cancelButton}
              textStyles={{ color: colors.textColor }}
            />
            <CustomButton label="Apply" styles={styles.applyButton} />
          </View> */}
        </View>
      )}
    </View>
  );
};

export default EditProfileAddress;
