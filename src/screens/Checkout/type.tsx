export enum subKeys {
  Cheese = "Cheese",
  Sauce = "Sauce",
  Vegetables = "Vegetables",
}
export type ModifierI = {
  [key in subKeys]: {
    compulsory: boolean;
    maxSelectionAllowed: number;
    productId: number;
    productModifierValues: Array<{
      selected: boolean;
      productId: number;
      modifierValueId: number;
      modifierSubValue: Array<{ id: number; selected: boolean }>;
      modifierValue: {
        id: number;
        inStorePrice: string;
        modifierId: number;
        modifierSubValue: Array<{
          id: number;
          selected: boolean;
          name: string;
        }>;
        modifier: {
          id: number;
        };
      };
    }>;
  };
};

export interface ResultI {
  productId: number;
  modifierId: number;
  orderProductModifiersValues: Array<{
    modifierValueId: number;
    price: number;
    isNestedValue: boolean;
    orderProductModifiersSubValues?: {
      modifierSubValueId?: number;
      price?: number;
    };
  }>;
}

export interface NonModifier {
  productId: number;
  modifierId: number;
}
