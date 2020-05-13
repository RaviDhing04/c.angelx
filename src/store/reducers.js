const initialState = {
  homePage: {
    latestProducts: {},
  },
  productDetailsPage: {
    selectedProductDetails: {},
    selectedProductId : ''
  },
  cartDetailsPage: {
    cartItems: {},
    cartProductDetails: {}
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
        case "CART_DETAILS":
      return {
        ...state,
        cartDetailsPage: {
          cartItems: value.payload.cartDetails,
          cartProductDetails: value.payload.productDetails
        }
      };
    default:
      return state;
  }
};
