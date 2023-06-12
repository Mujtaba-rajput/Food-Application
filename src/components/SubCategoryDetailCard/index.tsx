import React from "react";
import { Text, Image, View, TouchableOpacity, FlatList } from "react-native";
import styles from "./subCategoryDetailCard.style";
import fonts from "../../utils/fonts";
import colors from "../../utils/colors";
import metrics from "../../utils/mertrics";
import { CustomButton, CustomDropdown } from "..";
import { DecoratedPrice } from "../../utils/helper";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setProductModifier } from "../../screens/SubCategoryDetails/subCategoryDetail.slice";

type SubCategoryDetailCardType = {
  title?: string;
  subTitle?: string;
  menu?: any;
  menuImage?: any;
  onPress?: any;
  maxValue?: number;
  minValue?: number;
  activeValue?: any;
  optional?: number;
  setActiveValue?: any;
  activeMultiple?: any;
  setActiveMultiple?: any;
  modifierData?: any;
};

const SubCategoryDetailCard = ({
  title = "",
  subTitle = "",
  menu = [],
  menuImage,
  maxValue,
  minValue,
  activeValue,
  optional,
  setActiveValue,
  activeMultiple = [],
  setActiveMultiple,
  modifierData,
}: SubCategoryDetailCardType) => {
  const dispatch = useAppDispatch();
  const { orderProductModifiers } = useAppSelector((state) => state.product);
  // const checkValueExists = (item: any) => {
  //   const shallowArray = activeMultiple;
  //   shallowArray.find((value: any) => {
  //     if (value.option_id === item.id) {
  //       const filter = shallowArray.filter((active: any) => {
  //         return active.option_id !== value.option_id;
  //       });
  //       setActiveMultiple(filter);
  //     } else {
  //       setActiveMultiple([
  //         ...shallowArray,
  //         {
  //           option_id: item.id,
  //           sideitem_id: item.product_option_id,
  //           quantity: 1,
  //           description: item.name,
  //           price: 0,
  //           tax: 0,
  //           optional_total: 0,
  //           taxId: 0,
  //           status: 0,
  //         },
  //       ]);
  //     }
  //   });
  // };

  // const selectMultiple = (item: any) => {
  //   if (activeMultiple.length === 0) {
  //     setActiveMultiple([
  //       {
  //         option_id: item.id,
  //         sideitem_id: item.product_option_id,
  //         quantity: 1,
  //         description: item.name,
  //         price: 0,
  //         tax: 0,
  //         optional_total: 0,
  //         taxId: 0,
  //         status: 0,
  //       },
  //     ]);
  //   } else {
  //     checkValueExists(item);
  //   }
  // };

  const setOption = (item: any) => {
    setActiveValue({
      id: item?.modifierValueId,
      name: item?.name,
      price: item?.modifierValue?.inStorePrice,
    });
    let data = {
      productId: modifierData?.productId,
      modifierId: modifierData?.modifierId,
      orderProductModifierValues: {
        id: item?.modifierValueId,
        name: item?.name,
        price: item?.modifierValue?.inStorePrice,
      },
    };
    dispatch(setProductModifier(data));
  };

  // const checkIdsForMultipleValues = () => {
  //   let filterData = activeMultiple.map((item: any) => {
  //     return item.option_id;
  //   });
  //   return filterData;
  // };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>

      {/* {minValue === maxValue ? (
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={menu}
          renderItem={({ item }) => (
            <View style={styles.menuWrapper}>
              <TouchableOpacity
                style={
                  activeValue.option_id === item.id
                    ? styles.activeInnerWrapper
                    : styles.innerWrapper
                }
                onPress={() => setOption(item)}
              >
                <Text style={styles.menuName}>Small</Text>
                <Text style={styles.menuSize}>6 Slices</Text>
                <Image source={menuImage} style={styles.image} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item: any) => item.id}
          numColumns={3}
        />
      ) : ( */}
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={menu}
        renderItem={({ item }) => (
          <View style={styles.multiMenuWrapper}>
            <TouchableOpacity
              style={
                activeValue.id === item.modifierValueId
                  ? styles.multiActiveInnerWrapper
                  : styles.multiInnerWrapper
              }
              onPress={() => {
                setOption(item);
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  source={menuImage}
                  style={styles.multiImage}
                  resizeMode="contain"
                />
              </View>
              <View style={{ justifyContent: "space-evenly", paddingLeft: 20 }}>
                <Text style={styles.menuName}>{item?.name}</Text>
                <Text style={styles.menuSize}>20 Cals</Text>
                <View>
                  <Text style={styles.subTitle}>
                    {DecoratedPrice(item?.modifierValue?.inStorePrice)}
                  </Text>
                </View>
                {/* <View
                  style={{
                    alignItems: "flex-end",
                    marginLeft: 20,
                  }}
                >
                  <CustomDropdown
                    containerStyle={{
                      width: metrics.screenWidth * 0.2,
                      height: metrics.screenHeight * 0.09,
                    }}
                    data={sauces}
                    placeHolder="Regular"
                    rowTextForSelection={(item: any) => {
                      return item.name;
                    }}
                    buttonTextAfterSelection={(selectedItem: any) => {
                      return selectedItem.name;
                    }}
                    onSelect={(selectedItem: any) => {}}
                  />
                </View> */}
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item: any) => item.id}
      />
      {/* )} */}
    </View>
  );
};

export default SubCategoryDetailCard;
