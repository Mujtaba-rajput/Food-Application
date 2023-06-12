import React, { useEffect } from "react";
import { Text, Image, View, TouchableOpacity, FlatList } from "react-native";
import styles from "./customDeals.style";
import fonts from "../../utils/fonts";
import colors from "../../utils/colors";
import metrics from "../../utils/mertrics";
import { CustomButton, CustomDropdown, CustomProductCard } from "..";
import {
  DecoratedPrice,
  GroupByModifire,
  canModifierGetSelected,
  getCurrentProduct,
  getSelectedCount,
} from "../../utils/helper";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useFetchProductByIdQuery } from "../../screens/Home/home.api";
import {
  ModifierI,
  Product,
  ProductModifiers,
  subKeys,
} from "../../screens/Deals/type";
import {
  setDeals,
  setProduct,
} from "../../screens/SubCategoryDetails/subCategoryDetail.slice";
import { Toast } from "react-native-toast-message/lib/src/Toast";

type CustomDealsType = {
  description?: string;
  calories?: string;
  image?: string;
  selected?: boolean;
  price?: string;
  onClick?: () => void;
  modifierSubValue?:
    | Array<{
        name: string;
        id: number;
        active?: number;
        cost?: string | number;
        deliveryPrice?: string | number;
        inStorePrice?: string | number;
      }>
    | [];
  isSubModifier?: boolean;
  onSubChildChange?: any;
};

const CustomDeals = ({
  productId,
  isEdited = false,
  value,
  setValue,
  isDeal,
}: // dealProduct
// dealProduct,
{
  productId: string;
  isEdited?: boolean;
  value: number;
  setValue: (value: number) => void;
  isDeal?: boolean;
  dealProduct?: Product;
}) => {
  const dispatch = useAppDispatch();
  const { data: ProductData, isSuccess } = useFetchProductByIdQuery(productId, {
    skip: isDeal || isEdited,
  });

  const { mergedItems } = useAppSelector((state) => state.cart);
  const filteredProduct =
    isEdited && Object.keys(mergedItems)?.length ? mergedItems[productId] : {};
  const { product, dealsArray } = useAppSelector((state) => state.product);
  const { data } = isEdited
    ? { data: filteredProduct }
    : ProductData ?? { data: {} };
  const [singleDeal = {}] = dealsArray?.products?.filter(
    (item: { productId: string }) => item.productId === productId
  );
  // const [value, setValue] = useState(0);

  const GetTabsData = () => {
    if (isEdited) {
      return data?.modifire ?? GroupByModifire(data?.productModifier);
    } else {
      return GroupByModifire(data?.productModifier);
    }
  };

  const TabsData = isDeal ? singleDeal?.modifire : GetTabsData();
  const TabsDataKeys = TabsData ? Object.keys(TabsData) : [""];

  // useEffect(() => {
  //   if (isDeal) {
  //     dispatch(setProduct({ ...dealProduct, modifire: TabsData }));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isDeal]);

  useEffect(() => {
    if (
      filteredProduct &&
      Object.keys(filteredProduct).length > 0 &&
      isEdited
    ) {
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
    // get current product i.e (deal or product)
    const currentProduct: Product = getCurrentProduct({
      isDeal,
      product,
      singleDeal,
    });
    //max selection of current modifier
    const maxSelection =
      currentProduct?.modifire[current as subKeys].maxSelectionAllowed;
    // selected count of current modifier
    const selectedCount = currentProduct?.modifire[
      current as subKeys
    ]?.productModifierValues.reduce(getSelectedCount, 0);
    if (
      canModifierGetSelected({
        selectedId: id,
        productModifierValues:
          currentProduct?.modifire[current as subKeys]?.productModifierValues,
        maxLimitReach: maxSelection === selectedCount,
      })
    ) {
      const updatedModifire = {
        ...currentProduct?.modifire[current as subKeys],
        noModifierIncluded: false,
        productModifierValues: currentProduct?.modifire[
          current as subKeys
        ]?.productModifierValues?.map((mod: ProductModifiers) => {
          if (id === mod.id) {
            return {
              ...mod,
              selected: !mod?.selected,
            };
          } else {
            return mod;
          }
        }),
      };
      const modifire = {
        ...currentProduct?.modifire,
        [`${current}`]: updatedModifire,
      };
      if (isDeal) {
        const updatedDeals = dealsArray?.products?.map(
          (item: { productId: string; product: Product }) => {
            if (item.productId === productId) {
              return {
                ...item,
                modifire: modifire,
              };
            }
            return item;
          }
        );
        dispatch(setDeals({ ...dealsArray, products: updatedDeals }));
      } else {
        dispatch(setProduct({ ...product, modifire }));
      }
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
    // get current product i.e (deal or product)
    const currentProduct = getCurrentProduct({ isDeal, product, singleDeal });
    const updatedModifire = {
      ...currentProduct?.modifire[current as subKeys],
      noModifierIncluded: false,
      productModifierValues: currentProduct?.modifire[
        current as subKeys
      ]?.productModifierValues?.map((mod: any) => {
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
      }),
    };

    const modifire = {
      ...currentProduct?.modifire,
      [`${current}`]: updatedModifire,
    };
    const updatedProduct = { ...currentProduct, modifire };
    if (isDeal) {
      const updatedDeals = dealsArray?.products?.map(
        (item: { productId: string; product: Product }) => {
          if (item.productId === productId) {
            return {
              ...item,
              ...updatedProduct,
            };
          }
          return item;
        }
      );
      dispatch(setDeals({ ...dealsArray, products: updatedDeals }));
    } else {
      dispatch(setProduct(updatedProduct));
    }
  };

  const getCompulsoryLabel = (modifire: ModifierI, tab: string) => {
    return modifire[tab as subKeys]?.compulsory
      ? `${modifire[tab as subKeys]?.maxSelectionAllowed || 0} Required`
      : `Optional (Maximum Allowed ${
          modifire[tab as subKeys]?.maxSelectionAllowed || 0
        })`;
  };

  const getLabel = (tab: string) => {
    if (isDeal) {
      return getCompulsoryLabel(singleDeal?.modifire, tab);
    }
    return getCompulsoryLabel(product.modifire, tab);
  };

  return (
    <>
      {TabsDataKeys?.map((tab: string, index: number) => {
        return (
          <View style={styles.tabWrapper}>
            <Text key={tab} style={styles.tabView}>
              {`Select Your ${tab}`}
            </Text>
            {singleDeal?.modifire || product?.modifier ? (
              <Text style={styles.tabDetail}>{getLabel(tab)}</Text>
            ) : null}
            {Object.keys(
              getCurrentProduct({ isDeal, product, singleDeal }) &&
                getCurrentProduct({ isDeal, product, singleDeal })
            ).length > 0 &&
              getCurrentProduct({ isDeal, product, singleDeal })?.modifire[
                tab as subKeys
              ]?.productModifierValues?.map(
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
            {/* {Object.keys(currentProduct).length > 0 &&
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
              )} */}
          </View>
        );
      })}
    </>
  );
};

export default CustomDeals;
