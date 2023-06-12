import React, { useRef, useEffect } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import styles from "./googleAutoPlaces.style";
import colors from "../../utils/colors";
import Icon from "react-native-vector-icons/Ionicons";

type GoogleAutoPlacesType = {
  onEnterAddress?: any;
  onSelectAddress?: any;
  onPressLocation?: any;
  value?: any;
};

const GoogleAutoPlaces = ({
  onEnterAddress,
  onSelectAddress,
  value,
  onPressLocation,
}: GoogleAutoPlacesType) => {
  const ref: any = useRef();
  useEffect(() => {
    ref.current?.setAddressText(value);
  });
  return (
    <>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder="Enter Your Location"
        currentLocation={true}
        currentLocationLabel="fetch current"
        autoFocus={true}
        returnKeyType={"search"}
        listViewDisplayed={false}
        keyboardAppearance={"light"}
        fetchDetails={true}
        onPress={(data, details = null) => {
          onSelectAddress(details, data);
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        GoogleReverseGeocodingQuery={{}}
        GooglePlacesSearchQuery={{
          rankby: "distance",
          types: "food",
        }}
        filterReverseGeocodingByTypes={[]}
        debounce={200}
        query={{
          key: "AIzaSyCiKJ4Gxzqpt9VFIHjfEEW-NWpqCs14Hn4",
          language: "en",
          components: "country:PK",
          regions: "locality",
        }}
        styles={styles}
        textInputProps={{
          InputComp: TextInput,
          placeholderTextColor: colors.placeholder,
          ref: ref,
          onSubmitEditing: (text) => {
            let address = text.nativeEvent.text;
            onEnterAddress(address);
          },
        }}
      />
    </>
  );
};

export default GoogleAutoPlaces;
