import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import styles from "./deals.style";
import { Heading, CustomButton, Loader, CustomDeals } from "../../components";
import colors from "../../utils/colors";
import Icon from "react-native-vector-icons/AntDesign";
import CancelIcon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { useFetchDealByIdQuery } from "../Home/home.api";
import { updateCount } from "./deals.slice";
import _ from "lodash";
import {
  DecoratedPrice,
  GroupByModifire,
  calculateModifierPrice,
  getIncompleteModifier,
} from "../../utils/helper";
import { addToCart, deleteFormCart } from "../Cart/cart.slice";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import metrics from "../../utils/mertrics";
import fonts from "../../utils/fonts";
import {
  setDeals,
  updateDealCount,
} from "../SubCategoryDetails/subCategoryDetail.slice";
import { ModifierI, ProductModifiers, subKeys, Product } from "./type";

const isEdited = false;
const Deals = () => {
  const { product_id } = useAppSelector((state) => state.subCategory);
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();

  const { data, isLoading } = useFetchDealByIdQuery(product_id, {
    skip: isEdited,
  });
  const { data: dealData } = data || {};
  const { dealDetails = {} } = dealData || {};
  const { dealDetailComponent = [] } = dealDetails;
  const { product, dealsArray } = useAppSelector((state) => state.product);

  const { mergedItems } = useAppSelector((state) => state.cart);
  const HeadingText = `${dealsArray?.name}`;

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (dealDetailComponent && dealDetailComponent.length) {
      const dealObject = {
        dealId: dealData?.dealDetailId,
        name: dealData?.name,
        description: dealData.description,
        productTaxes: dealData?.dealTaxes,
        inStorePrice: dealData.inStorePrice,
        totalCount: 1,
        products: dealDetailComponent.map(
          (item: { product: Product; productId: number }) => {
            return {
              ...item.product,
              modifire: GroupByModifire(item?.product.productModifier),
              productId: item.productId,
              dealId: dealData?.dealDetailId,
              dealName: dealData?.name,
            };
          }
        ),
      };
      dispatch(setDeals(dealObject));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealDetailComponent]);

  useEffect(() => {
    if (isEdited) {
      const dealObject = mergedItems[product_id] ?? {};
      if (Object.keys(dealObject).length) {
        dispatch(setDeals(dealObject));
      } else {
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdited, mergedItems]);

  const getDescription = (modifire: ModifierI) => {
    if (modifire && Object.keys(modifire).length)
      return Object.keys(modifire || {}).reduce((description, key) => {
        const selectedModifier = modifire[
          key as subKeys
        ].productModifierValues?.filter(
          (item: ProductModifiers) => item.selected
        );
        if (selectedModifier.length > 0) {
          selectedModifier.forEach((item) => {
            description = description + item.name;
            description = description + ",";
          });
        }
        return description;
      }, "");
  };

  const SelectionModifier = ({ product }: { product: Product }) => {
    return (
      <View style={styles.selectionTitleWrapper}>
        <CustomButton
          styles={styles.selectionTitle}
          label={product?.name}
          textStyles={styles.selectionText}
        />
      </View>
    );
  };

  const calculateProductPrice = () => {
    const modifierPrice = dealsArray?.products?.reduce(
      (count: number, item: Product) => {
        count = count + calculateModifierPrice(item?.modifire);
        return count;
      },
      0
    );
    return DecoratedPrice(modifierPrice + parseInt(dealsArray?.inStorePrice));
  };

  const onAddToCart = async () => {
    const internalId = `custom${Math.floor(Math.random() * 100)}_${
      product?.id
    }`;

    const index = getIncompleteModifier(product.modifire);
    if (isEdited && index === -1)
      await dispatch(deleteFormCart({ id: product?.internalId }));
    if (index > -1) {
      if (index !== value) {
        setValue(index);
      } else {
        Toast.show({
          type: "error",
          text1: "please select maximum quantity",
          text2: "",
        });
      }
    } else {
      for (let i = 0; i < product.totalCount; i++) {
        await dispatch(
          addToCart({
            internalId: isEdited ? product.internalId : internalId,
            ...product,
          })
        );
      }
      Toast.show({
        type: "success",
        text1: "Added to your Cart",
        text2: "",
      });
      navigation.navigate(Routes.Cart);
    }
  };

  const addDeal = () => {
    let productId = 0;
    let modifierIndex = -1;
    for (let i = 0; i < dealsArray.products?.length; i++) {
      if (dealsArray.products[i]?.productModifier?.length) {
        modifierIndex = getIncompleteModifier(
          dealsArray?.products[i]?.modifire
        );
        if (modifierIndex > -1) {
          productId = dealsArray?.products[i]?.productId;
          break;
        }
      }
    }
    if (modifierIndex > -1) {
      Toast.show({
        type: "error",
        text1: "please select maximum quantity",
        text2: "",
      });
      setValue(modifierIndex);
      // setExpandedTab(`${productId}`);
    } else {
      const internalId = `custom${Math.floor(Math.random() * 100)}_${
        dealsArray?.dealId
      }`;
      if (isEdited && modifierIndex === -1)
        dispatch(deleteFormCart({ id: dealsArray?.internalId }));
      for (let i = 0; i < dealsArray.totalCount; i++) {
        dispatch(
          addToCart({
            ...dealsArray,
            internalId: isEdited ? dealsArray.internalId : internalId,
            isDeal: true,
          })
        );
      }
      Toast.show({
        type: "success",
        text1: "Added to your Cart",
        text2: "",
      });
      navigation.navigate(Routes.Cart);
    }
  };

  const onIncrement = () => {
    dispatch(
      updateDealCount({
        totalCount: dealsArray?.totalCount + 1,
      })
    );
  };

  const onDecrement = () => {
    if (dealsArray?.totalCount > 1) {
      dispatch(
        updateCount({
          totalCount: dealsArray?.totalCount - 1,
        })
      );
    }
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ImageBackground
        style={styles.bannerImageContainer}
        source={require("../../assets/images/sub.png")}
      >
        <View style={styles.cancelIconContainer}>
          <CancelIcon
            name="close-outline"
            color={colors.primaryColor}
            size={25}
            style={styles.cancelIcon}
            onPress={() => navigation.goBack()}
          />
        </View>
      </ImageBackground>
      <ScrollView>
        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : (
          <>
            <View style={styles.headerContainer}>
              <View style={styles.generalFlex}>
                <Heading title={HeadingText} style={styles.heading} />
                <View style={styles.subTitleContainer}>
                  <Text style={styles.subTitle}>{calculateProductPrice()}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.minContainer}>
                  <TouchableOpacity
                    style={styles.minButton}
                    onPress={onDecrement}
                  >
                    <Icon
                      name={"minus"}
                      size={20}
                      color={colors.primaryColor}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{dealsArray?.totalCount}</Text>
                </View>
                <View style={styles.maxContainer}>
                  <TouchableOpacity
                    style={styles.maxButton}
                    onPress={onIncrement}
                  >
                    <Icon name={"plus"} size={20} color={colors.primaryColor} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* <View style={styles.descriptionContainer}>
          <Text style={styles.description} numberOfLines={3}>
            {getDescription()}
          </Text>
        </View> */}
            {/* <View style={{ flexDirection: "row" }}>
              {dealsArray?.products?.map((item: Product) => (
                <ScrollView>
                  <SelectionModifier product={item} key={item.productId} />
                </ScrollView>
              ))}
            </View> */}
            {dealsArray?.products?.map((item: Product) => (
              <>
                <SelectionModifier product={item} key={item.productId} />
                {item?.productModifier?.length ? (
                  <>
                    <CustomDeals
                      productId={item?.productId}
                      isEdited={isEdited ?? false}
                      value={value}
                      setValue={setValue}
                      isDeal
                      dealProduct={item}
                    />
                  </>
                ) : (
                  <Text>{item?.name}</Text>
                )}
              </>
            ))}
          </>
        )}
      </ScrollView>
      <View style={styles.footerContainer}>
        <CustomButton
          label="Add to Cart"
          styles={styles.button}
          onClick={addDeal}
        />
      </View>
    </SafeAreaView>
  );
};

export default Deals;
