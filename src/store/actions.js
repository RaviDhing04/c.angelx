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