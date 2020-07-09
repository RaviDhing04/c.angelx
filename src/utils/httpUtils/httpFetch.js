import fetch from "node-fetch";
// import checkResponse from "./responseInterceptor";
import checkRequest from "./requestInterceptor";
import getApiEnpoints from "./apiEndPoints";

export const httpFetch = async (url, opts = {}) => {
  let response;
  let flag = 0;

  let requestObj = checkRequest(url, opts);
  return new Promise(async (resolve, reject) => {
    try {
      response = await fetch(requestObj.url, requestObj.params)
        .then(resp => {
          response = resp;
          debugger;
          if (resp.status >= 200 && resp.status < 305) {
            return resp;
          } else if (resp.status === 410 || resp.status === 401) {
            console.log('session expired');
            refreshToken(requestObj);
          } else {
            flag = 1;
            return resp;
          }
        })
        .then(r => {
          return r.json();
        });
      resolve(response);
      if (flag) {
        alert(response.message);
        flag = 0;
      }
    } catch (e) {
      reject(response);
    }
  });
};

const refreshToken = async (requestObj) => {
  const payload = { "refresh_token": localStorage.getItem('refresh_token') }
  if (!payload) {
    window.history.replaceState(null, '', window.location.pathname + "?login=true");
  } else {
    await fetch(getApiEnpoints.refreshToken, payload)
      .then(resp => {
        if (resp.status === 200) {
          localStorage.setItem('token', resp.token);
          httpFetch(requestObj.url, requestObj.params);
        } else {
          localStorage.clear();
          window.history.replaceState(null, '', "/landing");
        }
      });
  }
};

export default httpFetch;
