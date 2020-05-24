const initialState = {
  homePage: {
    latestProducts: {},
    followedMerchants: [],
    searchCategories: []
  },
  MerchantHomePage: {
    merchantAllProducts: {},
    followedMerchants: []
  },
  productDetailsPage: {
    selectedProductDetails: {},
    selectedProductId: ""
  },
  cartDetailsPage: {
    cartItems: []
  },
  contactPage: {
    contacts: [],
    searchedContact: null
  },
  ordersListPage: {
    orderItems: {},
    orderProductDetails: {}
  },
  viewAllProductPage: {
    products: {}
  },
  manageBusiness: {
    allBusiness: [],
    selectedBusiness: {}
  },
  common: {
    activeCurrency: null
  }
};

export const appReducer = (state = initialState, { type, value }) => {
  switch (type) {
    case "LATEST_PRODUCTS":
      return {
        ...state,
        homePage: {
          ...state.homePage,
          latestProducts: value.payload
        }
      };
    case "SEARCH_CATEGORIES":
      return {
        ...state,
        homePage: {
          ...state.homePage,
          searchCategories: value.payload
        }
      };
    case "FOLLOWED_MERCHANTS":
      return {
        ...state,
        homePage: {
          ...state.homePage,
          followedMerchants: value.payload
        },
        MerchantHomePage: {
          ...state.MerchantHomePage,
          followedMerchants: value.payload
        }
      };
    case "All_BUSINESS":
      return {
        ...state,
        manageBusiness: {
          ...state.manageBusiness,
          allBusiness: value.payload
        }
      };
    case "VIEWALL_PRODUCTS":
      return {
        ...state,
        viewAllProductPage: {
          products: value.payload
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
          cartItems: value.payload
        }
      };
    case "ALL_CONTACTS":
      return {
        ...state,
        contactPage: {
          ...state.contactPage,
          contacts: value.payload
        }
      };
    case "SEARCHED_CONTACT":
      return {
        ...state,
        contactPage: {
          ...state.contactPage,
          searchedContact: value.payload
        }
      };
    case "ORDER_DETAILS":
      return {
        ...state,
        ordersListPage: {
          orderItems: value.payload.cartDetails,
          orderProductDetails: value.payload.productDetails
        }
      };
    case "SET_ACTIVE_CURRENCY":
      return {
        ...state,
        common: {
          activeCurrency: value.payload
        }
      };
    default:
      return state;
  }
};
