import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
} from "react-native";
import styles from "./subCategory.style";
import {
  SubCategoryCard,
  CustomAddToCart,
  Loader,
  Heading,
} from "../../components";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { setProductId } from "./subCategory.slice";
import {
  useFetchCategoryByIdQuery,
  useFetchStoreCategoryProductsQuery,
} from "../Home/home.api";
import {
  DecoratedPrice,
  GroupByModifire,
  IMAGE_BASE,
  isCompulsory,
} from "../../utils/helper";
import { addToCart } from "../Cart/cart.slice";

const SubCategory = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const [showCart, setShowCart] = useState(false);
  const { categoryId } = useAppSelector((state) => state.home);
  const { totalItems, totalAmount } = useAppSelector((state) => state.cart);
  const { store } = useAppSelector((state) => state.orderType);
  const { data: category } = useFetchCategoryByIdQuery(categoryId);
  const queryValues = {
    categoryId: categoryId,
    storeId: store?.id,
  };
  const { data, isLoading } = useFetchStoreCategoryProductsQuery(queryValues, {
    skip: !store?.id,
  });
  const products = data?.data ? data?.data?.products : [];
  const deals = data?.data?.deals ?? [];

  const Category = category?.data
    ? category?.data
    : {
        name: "",
        description: "",
      };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ImageBackground
        style={styles.bannerImageContainer}
        imageStyle={{ opacity: 1 }}
        source={require("../../assets/images/sub.png")}
      >
        <View style={styles.iconContainer}>
          <Icon
            name="chevron-back-outline"
            color={colors.white}
            size={25}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{Category?.name}</Text>
        </View>
      </ImageBackground>
      <ScrollView>
        {isLoading && <Loader isLoading={isLoading} />}
        <View style={styles.generalPadding} />
        {!isLoading && products.length === 0 ? (
          <View style={styles.noProductWrapper}>
            <Text style={styles.noProductMesg}>
              No product available under this category
            </Text>
          </View>
        ) : (
          <>
            {!isLoading && <Heading title="Products" style={styles.header} />}
            <FlatList
              contentContainerStyle={styles.flatlistContainerStyle}
              data={products}
              renderItem={({ item, index }) => (
                <SubCategoryCard
                  title={item.name}
                  index={index}
                  description={item.description}
                  price={DecoratedPrice(item.inStorePrice)}
                  modifier={item.productModifier.length > 0 ? true : false}
                  compulsoryModifier={
                    item.productModifier.length > 0 &&
                    item.productModifier[0].modifier.compulsory
                      ? true
                      : false
                  }
                  onAddToCart={() => {
                    const internalId =
                      item?.productModifier.length > 0
                        ? `custom${Math.floor(Math.random() * 100)}_${item?.id}`
                        : `product_${item.id}`;

                    if (item?.productModifier.length > 0) {
                      dispatch(
                        addToCart({
                          internalId,
                          modifire: GroupByModifire(
                            item?.productModifier,
                            true
                          ),
                          noModifierIncluded: true,
                          ...item,
                        })
                      );
                      setShowCart(true);
                    } else {
                      dispatch(
                        addToCart({
                          internalId,
                          ...item,
                          noModifierIncluded: true,
                        })
                      );
                      setShowCart(true);
                    }
                  }}
                  image={
                    item.imageUrl
                      ? { uri: `${IMAGE_BASE}${item.imageUrl}` }
                      : require("../../assets/images/pizza.png")
                  }
                  onPressCustomise={() => {
                    if (item.productModifier.length > 0) {
                      dispatch(setProductId(item.id));
                      navigation.navigate(Routes.SubCategoryDetails);
                    } else return;
                  }}
                />
              )}
              keyExtractor={(item: any) => item.id}
              numColumns={1}
            />
          </>
        )}

        {!isLoading && deals.length === 0 ? (
          <View style={styles.noProductWrapper}>
            <Text style={styles.noProductMesg}>
              No deals available under this category
            </Text>
          </View>
        ) : (
          <>
            {!isLoading && <Heading title="Deals" style={styles.header} />}
            <FlatList
              contentContainerStyle={styles.flatlistContainerStyle}
              data={deals}
              renderItem={({ item, index }) => (
                <SubCategoryCard
                  title={item.name}
                  description={item.description}
                  index={index}
                  price={DecoratedPrice(item.inStorePrice)}
                  dealItems={item?.dealDetails?.dealDetailComponent}
                  modifier={
                    deals.length > 0 || item.productModifier.length > 0
                      ? true
                      : false
                  }
                  compulsoryModifier={
                    deals.legnth > 0 ||
                    (item?.productModifier?.length > 0 &&
                      isCompulsory(item?.productModifier))
                      ? false
                      : true
                  }
                  onAddToCart={() => {
                    const internalId =
                      item?.productModifier.length > 0
                        ? `custom${Math.floor(Math.random() * 100)}_${item?.id}`
                        : `product_${item.id}`;

                    if (item?.productModifier.length > 0) {
                      dispatch(
                        addToCart({
                          internalId,
                          modifire: GroupByModifire(
                            item?.productModifier,
                            true
                          ),
                          noModifierIncluded: true,
                          ...item,
                        })
                      );
                      setShowCart(true);
                    } else {
                      dispatch(
                        addToCart({
                          internalId,
                          ...item,
                          noModifierIncluded: true,
                        })
                      );
                      setShowCart(true);
                    }
                  }}
                  image={
                    item.imageUrl
                      ? { uri: `${IMAGE_BASE}${item.imageUrl}` }
                      : require("../../assets/images/pizza.png")
                  }
                  onPressCustomise={() => {
                    dispatch(setProductId(item.id));
                    navigation.navigate(Routes.Deals);
                  }}
                />
              )}
              keyExtractor={(item: any) => item.id}
              numColumns={1}
            />
          </>
        )}
      </ScrollView>
      {showCart && (
        <View style={styles.footerPadding}>
          <CustomAddToCart
            totalCount={`${totalItems} Item`}
            totalPrice={totalAmount}
            onPress={() => navigation.navigate(Routes.Cart)}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SubCategory;
