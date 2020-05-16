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

export const setGlobalCurrency = (activeCurrency) => (dispatch) => {
  dispatch({
    type: "SET_ACTIVE_CURRENCY",
    value: { payload: activeCurrency }
  });
 }
