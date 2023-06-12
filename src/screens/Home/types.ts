export type ProductMinimal = {
  id: string;
  name: string;
  code: string;
  inStorePrice: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productModifier: Array<any>;
};
