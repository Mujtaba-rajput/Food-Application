import React, { forwardRef } from "react";
import styles from "./customDropdown.style";
import FontAwesome from "react-native-vector-icons/Ionicons";
import SelectDropdown from "react-native-select-dropdown";
import { Text, View } from "react-native";

type CustomDropdownType = {
  data?: object[];
  placeHolder?: string;
  isSearchable?: Boolean;
  buttonTextAfterSelection?: any;
  rowTextForSelection?: any;
  onSelect?: any;
  label?: string;
  containerStyle?: any;
};

const countries = [
  "Egypt",
  "Canada",
  "Australia",
  "Ireland",
  "Brazil",
  "England",
  "Dubai",
  "France",
  "Germany",
  "Saudi Arabia",
  "Argentina",
  "India",
];

const CustomDropdown = forwardRef(
  (
    {
      data = [],
      placeHolder = "",
      isSearchable = false,
      buttonTextAfterSelection,
      rowTextForSelection,
      onSelect,
      label,
      containerStyle,
    }: CustomDropdownType,
    ref: any
  ) => {
    return (
      <View>
        {label && <Text style={styles.fieldLabel}>{label}</Text>}
        <SelectDropdown
          ref={ref}
          data={data}
          onSelect={onSelect}
          defaultButtonText={placeHolder}
          buttonTextAfterSelection={buttonTextAfterSelection}
          rowTextForSelection={rowTextForSelection}
          buttonStyle={[styles.dropdown1BtnStyle, containerStyle]}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? "chevron-up-outline" : "chevron-down-outline"}
                color={"#444"}
                size={18}
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
          selectedRowStyle={styles.dropdown1SelectedRowStyle}
          search
          searchInputStyle={styles.dropdown1searchInputStyleStyle}
          searchPlaceHolder={"Search here"}
          searchPlaceHolderColor={"darkgrey"}
          renderSearchInputLeftIcon={() => {
            return <FontAwesome name={"search"} color={"#444"} size={18} />;
          }}
        />
      </View>
    );
  }
);

export default CustomDropdown;
