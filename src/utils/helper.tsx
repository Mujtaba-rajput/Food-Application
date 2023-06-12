import {
  ModifierI,
  ResultI,
  subKeys,
  NonModifier,
} from "../screens/Checkout/type";
import { discountTypes } from "./constants";
import _ from "lodash";

export const CalculatePrice = (inputArray: Array<any>) => {
  return inputArray?.reduce(
    (total, { inStorePrice, modifire = {}, isDeal, products }) => {
      let modifierTotal = 0;
      if (isDeal) {
        modifierTotal = products?.reduce((count: number, item: Product) => {
          count = count + calculateModifierPrice(item?.modifire);
          return count;
        }, 0);
      } else {
        modifierTotal = calculateModifierPrice(modifire);
      }
      return total + parseInt(inStorePrice) + modifierTotal;
    },
    0
  );
};

export const mergedArr = (inputArray: Array<any>) =>
  inputArray?.reduce((acc, item) => {
    if (!acc[item.internalId]) {
      acc[item.internalId] = { ...item, totalCount: 1 };
    } else {
      acc[item.internalId] = {
        ...acc[item.internalId],
        ...item,
        totalCount: acc[item.internalId].totalCount + 1,
      };
    }
    return acc;
  }, {});

export const splitNumberString = (value: string | number) => {
  return (value as string).split(",");
};

export const DecoratedPrice = (value: string | number) => {
  const Currency = "RS";
  return typeof value === "number"
    ? `${Currency} ${value.toFixed(2)}`
    : `${Currency} ${parseInt(value).toFixed(2)}`;
};

export const calculateModifierPrice = (modifire: any) => {
  const sum = Object.keys(modifire || {}).reduce((acc: number, key: string) => {
    const result = modifire[key].productModifierValues.reduce(
      (
        count: number,
        item: { selected: boolean; modifierValue: { inStorePrice: string } }
      ) => {
        if (item.selected === true) {
          return count + parseInt(item.modifierValue.inStorePrice);
        }
        return count;
      },
      0
    );
    return acc + result;
  }, 0);
  return sum;
};

const isValidDiscountProduct = (
  id: number,
  validProductArray: { [x: string]: any }[],
  key: string | number
) => {
  return validProductArray.some(
    (item: { [x: string]: any }) => item[key] === id
  );
};

interface ApplyDiscountProps {
  inputArray: Array<any>;
  validProductArray: Array<any>;
  type: number;
  amount: number;
  maximumAmount?: number;
  orderTotal: number;
}

// export const applyDiscount = ({
//   inputArray,
//   validProductArray,
//   type,
//   amount,
//   maximumAmount = amount,
//   orderTotal,
// }: ApplyDiscountProps) => {
//   const discountSum = inputArray?.reduce(
//     (total, { inStorePrice, id, modifire = {} }) => {
//       const modifierTotal = calculateModifierPrice(modifire);
//       if (
//         validProductArray.some(
//           ({ productId: validProductId }: { productId: number }) =>
//             validProductId === id
//         )
//       ) {
//         return total + parseInt(inStorePrice) + modifierTotal;
//       }
//       return total;
//     },
//     0
//   );
//   const remainingTotal = orderTotal - discountSum;
//   if (type === discountTypes.fixed) {
//     return { total: remainingTotal + discountSum - amount, discount: amount };
//   }
//   let discountPercentageAmount = (discountSum * amount) / 100;
//   if (discountPercentageAmount > maximumAmount) {
//     discountPercentageAmount = maximumAmount;
//   }
//   return {
//     total: remainingTotal + discountSum - discountPercentageAmount,
//     discount: discountPercentageAmount,
//   };
// };

export const applyDiscount = ({
  inputArray,
  validProductArray,
  type,
  amount,
  maximumAmount = amount,
  orderTotal,
}: ApplyDiscountProps) => {
  const discountSum = inputArray?.reduce(
    (total, { inStorePrice, id, modifire = {}, isDeal, products }) => {
      if (isDeal) {
        if (isValidDiscountProduct(id, validProductArray, "dealId")) {
          const dealModifierSum = products?.reduce(
            (total: number, item: Product) => {
              total = total + calculateModifierPrice(item.modifire);
              return total;
            },
            0
          );
          return total + parseInt(inStorePrice) + dealModifierSum;
        }
        return total;
      } else {
        if (isValidDiscountProduct(id, validProductArray, "ProductId")) {
          const modifierTotal = calculateModifierPrice(modifire);
          return total + parseInt(inStorePrice) + modifierTotal;
        }
        return total;
      }
    },
    0
  );
  const remainingTotal = orderTotal - discountSum;
  if (type === discountTypes.fixed) {
    return { total: remainingTotal + discountSum - amount, discount: amount };
  }
  let discountPercentageAmount = (discountSum * amount) / 100;
  if (discountPercentageAmount > maximumAmount) {
    discountPercentageAmount = maximumAmount;
  }
  return {
    total: remainingTotal + discountSum - discountPercentageAmount,
    discount: discountPercentageAmount,
  };
};

// export const calculateTax = (
//   cartItems: Array<any>,
//   taxRate: number
// ): { tax: number; items: Array<any> } => {
//   let cartItemsWithTax: {
//     tax: number;
//     isDeal: boolean;
//     inStorePrice: string;
//     modifire: {
//       Cheese: { productModifierValues: { id: number; selected: boolean }[] };
//     };
//     productTaxes: { tax: { taxRate: string } }[];
//     products: Product[];
//   }[] = [];
//   const result = cartItems.reduce(
//     (
//       acc: number,
//       item: {
//         isDeal: boolean;
//         inStorePrice: string;
//         modifire: {
//           Cheese: {
//             productModifierValues: Array<{ id: number; selected: boolean }>;
//           };
//         };
//         productTaxes: Array<{ tax: { taxRate: string } }>;
//         products: Product[];
//       }
//     ) => {
//       const isTaxAvailable = item?.productTaxes?.some(
//         (taxItem: { tax: { taxRate: string } }) =>
//           parseFloat(taxItem.tax.taxRate) === taxRate
//       );
//       if (isTaxAvailable) {
//         let modifierPrice = 0;
//         if (item.isDeal) {
//           modifierPrice = item.products?.reduce(
//             (count: number, item: Product) => {
//               count = count + calculateModifierPrice(item?.modifire);
//               return count;
//             },
//             0
//           );
//         } else {
//           modifierPrice = calculateModifierPrice(item.modifire);
//         }
//         const tax =
//           ((parseFloat(item.inStorePrice) + modifierPrice) * taxRate) / 100;
//         const newCartItem = { ...item, tax };
//         cartItemsWithTax = [...cartItemsWithTax, newCartItem];
//         return acc + tax;
//       }
//       cartItemsWithTax = [...cartItemsWithTax, { ...item, tax: 0 }];
//       return acc;
//     },
//     0
//   );
//   return { tax: result, items: cartItemsWithTax };
// };

export const calculateTax = (
  cartItems: Array<any>,
  taxRate: number,
  taxId: number,
  taxName: string
): { tax: number; items: Array<any> } => {
  let cartItemsWithTax: {
    tax: number;
    isDeal: boolean;
    inStorePrice: string;
    modifire: {
      Cheese: { productModifierValues: { id: number; selected: boolean }[] };
    };
    productTaxes: { tax: { taxRate: string } }[];
    products: Product[];
  }[] = [];
  const result = cartItems.reduce(
    (
      acc: number,
      item: {
        isDeal: boolean;
        inStorePrice: string;
        modifire: {
          Cheese: {
            productModifierValues: Array<{ id: number; selected: boolean }>;
          };
        };
        productTaxes: Array<{ tax: { taxRate: string } }>;
        products: Product[];
      }
    ) => {
      const isTaxAvailable = item?.productTaxes?.some(
        (taxItem: { tax: { taxRate: string } }) =>
          parseFloat(taxItem.tax.taxRate) === taxRate
      );
      if (isTaxAvailable) {
        let modifierPrice = 0;
        if (item.isDeal) {
          modifierPrice = item.products?.reduce(
            (count: number, item: Product) => {
              count = count + calculateModifierPrice(item?.modifire);
              return count;
            },
            0
          );
        } else {
          modifierPrice = calculateModifierPrice(item.modifire);
        }
        const tax =
          ((parseFloat(item.inStorePrice) + modifierPrice) * taxRate) / 100;
        const newCartItem = { ...item, tax, taxId, taxName, taxRate };
        cartItemsWithTax = [...cartItemsWithTax, newCartItem];
        return acc + tax;
      }
      cartItemsWithTax = [...cartItemsWithTax, { ...item, tax: 0 }];
      return acc;
    },
    0
  );
  return { tax: result, items: cartItemsWithTax };
};

export const GroupByModifire = (
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
        compulsory: isCompulsory(mod) === true,
        productModifierValues: mod[0]?.productModifierValues?.map(
          (
            prod: {
              modifierValue: { modifierSubValue: Array<{ id: number }> };
            },
            index: number
          ) => {
            const isOptional = isCompulsory(mod) === false;
            return {
              ...prod,
              selected: !isOptional && index === 0 && !noModifier,
              modifierValue: {
                ...prod.modifierValue,
                modifierSubValue: prod?.modifierValue.modifierSubValue.map(
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

export const getProductModifiers = (modifire: ModifierI) => {
  let myResult: Array<ResultI | NonModifier> = [];
  Object.keys(modifire)?.forEach((key) => {
    const productId = modifire[key as "Cheese"].productId;
    const parentModifier =
      modifire[key as "Cheese"]?.productModifierValues.filter(
        (item: { selected: boolean }) => item?.selected
      ) || [];
    let result: ResultI | NonModifier;
    if (parentModifier && parentModifier.length) {
      result = {
        productId,
        modifierId: parentModifier[0]?.modifierValue?.modifierId,
        orderProductModifiersValues: parentModifier.map((item) => {
          const childModifier: Array<{ id?: number; selected?: boolean }> =
            item?.modifierValue?.modifierSubValue?.filter(
              (child: { selected: boolean }) => child?.selected
            ) || [];
          return {
            modifierValueId: item?.modifierValueId,
            price: parseInt(item?.modifierValue.inStorePrice),
            isNestedValue: item?.modifierValue?.modifierSubValue?.length
              ? true
              : false,
            [childModifier?.length ? "orderProductModifiersSubValues" : "data"]:
              item?.modifierValue?.modifierSubValue?.length
                ? {
                    modifierSubValueId:
                      childModifier?.length && childModifier[0].id,
                  }
                : {},
          };
        }),
      };
    } else {
      result = {
        productId,
        modifierId: 1,
      };
    }

    myResult = [...myResult, result];
  });
  return myResult;
};

interface OrderProductProps {
  mergedItems: {
    [key: string]: DealProduct;
  };
  MergeItemsKeys: string[];
}

export const getOrderProducts = ({
  MergeItemsKeys,
  mergedItems,
}: OrderProductProps) => {
  let result: any = [];
  MergeItemsKeys.forEach((key: string) => {
    if (mergedItems[key]?.isDeal) {
      const items = mergedItems[key]?.products.map((product: Product) => {
        return {
          categoryId: product?.category?.id,
          categoryName: product?.category?.name,
          discount: 0,
          dealId: mergedItems[key]?.dealId,
          dealName: mergedItems[key]?.name,
          quantity: mergedItems[key].totalCount,
          productType: 0,
          productId: product.productId,
          price:
            parseFloat(mergedItems[key]?.inStorePrice) +
            mergedItems[key]?.products?.reduce(
              (total: number, item: Product) => {
                total = total + calculateModifierPrice(item.modifire);
                return total;
              },
              0
            ),
          dealTax: Math.floor(
            mergedItems[key]?.totalCount * mergedItems[key]?.tax
          ),
          tax: Math.floor(mergedItems[key]?.totalCount * mergedItems[key]?.tax),
          taxName: mergedItems[key]?.taxName,
          taxId: mergedItems[key]?.taxId,
          taxRate: mergedItems[key]?.taxRate,
          isRefunded: false,
          notes: null,
          orderProductModifiers: !product?.noModifierIncluded
            ? getProductModifiers(product.modifire)
            : [
                {
                  productId: product?.productId,
                  modifierId: 1,
                },
              ],
        };
      });
      result = [...result, ...items];
    } else {
      const item = {
        categoryId: mergedItems[key]?.category?.id,
        categoryName: mergedItems[key]?.category?.name,
        quantity: mergedItems[key].totalCount,
        productType: 0,
        productId: mergedItems[key]?.id,
        price:
          parseFloat(mergedItems[key]?.inStorePrice) +
          calculateModifierPrice(mergedItems[key]?.modifire),
        tax: Math.floor(mergedItems[key]?.totalCount * mergedItems[key]?.tax),
        taxName: mergedItems[key]?.taxName || "",
        taxId: mergedItems[key]?.taxId || "",
        taxRate: mergedItems[key]?.taxRate || "",
        isRefunded: false,
        notes: null,
        orderProductModifiers: !mergedItems[key]?.noModifierIncluded
          ? getProductModifiers(mergedItems[key]?.modifire)
          : [
              {
                productId: mergedItems[key]?.id,
                modifierId: 1,
              },
            ],
      };
      result.push(item);
    }
  });
  return result;
};

interface StoreData {
  data: {
    id: number;
    name: string;
    deliveryCharges: string;
    priceExclusiveTax: boolean;
    storeTaxses: {
      tax: { taxRate: string; taxType: number; id: number; name: string };
    };
  };
}

export const getStoreSuccessData = (result: StoreData) => {
  const data = {
    id: result.data.id,
    name: result.data.name,
  };
  const body = {
    ...data,
    taxRate: parseFloat(result.data.storeTaxses?.tax?.taxRate) || 0,
    taxType: result.data.storeTaxses?.tax?.taxType || 1,
    deliveryCharges: parseFloat(result?.data?.deliveryCharges),
    priceExclusiveTax: result.data.priceExclusiveTax,
    taxId: result.data.storeTaxses?.tax?.id || 0,
    taxName: result.data.storeTaxses?.tax?.name || 0,
  };

  return { data, body };
};

export const getSelectedCount = (acc: number, item: { selected: boolean }) => {
  if (item.selected) acc = acc + 1;
  return acc;
};

interface ModifierSelected {
  selectedId: number | string;
  maxLimitReach: boolean;
  productModifierValues: Array<{
    id: number;
    selected: boolean;
  }>;
}

export const canModifierGetSelected = ({
  selectedId,
  productModifierValues,
  maxLimitReach,
}: ModifierSelected) => {
  const [result = { selected: false }] = productModifierValues?.filter(
    (mod: { id: number; selected: boolean }) => selectedId === mod.id
  );
  return maxLimitReach && !result.selected ? false : true;
};

export const getIncompleteModifier = (modifire: ModifierI) => {
  let dirtyIndex = -1;
  const keys = Object.keys(modifire);
  for (let index = 0; index < keys.length; index++) {
    const selectedCount = modifire[
      keys[index] as subKeys
    ].productModifierValues.reduce(getSelectedCount, 0);
    if (
      selectedCount < modifire[keys[index] as subKeys].maxSelectionAllowed &&
      modifire[keys[index] as subKeys].compulsory
    ) {
      dirtyIndex = index;
      break;
    }
  }
  return dirtyIndex;
};

interface CompulsoryProps {
  modifier: {
    compulsory: boolean;
  };
}

export const isCompulsory = (mod: CompulsoryProps[]) => {
  if (mod && mod.length) {
    return mod[0]?.modifier?.compulsory ? true : false;
  }
  return false;
};

type ProductModifiers = {
  id: string;
  selected: boolean;
  productId: number;
  modifierValueId: number;
  modifierSubValue: Array<{ id: number; selected: boolean }>;
  modifierValue: {
    id: number;
    inStorePrice: string;
    modifierId: number;
    attachment: string | null;
    modifierSubValue: Array<{
      id: number;
      selected: boolean;
      name: string;
    }>;
    modifier: {
      id: number;
    };
  };
  modifier: {
    compulsory: boolean;
  };
  name: string;
};

export interface Product {
  id: string;
  name: string;
  code: string;
  inStorePrice: string;
  description: string;
  totalCount: number;
  internalId: string;
  productModifier: ProductModifiers[];
  modifire: ModifierI;
  imageUrl: string;
  isDeal?: boolean;
  productId: string;
  noModifierIncluded?: boolean;
  tax: number;
  taxName: string;
  taxId: number;
  taxRate: number;
  category: {
    id: number;
    name: string;
  };
}

export interface DealProduct extends Product {
  // name: string;
  // productId: string;
  dealName: string;
  dealId: string;
  // description: string;
  // inStorePrice: string;
  // totalCount: number;
  // internalId: string;
  // isDeal: boolean;
  products: Array<Product>;
  imageUrl: string;
}

interface TabHelperProps {
  isDeal: boolean | undefined;
  product: Product;
  singleDeal: Product;
}

interface TabHelperFunctions extends TabHelperProps {
  current: subKeys;
}

export const getCurrentProduct = ({
  isDeal,
  singleDeal,
  product,
}: TabHelperProps): Product => (isDeal ? singleDeal ?? {} : product ?? {});

export const IMAGE_BASE = "https://product.preview.fridaypos.com";
