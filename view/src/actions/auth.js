import axios from "axios";
import { SUCCESS_LOGIN, SUCCESS_LOGOUT } from "../utils/actionTypes";
import Employee from "../models/employee";
import { API_CONSTANTS } from "../utils/app-constants";
import { formMessage } from "./message";

export const successLogin = (employee) => ({
  type: SUCCESS_LOGIN,
  employee,
});

export const startLogin = ({ emailId, password }) => {
  return (dispatch) => {
    axios
      .post(API_CONSTANTS.USER_LOGIN, {
        emailId,
        password,
      })
      .then((res) => {
        //retrieving the employee data
        let employee = { ...Employee };
        employee = { ...res.data.employee };
        dispatch(successLogin(employee));
      })
      .catch((error) => {
        dispatch(formMessage(error.response));
      });
  };
};

export const successLogout = (employee) => ({
  type: SUCCESS_LOGOUT,
  employee,
});

export const startLogout = () => {
  return (dispatch, getState) => {
    let employee = { ...Employee };
    let { user } = getState();
    employee = { ...user };
    axios
      .post(API_CONSTANTS.USER_LOGOUT, employee)
      .then(() => {
        dispatch(successLogout());
      })
      .catch((error) => {
        dispatch(formMessage(error.response));
      });
  };
};
