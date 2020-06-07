import httpFetch from "../utils/httpUtils/httpFetch";
import getApiEndPoints from "../utils/httpUtils/apiEndPoints";

export const getLatestProductsWithPagination = (
  body = {}
) => async dispatch => {
  try {
    const response = await httpFetch(
      getApiEndPoints("LatestProductsWithPagination"),
      {
        method: "POST",
        body: body
      }
    );
    if (response && response.result && response.result.data) {
      dispatch({
        type: "LATEST_PRODUCTS",
        value: { payload: response.result.data }
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getLatestProducts = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(
      getApiEndPoints("LatestProductsWithPagination"),
      {
        method: "POST",
        body: body
      }
    );
    if (response && response.result && response.result.data) {
      dispatch({
        type: "VIEWALL_PRODUCTS",
        value: { payload: response.result.data }
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getMerchantAllProducts = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(getApiEndPoints("MerchantAllProducts"), {
      method: "POST",
      body: body
    });
    if (response && response.result && response.result.data) {
      dispatch({
        type: "VIEWALL_PRODUCTS",
        value: { payload: response.result.data }
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getMerchantAllProductsAndSegregate = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(getApiEndPoints("MerchantAllProducts"), {
      method: "POST",
      body: body
    });
    if (response && response.result && response.result.data && response.result.data.Items.length) {
      const [products, campaigns] = segregateProductsAndCampaigns(response.result.data.Items);
      dispatch({
        type: "MERCHANT_ALL_PRODUCTS",
        value: { payload: products }
      });
      dispatch({
        type: "MERCHANT_ALL_CAMPAIGNS",
        value: { payload: campaigns }
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getMerchantAllCoupons = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(getApiEndPoints("MerchantAllCoupons"), {
      method: "POST",
      body: body
    });
    if (response && response.result && response.result.data && response.result.data.Items.length) {
      dispatch({
        type: "MERCHANT_ALL_COUPONS",
        value: { payload: response.result.data.Items }
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const segregateProductsAndCampaigns = (Items) => {
   const out = [[], []];
  Items.forEach((item) => {
   item.IsDonationCampaign.S === 'false' ? out[0].push(item) : out[1].push(item);
  })
  return out;
}

export const getSelectedProductDetails = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(
      getApiEndPoints("SelectedProductDetails"),
      {
        method: "POST",
        body: body
      }
    );
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.data.Item
    ) {
      dispatch({
        type: "PRODUCT_DETAILS",
        value: {
          payload: response.result.data.Item,
          id: response.result.data.Item.ProductId.S
        }
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addNewProduct = (body = {}) => async dispatch => {
  
}

export const getFollowedMerchants = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(getApiEndPoints("FollowedMerchants"), {
      method: "POST",
      body: body
    });
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.message === "Success"
    ) {
      dispatch({
        type: "FOLLOWED_MERCHANTS",
        value: {
          payload: response.result.data.Items
        }
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const registerNewBusiness = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(getApiEndPoints("registerNewBusiness"), {
      method: "POST",
      body: body
    });
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.message === "Success"
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateBusiness = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(getApiEndPoints("updateBusiness"), {
      method: "POST",
      body: body
    });
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.message === "Success"
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const fetchRegisterBusiness = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(getApiEndPoints("BusinessDetails"), {
      method: "POST",
      body: body
    });
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.message === "Success"
    ) {
      dispatch({
        type: "SELECTED_BUSINESS_DETAILS",
        value: {
          payload: response.result.data.Item
        }
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getBusinessDetails = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(getApiEndPoints("BusinessDetails"), {
      method: "POST",
      body: body
    });
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.message === "Success"
    ) {
      dispatch({
        type: "SELECTED_BUSINESS",
        value: {
          payload: response.result.data.Item
        }
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateSelectedBusiness = merchantId => async (
  dispatch,
  getState
) => {
  try {
    const AllBusiness = getState().app.manageBusiness.allBusiness;
    const selectedBusiness = AllBusiness.find(business => {
      return business.MerchantId.S === merchantId;
    });
    if (selectedBusiness) {
      dispatch({
        type: "SELECTED_BUSINESS",
        value: {
          payload: selectedBusiness
        }
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const fetchAllBusiness = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(getApiEndPoints("AllBusiness"), {
      method: "POST",
      body: body
    });
    // const response = {"result":{"data":{"Items":[{"OrgName":{"S":"ProdTest34"},"MerchantId":{"S":"1589982971166"},"PatronId":{"S":"69116697064443"},"BusinessHandle":{"S":"ProdTest1@DeleteLater"},"BusinessType":{"S":"NPO"}},{"OrgName":{"S":"ProdTest36"},"MerchantId":{"S":"1589856527259"},"PatronId":{"S":"69116697064443"},"BusinessHandle":{"S":"ProdTest1@DeleteLater"},"BusinessType":{"S":"Retail"}},{"OrgName":{"S":"ProdTest35"},"MerchantId":{"S":"1589856430567"},"PatronId":{"S":"69116697064443"},"BusinessHandle":{"S":"ProdTest1@DeleteLater"},"BusinessType":{"S":"Retail"}},{"OrgName":{"S":"ProdTest36"},"MerchantId":{"S":"1589855354787"},"PatronId":{"S":"69116697064443"},"BusinessHandle":{"S":"ProdTest1@DeleteLater"},"BusinessType":{"S":"Retail"}}],"Count":4,"ScannedCount":7},"message":"Success"}}
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.message === "Success"
    ) {
      dispatch({
        type: "All_BUSINESS",
        value: { payload: response.result.data.Items }
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const searchContactWithEmail = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(getApiEndPoints("ContactWithEmail"), {
      method: "POST",
      body: body
    });
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.message === "Success"
    ) {
      dispatch({
        type: "SEARCHED_CONTACT",
        value: { payload: response.result.data.Items[0] }
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addNewContact = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(getApiEndPoints("addNewContact"), {
      method: "POST",
      body: body
    });
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.message === "Success"
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteContact = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(getApiEndPoints("deleteContact"), {
      method: "POST",
      body: body
    });
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.message === "Success"
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const resetSearchedContact = () => async dispatch => {
  try {
    dispatch({
      type: "SEARCHED_CONTACT",
      value: { payload: null }
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getSavedContacts = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(getApiEndPoints("SavedContacts"), {
      method: "POST",
      body: body
    });
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.message === "Success"
    ) {
      dispatch({
        type: "ALL_CONTACTS",
        value: { payload: response.result.data.Items }
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addProductToCart = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(getApiEndPoints("addProductToCart"), {
      method: "POST",
      body: body
    });
    if (
      response &&
      response.result &&
      response.result.data &&
      (response.result.message === "Success" ||
        response.result.message === "Product already added to cart")
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getCartItems = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(getApiEndPoints("CartItems"), {
      method: "POST",
      body: body
    });
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.message === "Success"
    ) {
      const cartProducts = makeCartProduct(
        response.result.data.cartDetails.Items,
        response.result.data.productDetails.Items
      );
      dispatch({
        type: "CART_DETAILS",
        value: { payload: cartProducts }
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const makeCartProduct = (cartItems, productDetails) => {
  let out = [];
  cartItems &&
    cartItems.forEach(cartItem => {
      productDetails &&
        productDetails.forEach(product => {
          if (cartItem.ProductId.S === product.ProductId.S) {
            out.push({
              UserId: cartItem.UserId,
              Quantity: cartItem.Quantity,
              ...product
            });
          }
        });
    });
  return out;
};

export const increaseProductQuantity = productId => (dispatch, getState) => {
  const cartItems = getState().app.cartDetailsPage.cartItems;
  const updatedCartItem = cartItems.map(item => {
    if (item.ProductId.S === productId) {
      return { ...item, Quantity: { S: (+item.Quantity.S + 1).toString() } };
    } else {
      return item;
    }
  });
  dispatch({
    type: "CART_DETAILS",
    value: { payload: updatedCartItem }
  });
};

export const decreaseProductQuantity = productId => (dispatch, getState) => {
  const cartItems = getState().app.cartDetailsPage.cartItems;
  const updatedCartItem = [];
  cartItems.forEach(item => {
    if (item.ProductId.S === productId) {
      if (+item.Quantity.S > 1) {
        updatedCartItem.push({
          ...item,
          Quantity: { S: (+item.Quantity.S - 1).toString() }
        });
      }
    } else {
      updatedCartItem.push(item);
    }
  });
  dispatch({
    type: "CART_DETAILS",
    value: { payload: updatedCartItem }
  });
};

export const deleteProductFromCart = productId => (dispatch, getState) => {
  const cartItems = getState().app.cartDetailsPage.cartItems;
  const updatedCartItem = [];
  cartItems.forEach(item => {
    if (item.ProductId.S !== productId) {
      updatedCartItem.push(item);
    }
  });
  dispatch({
    type: "CART_DETAILS",
    value: { payload: updatedCartItem }
  });
};

export const deleteAllProductFromCart = () => dispatch => {
  dispatch({
    type: "CART_DETAILS",
    value: { payload: [] }
  });
};

export const getOrderItems = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(getApiEndPoints("OrderItems"), {
      method: "POST",
      body: body
    });
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.message === "Success"
    ) {
      dispatch({
        type: "ORDER_DETAILS",
        value: { payload: response.result.data }
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const setGlobalCurrency = activeCurrency => dispatch => {
  dispatch({
    type: "SET_ACTIVE_CURRENCY",
    value: { payload: activeCurrency }
  });
};

export const getSearchCategories = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(getApiEndPoints("SearchCategories"), {
      method: "POST",
      body: body
    });
    if (response) {
      dispatch({
        type: "SEARCH_CATEGORIES",
        value: { payload: response.Items }
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const clearViewAllProducts = () => dispatch => {
  dispatch({
    type: "VIEWALL_PRODUCTS",
    value: { payload: {} }
  });
};
