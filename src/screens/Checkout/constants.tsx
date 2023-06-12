export const orderPayload = {
  order: {
    source: 2, // 2 stands for mobile app
    isRefunded: false,
  },
  orderPayments: {
    paymentMethodId: 1,
    discount: 0,
    isRefunded: false,
    refundedAmount: 0,
    paidAmount: 0,
    changedAmount: 0,
  },
};

export const defaultCoordinates = {
  lat: 31.5204,
  lng: 74.3587,
  address: "",
};
