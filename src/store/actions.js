import httpFetch from "../utils/httpUtils/httpFetch";
import getApiEndPoints from "../utils/httpUtils/apiEndPoints";

export const login = async (body = {}) => {
  try {

    const response = await httpFetch(getApiEndPoints("login"), {
      method: "POST",
      body: body
    });
    if (response && response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("refresh_token", response.refresh_token);
      localStorage.setItem("userData", JSON.stringify(response));
      return 'success';
    } else if (response && response.user_status === 'FORCE_CHANGE_PASSWORD') {
      window.history.replaceState(null, '', window.location.pathname + `?signUp=true&email=${body.email}&reset=${body.password}`);
      window.location.reload();
      return 'reset';
    } else if (response && response.message) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const checkout = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("checkout"), {
      method: "POST",
      body: body
    });
    if (response) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const signUp = async (body = {}) => {
  try {

    const response = await httpFetch(getApiEndPoints("signUp"), {
      method: "POST",
      body: body
    });
    if (response && response.user_status) {
      return response
    } else if (response && response.message) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const firstLogin = async (body = {}) => {
  try {

    const response = await httpFetch(getApiEndPoints("firstLogin"), {
      method: "POST",
      body: body
    });
    if (response && response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("refresh_token", response.refresh_token);
      localStorage.setItem("userData", JSON.stringify(response));
      return true;
    } else if (response && response.message) {
      alert(response.message)
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const forgotPassword = async (body = {}) => {
  try {

    const response = await httpFetch(getApiEndPoints("forgotPassword"), {
      method: "POST",
      body: body
    });
    if (response && response.message) {
      if (response.user_status) {
        return response;
      } else {
        alert(response.message)
        return true;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const confirmForgotPassword = async (body = {}) => {
  try {

    const response = await httpFetch(getApiEndPoints("confirmForgotPassword"), {
      method: "POST",
      body: body
    });
    if (response && response.message) {
      alert(response.message);
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

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

export const getSponsoredProductsWithPagination = (
  body = {}
) => async dispatch => {
  try {

    const response = await httpFetch(
      getApiEndPoints("SponsoredProductsWithPagination"),
      {
        method: "POST",
        body: body
      }
    );
    if (response && response.result && response.result.data) {
      dispatch({
        type: "SPONSORED_PRODUCTS",
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

export const getTrendingProductsWithPagination = (
  body = {}
) => async dispatch => {
  try {

    const response = await httpFetch(
      getApiEndPoints("TrendingProductsWithPagination"),
      {
        method: "POST",
        body: body
      }
    );
    if (response && response.result && response.result.data) {
      dispatch({
        type: "TRENDING_PRODUCTS",
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

export const getWishlistProductsWithPagination = (
  body = {}
) => async dispatch => {
  try {

    const response = await httpFetch(
      getApiEndPoints("WishlistProductsWithPagination"),
      {
        method: "POST",
        body: body
      }
    );
    if (response && response.result && response.result.data) {
      let out = [];
      response.result.data.wishListDetails &&
        response.result.data.wishListDetails.forEach(orderItem => {
          response.result.data.productDetails &&
            response.result.data.productDetails.forEach(product => {
              if (orderItem.ProductId.S === product.ProductId.S) {
                out.push({
                  UserId: orderItem.UserId,
                  Quantity: orderItem.Quantity,
                  ...product
                });
              }
            });
        });
      dispatch({
        type: "WISHLIST_PRODUCTS",
        value: { payload: {'Items': out} }
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

export const getWishlistProducts = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(
      getApiEndPoints("WishlistProducts"),
      {
        method: "POST",
        body: body
      }
    );
    if (response && response.result && response.result.data) {
      let out = [];
      response.result.data.wishListDetails &&
        response.result.data.wishListDetails.forEach(orderItem => {
          response.result.data.productDetails &&
            response.result.data.productDetails.forEach(product => {
              if (orderItem.ProductId.S === product.ProductId.S) {
                out.push({
                  UserId: orderItem.UserId,
                  Quantity: orderItem.Quantity,
                  ...product
                });
              }
            });
        });
      dispatch({
        type: "VIEWALL_PRODUCTS",
        value: { payload: { 'Items': out } }
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

export const getMerchantAllProductsAndSegregate = (
  body = {}
) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("MerchantAllProducts"), {
      method: "POST",
      body: body
    });
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.data.Items.length
    ) {
      const [products, campaigns] = segregateProductsAndCampaigns(
        response.result.data.Items
      );
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
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.data.Items.length
    ) {
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

export const deleteProduct = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("deleteProduct"), {
      method: "POST",
      body: body
    });
    if (response && response.result && response.result.message === "Success") {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const followmerchant = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("followmerchant"), {
      method: "POST",
      body: body
    });
    if (response && response.result && response.result.message === "Success") {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const unfollowmerchant = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("unfollowmerchant"), {
      method: "POST",
      body: body
    });
    if (response && response.result && response.result.message === "Success") {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};


export const deleteCoupon = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("deleteCoupon"), {
      method: "POST",
      body: body
    });
    if (response && response.result && response.result.message === "Success") {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const setSelectedRow = row => async dispatch => {
  if (row) {
    dispatch({
      type: "SET_SELECTED_ROW",
      value: { payload: row }
    });
  }
};

const segregateProductsAndCampaigns = Items => {
  const out = [[], []];
  Items.forEach(item => {
    item.IsDonationCampaign.S === "false"
      ? out[0].push(item)
      : out[1].push(item);
  });
  return out;
};

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
      return response.result.data.Item;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addNewProduct = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("addNewProduct"), {
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

export const getDashboardBanners = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("dashboardBanner"), {
      method: "GET"
    });
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.message === "Success"
    ) {
      return response.result.data.Items;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getAllShippingAddress = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("getAllShippingAddress"), {
      method: "GET"
    });
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.message === "Success"
    ) {
      return response.result.data.Items;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addNewShippingAddress = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("addNewShippingAddress"), {
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

export const updateShippingAddress = (body = {}, addressId) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("updateShippingAddress") + addressId, {
      method: "PUT",
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

export const updateUserDetails = (body = {}, addressId) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("updateUserDetails"), {
      method: "PUT",
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

export const getAllBillingAddress = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("getAllBillingAddress"), {
      method: "GET"
    });
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.message === "Success"
    ) {
      return response.result.data.Items;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addNewBillingAddress = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("addNewBillingAddress"), {
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

export const updateBillingAddress = (body = {}, addressId) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("updateBillingAddress") + addressId, {
      method: "PUT",
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

export const getLandingBanners = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("mainBanner"), {
      method: "GET"
    });
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.message === "Success"
    ) {
      return response.result.data.Item;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateProduct = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("updateProduct"), {
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

export const updateCoupon = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("updateCoupon"), {
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

export const addNewCoupon = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("addNewCoupon"), {
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
          payload: response.result.data.Items[0]
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
          payload: response.result.data.Items[0]
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

export const getBusinessDetailsUser = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("BusinessDetailsUser"), {
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
      response.body &&
      response.statusCode === 200
    ) {
      dispatch({
        type: "SEARCHED_CONTACT",
        value: { payload: response.body.user_details[0] }
      });
      return response.body.user_details[0];
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

export const addToWishlist = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("addToWishlist"), {
      method: "POST",
      body: body
    });
    if (
      response &&
      response.result &&
      response.result.data
    ) {
      response.result.message === 'Success' ? alert('Product added to Wishlist') : alert(response.result.message);
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addNewEmployee = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("addNewEmployee"), {
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

export const deleteEmployee = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("deleteEmployee"), {
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
        value: { payload: response.result.data.body.user_details }
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

export const getSavedEmployees = (body = {}) => async dispatch => {
  try {

    const response = await httpFetch(getApiEndPoints("SavedEmployees"), {
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
        value: { payload: response.result.data.body.user_details }
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
      response.result.message !== "Error"
    ) {
      response.result.message === 'Success' ? alert('Product added in cart') : alert(response.result.message);
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
      body: ''
    });
    if (
      response &&
      response.result &&
      response.result.data
    ) {

      dispatch({
        type: "CART_DETAILS",
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


export const deleteProductFromCart = body => async (dispatch) => {
  try {
    const response = await httpFetch(getApiEndPoints("deleteProductFromCart"), {
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

export const uploadImage = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(getApiEndPoints("uploadImage"), {
      method: "POST",
      body: body
    });
    if (response) {
      return response;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteImage = (body = {}) => async dispatch => {
  try {
    const response = await httpFetch(getApiEndPoints("deleteImage"), {
      method: "POST",
      body: body
    });
    if (response) {
      return response;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateSelectedBusinessBanner = (imgUrl) => dispatch => {
  dispatch({
    type: "SELECTED_BUSINESS_BANNER",
    value: { payload: { S: imgUrl } }
  });
};

export const headerSearch = (text, category) => async dispatch => {
  try {
    let url = `${getApiEndPoints("headerSearch")}?text=${text}`;
    url = category ? url + `&category=${category}` : url;
    const response = await httpFetch(url, {
      method: "GET"
    });
    if (
      response &&
      response.result &&
      response.result.data &&
      response.result.message === "Success"
    ) {
      return response.result.data.Items;
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

export const clearSelectedRow = () => dispatch => {
  dispatch({
    type: "SET_SELECTED_ROW",
    value: { payload: null }
  });
};
