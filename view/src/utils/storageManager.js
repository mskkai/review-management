import { AUTH_CONSTANTS } from "./app-constants";

export const setAuthToken = (token) => {
  // Save data to sessionStorage
  sessionStorage.setItem(AUTH_CONSTANTS.AUTH_TOKEN, token);
};

export const clearAuthToken = () => {
  // Remove saved data from sessionStorage
  sessionStorage.removeItem(AUTH_CONSTANTS.AUTH_TOKEN);
};

export const getAuthToken = () => {
  return sessionStorage.getItem(AUTH_CONSTANTS.AUTH_TOKEN);
};
