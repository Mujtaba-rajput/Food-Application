import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./editProfileInfo.style";
import { Input, CustomButton } from "..";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../utils/colors";
import metrics from "../../utils/mertrics";

type EditProfileInfoType = {
  name?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
};

const EditProfileInfo = ({
  name,
  email,
  password,
  phoneNumber,
}: EditProfileInfoType) => {
  const [openCard, setOpenCard] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.headerWrapper}
        onPress={() => setOpenCard(!openCard)}
        activeOpacity={0.5}
      >
        <View>
          <Text style={styles.text}>Personal Information</Text>
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
        <View style={styles.cardOpen}>
          <Input
            label={"Name"}
            onChange={() => {}}
            value={name}
            placeholder={"Name"}
            inputStyles={styles.input}
            secureTextEntry={false}
            error={""}
          />
          <Input
            label={"Email"}
            onChange={() => {}}
            value={email}
            placeholder={"Email"}
            inputStyles={styles.input}
            secureTextEntry={false}
            error={""}
          />
          {/* <Input
            label={''}
            onChange={() => {}}
            value={''}
            placeholder={'Password'}
            inputStyles={styles.input}
            secureTextEntry={false}
            error={''}
          /> */}
          <Input
            label={"Phone Number"}
            onChange={() => {}}
            value={phoneNumber}
            placeholder={"Phone Number"}
            inputStyles={styles.input}
            secureTextEntry={false}
            error={""}
          />
          {/* <View style={styles.footer}>
            <CustomButton label="Save" styles={styles.footerButton} />
          </View> */}
        </View>
      )}
    </View>
  );
};

export default EditProfileInfo;
