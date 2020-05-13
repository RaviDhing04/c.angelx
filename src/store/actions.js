import httpFetch from "../utils/httpUtils/httpFetch";

const baseUrl = "https://h6cru8yrb8.execute-api.us-east-2.amazonaws.com/api/"; 

export const getLatestProductsWithPagination = (body = {}) => async (dispatch) =>{
    try {
        const response = await httpFetch(baseUrl + 'products/getlatestproducts', {
            method: "POST",
            body: body
        });
        if(response && response.result && response.result.data) {
          dispatch({
            type: 'LATEST_PRODUCTS',
            value: { payload : response.result.data }
          });
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
}

export const getselectedProductDetails = (body = {}) => async (dispatch) =>{
    try {
        const response = await httpFetch(baseUrl + 'products/getproductdetails', {
            method: "POST",
            body: body
        });
        if(response && response.result && response.result.data && response.result.data.Item ) {
          dispatch({
            type: 'PRODUCT_DETAILS',
            value: { payload : response.result.data.Item, id: response.result.data.Item.ProductId.S }
          });
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
}

export const getCartItems = (body = {}) => async (dispatch) =>{
    try {
        const response = await httpFetch(baseUrl + 'cart/getcartdetails', {
            method: "POST",
            body: body
        });
        if(response && response.result && response.result.data && response.result.message === "Success" ) {
          dispatch({
            type: 'CART_DETAILS',
            value: { payload : response.result.data }
          });
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
}