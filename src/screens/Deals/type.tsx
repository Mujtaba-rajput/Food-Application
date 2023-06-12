export enum subKeys {
  Cheese = "Cheese",
  Sauce = "Sauce",
  Vegetables = "Vegetables",
}
export type ProductModifiers = {
  id: string;
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
  name: string;
};

export type ModifierI = {
  [key in subKeys]: {
    compulsory: boolean;
    maxSelectionAllowed: number;
    productId: number;
    productModifierValues: Array<ProductModifiers>;
  };
};

export interface Product {
  id: string;
  name: string;
  code: string;
  inStorePrice: string;
  description: string;
  totalCount: number;
  internalId: string;
  productModifier: Array<{ id: number }>;
  modifire: ModifierI;
  imageUrl: string;
  isDeal?: boolean;
  productId: string;
  noModifierIncluded?: boolean;
  tax?: number;
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
