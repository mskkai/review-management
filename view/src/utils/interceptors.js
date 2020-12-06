import axios from "axios";
import { API_CONSTANTS, AUTH_CONSTANTS } from "./app-constants";
import { setAuthToken, clearAuthToken, getAuthToken } from "./storageManager";
const proxyHost = process.env.REACT_APP_PROXY_HOST;

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const authorizationToken = getAuthToken();
    if (authorizationToken != null) {
      config.headers.common[
        AUTH_CONSTANTS.AUTH_TOKEN
      ] = AUTH_CONSTANTS.BEARER_TEXT.concat(authorizationToken);
    }

    if (config.url.includes(API_CONSTANTS.USER_LOGOUT)) {
      //clear the auth token if exists at rare scenarios
      clearAuthToken();
    }

    config.url = proxyHost.concat(config.url);
    return config;
  },
  function (error) {
    // Do something with request error
    console.error("request failed with error", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.config.url.includes(API_CONSTANTS.USER_LOGIN)) {
      //saving the authorization token in the session
      if (response.data.token) {
        let token = response.data.token;
        setAuthToken(token);
      }
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.error("response failed with error", error);
    return Promise.reject(error);
  }
);

window.onbeforeunload = () => {
  //clear the auth token if exists at refresh
  clearAuthToken();
};
