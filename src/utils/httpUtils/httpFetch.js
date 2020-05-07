import fetch from "node-fetch";
import checkResponse from "./responseInterceptor";
import checkRequest from "./requestInterceptor";

export const httpFetch = async (url, opts = {}) => {
  let response;

  let requestObj = checkRequest(url, opts);
  return new Promise(async (resolve, reject) => {
    try {
      response = await fetch(requestObj.url, requestObj.params)
        .then(resp => {
          response = resp;
          return checkResponse(resp);
        })
        .then(r => {
          return r.json();
        });
      resolve(response);
    } catch (e) {
      reject(response);
    }
  });
};

export default httpFetch;
