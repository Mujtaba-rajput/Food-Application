import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  Platform,
  TouchableOpacity,
} from "react-native";
import styles from "./home.style";
import { CategoryCard, Heading } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getStorageData } from "../../service/asyncStorage";
import { useHeaderHeight } from "@react-navigation/elements";
import { useFetchMenuQuery } from "../Outlets/outlets.api";
import { GetRandomCardTheme } from "./RandomThemes";
import { setCategoryId } from "./home.slice";
import Carousel from "react-native-snap-carousel";
import metrics from "../../utils/mertrics";
import { useFetchFeatureProductsQuery } from "./home.api";
import {
  DecoratedPrice,
  GroupByModifire,
  isCompulsory,
  IMAGE_BASE,
} from "../../utils/helper";
import { addToCart } from "../Cart/cart.slice";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { setProductId } from "../SubCategory/subCategory.slice";

const Home = () => {
  const dispatch = useAppDispatch();
  const [userToken, setUserToken] = useState();
  const headerHeight = useHeaderHeight();
  const navigation: any = useNavigation();
  const { data } = useFetchMenuQuery("");
  const menu = data?.data ?? [];
  const { store, orderType } = useAppSelector((state) => state.orderType);
  const { user, guest, userAddress } = useAppSelector((state) => state.login);
  const id = store?.id;
  const { data: feature, isLoading } = useFetchFeatureProductsQuery(id, {
    skip: !id,
  });
  const featuredProducts: any = feature?.data ?? [];

  const addToCartHandler = (id: number) => () => {
    const [product] = featuredProducts.filter((item: any) => item.id === id);
    const internalId = isCompulsory(product?.productModifier)
      ? `custom${Math.floor(Math.random() * 100)}_${product?.id}`
      : `product_${product.id}`;

    if (product?.productModifier?.length > 0) {
      dispatch(
        addToCart({
          internalId,
          modifire: GroupByModifire(product?.productModifier, true),
          noModifierIncluded: true,
          ...product,
        })
      );
    } else {
      dispatch(addToCart({ internalId, ...product, noModifierIncluded: true }));
    }
    Toast.show({
      type: "success",
      text1: "Added to your Cart",
      text2: "",
    });
  };

  const doCustomizeHandler = (id: number) => () => {
    const [product] = featuredProducts.filter((item: any) => item.id === id);
    dispatch(setProductId(id));
    navigation.navigate(Routes.SubCategoryDetails);
  };

  const FeaturedItems =
    featuredProducts?.length > 3
      ? featuredProducts?.slice(0, 4)
      : featuredProducts;

  const renderItem = ({ item, index }: any) => {
    return (
      <View style={styles.bannerWrapper}>
        <View style={styles.leftBanner}>
          <View>
            <Text style={styles.leftTitle}>{item.name}</Text>
            <Text style={styles.leftSubtitle}>{item.description}</Text>
            <Text style={styles.leftDescription}>
              {DecoratedPrice(item.inStorePrice)}
            </Text>
          </View>
          <View style={styles.customize}>
            {item?.productModifier?.length > 0 ? (
              <TouchableOpacity
                style={styles.leftButton}
                onPress={doCustomizeHandler(item.id)}
              >
                <Text style={styles.leftButtonText}>Customize</Text>
              </TouchableOpacity>
            ) : null}

            {item?.productModifier?.length > 0 &&
            isCompulsory(item.productModifier) ? null : (
              <TouchableOpacity
                style={styles.leftButtonWithBackground}
                onPress={addToCartHandler(item.id)}
              >
                <Text style={styles.orderNow}>Order Now</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.advertiseImageContainer}>
          <Image
            source={
              item.imageUrl
                ? { uri: `${IMAGE_BASE}${item.imageUrl}` }
                : require("../../assets/images/Img.png")
            }
            style={styles.advertiseImageSize}
          />
        </View>
      </View>
    );
  };

  useEffect(() => {
    try {
      getStorageData("token").then((response: any) => {
        setUserToken(response);
      });
    } catch {}
  }, []);

  const checkIfGuestExists =
    userToken && user?.FirstName
      ? user.FirstName
      : userToken && !user?.FirstName && guest?.id
      ? "Guest"
      : "";

  const newRef = useRef();

  return (
    <View style={styles.SafeAreaView}>
      <View
        style={[
          styles.bannerImageContainer,
          {
            paddingVertical:
              Platform.OS === "android" ? 0 : headerHeight / 2 - 20,
          },
        ]}
      >
        <View style={styles.generalPadding}>
          <Text style={styles.title}>Good morning {checkIfGuestExists}!</Text>
        </View>
        <View style={styles.subTitleView}>
          <Text style={styles.subTitle}>
            {orderType === "delivery" ? "Delivering to" : "Pickup from"}
          </Text>
        </View>
        <View style={styles.locationTitleView}>
          {orderType === "delivery" ? (
            <Text style={styles.locationTitle}>
              {userAddress?.address ? userAddress?.address : ""}
            </Text>
          ) : (
            <Text style={styles.locationTitle}>
              {store?.name ? store?.name : "XYZ Branch"}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.advertiseTitle}>
        <Heading title="FEATURED SPECIALS" style={styles.advertiseTitleText} />
      </View>
      {featuredProducts.length > 0 ? (
        <Carousel
          data={FeaturedItems}
          renderItem={renderItem}
          sliderWidth={metrics.screenWidth}
          itemWidth={metrics.screenWidth}
          autoplay={true}
          enableMomentum={false}
          lockScrollWhileSnapping={true}
          autoplayInterval={3000}
        />
      ) : (
        <View style={styles.staticWrapper}>
          <Image
            source={require("../../assets/images/Img.png")}
            style={styles.staticFeature}
          />
        </View>
      )}
      <View style={styles.menuPadding}>
        <Heading title="MENU" style={styles.menu} />
      </View>

      <FlatList
        contentContainerStyle={styles.flatlistContainerStyle}
        data={menu}
        renderItem={({ item, index }) => (
          <CategoryCard
            key={index}
            title={item.name}
            onPress={() => {
              dispatch(setCategoryId(item.id));
              navigation.navigate(Routes.SubCategory);
            }}
            image={require("../../assets/images/pizza.png")}
            backgroundColor={GetRandomCardTheme().background}
            index={index}
          />
        )}
        keyExtractor={(item: any) => item.id}
        numColumns={3}
      />
    </View>
  );
};

export default Home;
