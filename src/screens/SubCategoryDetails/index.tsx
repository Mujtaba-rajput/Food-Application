import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import styles from "./subCategoryDetails.style";
import {
  Heading,
  CustomButton,
  CustomProductCard,
  Loader,
} from "../../components";
import colors from "../../utils/colors";
import Icon from "react-native-vector-icons/AntDesign";
import CancelIcon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { useFetchProductByIdQuery } from "../Home/home.api";
import { setProduct, updateCount } from "./subCategoryDetail.slice";
import _ from "lodash";
import {
  DecoratedPrice,
  calculateModifierPrice,
  canModifierGetSelected,
  getIncompleteModifier,
  getSelectedCount,
} from "../../utils/helper";
import { addToCart, deleteFormCart } from "../Cart/cart.slice";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const isEdited = false;
const SubCategoryDetails = () => {
  const { product_id } = useAppSelector((state) => state.subCategory);
  const {
    data: ProductData,
    isSuccess,
    isLoading,
  } = useFetchProductByIdQuery(product_id);
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();

  const productName = ProductData?.data?.name;
  const productDescription = ProductData?.data?.category?.description;
  const productPrice = Number(ProductData?.data?.inStorePrice).toFixed(2);

  const { mergedItems } = useAppSelector((state) => state.cart);
  const filteredProduct =
    isEdited && Object.keys(mergedItems)?.length ? mergedItems[product_id] : {};
  const { product: currentProduct } = useAppSelector((state) => state.product);
  const { data } = isEdited
    ? { data: filteredProduct }
    : ProductData ?? { data: {} };
  const [value, setValue] = useState(0);

  const GroupByModifire = (
    productModifier: Array<object>,
    noModifier?: boolean
  ) => {
    return _.mapValues(
      _.groupBy(productModifier, "modifier.name"),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mod: any) => {
        return {
          ...mod[0],
          maxSelectionAllowed: mod[0]?.modifier?.maxSelectionAllowed || 1,
          compulsory: mod[0].modifier.compulsory === 1,
          productModifierValues: mod[0]?.productModifierValues?.map(
            (
              prod: {
                modifierValue: { modifierSubValue: Array<{ id: number }> };
              },
              index: number
            ) => {
              const isOptional = mod[0].modifier.compulsory === 0;
              return {
                ...prod,
                selected: !isOptional && index === 0 && !noModifier,
                modifierValue: {
                  ...prod.modifierValue,
                  modifierSubValue: prod.modifierValue.modifierSubValue.map(
                    (item: { id: number }, index: number) =>
                      index === 0 ? { ...item, selected: true } : item
                  ),
                },
              };
            }
          ),
        };
      }
    );
  };

  const GetTabsData = () => {
    if (isEdited) {
      return data?.modifire ?? GroupByModifire(data?.productModifier);
    } else {
      return GroupByModifire(data?.productModifier);
    }
  };

  const TabsData = GetTabsData();
  const TabsDataKeys = TabsData ? Object.keys(TabsData) : [""];

  useEffect(() => {
    if (Object.keys(filteredProduct).length > 0 && isEdited) {
      dispatch(setProduct({ ...filteredProduct, modifire: TabsData }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProduct]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setProduct({ ...data, modifire: TabsData, totalCount: 1 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onSelectModifire = (current: string, id: number | string) => {
    // const isOptional = product.modifire[current].modifier.compulsory === 0;

    // if (isOptional) {
    // FOR OPTIONAL VALUE SELECTIONS
    const maxSelection = currentProduct.modifire[current].maxSelectionAllowed;
    const selectedCount = currentProduct.modifire[
      current
    ]?.productModifierValues.reduce(getSelectedCount, 0);
    if (
      canModifierGetSelected({
        selectedId: id,
        productModifierValues:
          currentProduct.modifire[current]?.productModifierValues,
        maxLimitReach: maxSelection === selectedCount,
      })
    ) {
      const updatedModifire = {
        ...currentProduct.modifire[current],
        noModifierIncluded: false,
        productModifierValues: currentProduct.modifire[
          current
        ]?.productModifierValues?.map(
          (mod: { id: number; selected: boolean }) => {
            if (id === mod.id) {
              return {
                ...mod,
                selected: !mod?.selected,
              };
            } else {
              return mod;
            }
          }
        ),
      };
      const modifire = {
        ...currentProduct.modifire,
        [`${current}`]: updatedModifire,
      };
      dispatch(setProduct({ ...currentProduct, modifire }));
    } else {
      Toast.show({
        type: "error",
        text1: "Maximum limit reached",
        text2: "",
      });
    }
  };

  const subChildChange = (
    subId: number | string,
    current: string,
    modId: React.Key | number
  ) => {
    const updatedModifire = {
      ...currentProduct.modifire[current],
      productModifierValues: currentProduct.modifire[
        current
      ]?.productModifierValues?.map(
        (mod: {
          id: React.Key | null | undefined;
          modifierValue: {
            name: string;
            modifierSubValue: { name: string; id: number }[];
          };
          selected?: boolean;
        }) => {
          return {
            ...mod,
            modifierValue: {
              ...mod.modifierValue,
              modifierSubValue:
                modId === mod.id
                  ? mod.modifierValue.modifierSubValue.map(
                      (subModifierChild: { id: number }) => {
                        return {
                          ...subModifierChild,
                          selected: subModifierChild.id === subId,
                        };
                      }
                    )
                  : mod.modifierValue.modifierSubValue,
            },
          };
        }
      ),
    };
    const modifire = {
      ...currentProduct.modifire,
      [`${current}`]: updatedModifire,
    };
    const updatedProduct = { ...currentProduct, modifire };
    dispatch(setProduct(updatedProduct));
  };

  const onAddToCart = async () => {
    const internalId = `custom${Math.floor(Math.random() * 100)}_${
      currentProduct?.id
    }`;

    const index = getIncompleteModifier(currentProduct.modifire);
    if (isEdited && index === -1)
      await dispatch(deleteFormCart({ id: currentProduct?.internalId }));
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
      for (let i = 0; i < currentProduct.totalCount; i++) {
        await dispatch(
          addToCart({
            internalId: isEdited ? currentProduct.internalId : internalId,
            ...currentProduct,
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
      updateCount({
        totalCount: currentProduct?.totalCount + 1,
      })
    );
  };

  const onDecrement = () => {
    if (currentProduct?.totalCount > 1) {
      dispatch(
        updateCount({
          totalCount: currentProduct?.totalCount - 1,
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
                <Heading title={productName} style={styles.heading} />
                <View style={styles.subTitleContainer}>
                  <Text style={styles.subTitle}>
                    {DecoratedPrice(
                      calculateModifierPrice(currentProduct?.modifire) +
                        parseInt(productPrice)
                    )}
                  </Text>
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
                  <Text style={styles.text}>{currentProduct?.totalCount}</Text>
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
            <View style={styles.descriptionContainer}>
              <Text style={styles.description} numberOfLines={3}>
                {productDescription}
              </Text>
            </View>

            {TabsDataKeys?.map((tab: string, index: number) => {
              return (
                <View style={styles.tabWrapper}>
                  <Text key={tab} style={styles.tabView}>
                    {`Select Your ${tab}`}
                  </Text>
                  {currentProduct.modifire ? (
                    <Text style={styles.tabDetail}>
                      {currentProduct.modifire[tab]?.compulsory
                        ? `${
                            currentProduct.modifire[tab]?.maxSelectionAllowed ||
                            0
                          } Required`
                        : `Optional (Maximum Allowed ${
                            currentProduct.modifire[tab]?.maxSelectionAllowed ||
                            0
                          })`}
                    </Text>
                  ) : null}
                  {Object.keys(currentProduct).length > 0 &&
                    currentProduct?.modifire[tab]?.productModifierValues?.map(
                      (modItem: {
                        id: React.Key;
                        modifierValue: {
                          modifierSubValue: { name: string; id: number }[];
                          inStorePrice: string | number;
                        };
                        name: string;
                        selected: boolean;
                      }) => {
                        return (
                          <View>
                            <CustomProductCard
                              key={modItem?.id}
                              description={modItem?.name}
                              selected={modItem?.selected}
                              price={DecoratedPrice(
                                modItem?.modifierValue?.inStorePrice
                              )}
                              onClick={() => onSelectModifire(tab, modItem?.id)}
                              modifierSubValue={
                                modItem?.modifierValue?.modifierSubValue || []
                              }
                              isSubModifier={Boolean(
                                modItem?.modifierValue?.modifierSubValue?.length
                              )}
                              onSubChildChange={(e: any) => {
                                subChildChange(e?.id, tab, modItem?.id);
                              }}
                            />
                          </View>
                        );
                      }
                    )}
                </View>
              );
            })}
          </>
        )}
      </ScrollView>
      <View style={styles.footerContainer}>
        <CustomButton
          label="Add to Cart"
          styles={styles.button}
          onClick={onAddToCart}
        />
      </View>
    </SafeAreaView>
  );
};

export default SubCategoryDetails;
