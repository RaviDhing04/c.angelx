// import React from "react";
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
  const refresh_token = localStorage.getItem('refresh_token');
  if (!refresh_token) {
    window.history.replaceState(null, '', window.location.pathname + "?login=true");
    window.location.reload();
  } else {
    const obj = checkRequest(getApiEnpoints('refreshToken'), {
      method: "POST",
      body: { "refresh_token": refresh_token }
    });
    let response = await fetch(obj.url, obj.params)
      .then(res => {
        if (res.status === 200) {
          return res;
        } else {
          localStorage.clear();
          window.history.replaceState(null, '', "/landing");
        }
      }).then(r => {
        return r.json();
      });
    localStorage.setItem('token', response.token);
    httpFetch(requestObj.url, requestObj.params);
  }
};

export default httpFetch;
