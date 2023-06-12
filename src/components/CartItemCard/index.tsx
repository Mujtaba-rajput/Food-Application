import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import styles from "./cartItemCard.style";
import Icon from "react-native-vector-icons/AntDesign";
import Icon1 from "react-native-vector-icons/Ionicons";
import colors from "../../utils/colors";
import { DecoratedPrice, calculateModifierPrice } from "../../utils/helper";
import {
  addToCart,
  deleteFormCart,
  removeFromCart,
} from "../../screens/Cart/cart.slice";
import { useAppDispatch } from "../../hooks/redux";
import Swipeable from "react-native-swipeable";
import metrics from "../../utils/mertrics";
import { Product, DealProduct } from "../../screens/Deals/type";

type CartItemCardType = {
  product: DealProduct;
};

const CartItemCard = ({ product }: CartItemCardType) => {
  const dispatch = useAppDispatch();

  const leftContent = <Text>Pull to activate</Text>;

  const onRemoveFromCart = () => {
    dispatch(
      removeFromCart({
        id: product.internalId,
      })
    );
  };

  const onDeleteFromCart = () => {
    dispatch(
      deleteFormCart({
        id: product.internalId,
      })
    );
  };

  const onAddProductToCart = () => {
    dispatch(addToCart(product));
  };

  const calculatePrice = () => {
    if (product.isDeal) {
      const modifierPrice = product?.products.reduce(
        (total: number, item: Product) => {
          total = total + calculateModifierPrice(item.modifire);
          return total;
        },
        0
      );
      return DecoratedPrice(modifierPrice + parseFloat(product?.inStorePrice));
    }
    return DecoratedPrice(
      calculateModifierPrice(product?.modifire) +
        parseFloat(product?.inStorePrice)
    );
  };

  const rightButtons = [
    <View style={styles.swipeContainer}>
      <TouchableOpacity style={styles.deleteWrapper} onPress={onDeleteFromCart}>
        <Icon1 name={"trash-outline"} size={22} color={colors.white} />
      </TouchableOpacity>
    </View>,
  ];
  return (
    <Swipeable rightButtons={rightButtons}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/pizza.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.text}>{product?.name}</Text>
            <Text style={styles.description}>{product?.description}</Text>
            <Text style={styles.text}>{calculatePrice()}</Text>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.innerfooter}>
            <View style={styles.flex}>
              <TouchableOpacity
                style={styles.circle}
                onPress={onRemoveFromCart}
              >
                <Icon name={"minus"} size={15} color={colors.textColor} />
              </TouchableOpacity>
            </View>
            <View style={styles.quantityContainer}>
              <Text style={styles.quantity}>{product?.totalCount}</Text>
            </View>
            <View style={styles.flex}>
              <TouchableOpacity
                style={styles.circle1}
                onPress={onAddProductToCart}
              >
                <Icon name={"plus"} size={15} color={colors.textColor} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default CartItemCard;
