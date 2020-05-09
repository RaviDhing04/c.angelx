const initialState = {
  homePage: {
    latestProducts: {},
  },
  productDetailsPage: {
    selectedProductDetails: {},
    selectedProductId : ''
  }
};

export const appReducer = (state = initialState, { type, value }) => {
  switch (type) {
    case "LATEST_PRODUCTS":
      return {
        ...state,
        homePage: {
        latestProducts: value.payload
        }
      };
      case "PRODUCT_DETAILS":
        return {
          ...state,
          productDetailsPage: {
            selectedProductDetails: value.payload,
            selectedProductId: value.id
          }
        };
    default:
      return state;
  }
};
