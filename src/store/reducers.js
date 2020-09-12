const initialState = {
  homePage: {
    latestProducts: {},
    sponsoredProducts: {},
    trendingProducts: {},
    wishlistProducts: {},
    followedMerchants: [],
    searchCategories: [],
    userLinkCount: {},
    cartCount: 0
  },
  merchantHomePage: {
    merchantAllProducts: {},
    followedMerchants: []
  },
  productDetailsPage: {
    selectedProductDetails: {},
    selectedProductId: ""
  },
  cartDetailsPage: {
    cartItems: {}
  },
  contactPage: {
    contacts: [],
    searchedContact: null
  },
  ordersListPage: {
    orderItems: {},
    orderProductDetails: {}
  },
  ordersListMerchantPage: {
    orderItems: {},
  },
  viewAllProductPage: {
    products: {}
  },
  manageBusiness: {
    allBusiness: [],
    selectedBusiness: null,
    selectedBusinessDetails: null,
    allProducts: [],
    allCampaigns: [],
    allCoupons: [],
    selectedRow: null,
    allPatrons: [],
    registerBusinessMasterData: null,
    inventoryMasterData: null
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
    case "SPONSORED_PRODUCTS":
      return {
        ...state,
        homePage: {
          ...state.homePage,
          sponsoredProducts: value.payload
        }
      };
    case "TRENDING_PRODUCTS":
      return {
        ...state,
        homePage: {
          ...state.homePage,
          trendingProducts: value.payload
        }
      };
    case "WISHLIST_PRODUCTS":
      return {
        ...state,
        homePage: {
          ...state.homePage,
          wishlistProducts: value.payload
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
        merchantHomePage: {
          ...state.merchantHomePage,
          followedMerchants: value.payload
        }
      };
    case "USER_LINKS_COUNT":
      return {
        ...state,
        homePage: {
          ...state.homePage,
          userLinkCount: value.payload
        }
      };
    case "CART_COUNT":
      return {
        ...state,
        homePage: {
          ...state.homePage,
          cartCount: value.payload
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
    case "SELECTED_BUSINESS_DETAILS":
      return {
        ...state,
        manageBusiness: {
          ...state.manageBusiness,
          selectedBusinessDetails: value.payload
        }
      };
    case "REGISTER_BUSINESS_MASTERDATA":
      return {
        ...state,
        manageBusiness: {
          ...state.manageBusiness,
          registerBusinessMasterData: value.payload
        }
      };
    case "INVENTORY_MASTERDATA":
      return {
        ...state,
        manageBusiness: {
          ...state.manageBusiness,
          inventoryMasterData: value.payload
        }
      };
    case "SELECTED_BUSINESS":
      return {
        ...state,
        manageBusiness: {
          ...state.manageBusiness,
          selectedBusiness: value.payload
        }
      };
    case "SELECTED_BUSINESS_BANNER":
      return {
        ...state,
        manageBusiness: {
          ...state.manageBusiness,
          selectedBusiness: {
            ...state.manageBusiness.selectedBusiness,
            BannerImageURL: value.payload
          }
        }
      };
    case "MERCHANT_ALL_PRODUCTS":
      return {
        ...state,
        manageBusiness: {
          ...state.manageBusiness,
          allProducts: value.payload
        }
      };
    case "MERCHANT_ALL_CAMPAIGNS":
      return {
        ...state,
        manageBusiness: {
          ...state.manageBusiness,
          allCampaigns: value.payload
        }
      };
    case "MERCHANT_ALL_COUPONS":
      return {
        ...state,
        manageBusiness: {
          ...state.manageBusiness,
          allCoupons: value.payload
        }
      };
    case "MERCHANT_ALL_PATRONS":
      return {
        ...state,
        manageBusiness: {
          ...state.manageBusiness,
          allPatrons: value.payload
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
          orderItems: value.payload,
        }
      };
      case "ORDER_DETAILS_MERCHANT":
        return {
          ...state,
          ordersListMerchantPage: {
            orderItems: value.payload,
          }
        };
    case "SET_ACTIVE_CURRENCY":
      return {
        ...state,
        common: {
          activeCurrency: value.payload
        }
      };
    case "SET_SELECTED_ROW":
      return {
        ...state,
        manageBusiness: {
          ...state.manageBusiness,
          selectedRow: value.payload
        }
      };
    default:
      return state;
  }
};
