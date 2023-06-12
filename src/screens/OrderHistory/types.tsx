export interface OrderInterface {
  id: number;
  code: number;
  creationTime: string;
  date: string;
  orderStatus: string;
  orderDelivery: {
    address: string;
  };
  orderPayments: Array<{
    deliveryCharges: string;
    discount: string;
    subTotal: string;
    tax: string;
    totalAmount: string;
  }>;
  orderProducts: Array<{
    id: number;
    price: string;
    quantity: number;
    orderProductModifiers: Array<{
      orderProductModifiersValue: {
        price: string;
      };
    }>;
    product: {
      name: string;
      inStorePrice: string;
    };
  }>;
  orderStatuses: {
    status: string;
  };
  orderTypeValue: string;
  store: {
    id: number;
    name: string;
  };
}

export interface OrderEvent {
  orderCode: string;
  orderStatus: string;
  id: string;
}

export type orderTypeKeys = "OrderCompleted" | "pending";
