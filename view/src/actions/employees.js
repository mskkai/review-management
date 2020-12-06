import axios from "axios";
import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  SET_EMPLOYEES,
  UPDATE_EMPLOYEE,
} from "../utils/actionTypes";
import { API_CONSTANTS } from "../utils/app-constants";
import { formMessage } from "./message";

export const loadEmployees = () => {
  return (dispatch) => {
    return axios
      .get(API_CONSTANTS.GET_EMPLOYEES)
      .then((res) => {
        //retrieving the employee data
        dispatch(setEmployees(res.data));
      })
      .catch((error) => {
        dispatch(formMessage(error.response));
      });
  };
};

export const startAddEmployee = (employee) => {
  return (dispatch) => {
    return axios
      .post(API_CONSTANTS.EMPLOYEE, employee)
      .then((res) => {
        Promise.resolve(dispatch(addEmployee(res.data.employee))).then(() =>
          dispatch(formMessage(res))
        );
      })
      .catch((error) => {
        dispatch(formMessage(error.response));
      });
  };
};

export const startUpdateEmployee = (employee) => {
  return (dispatch) => {
    return axios
      .patch(API_CONSTANTS.EMPLOYEE, employee)
      .then((res) => {
        Promise.resolve(dispatch(updateEmployee(res.data.employee))).then(() =>
          dispatch(formMessage(res))
        );
      })
      .catch((error) => {
        dispatch(formMessage(error.response));
      });
  };
};

export const startDeleteEmployee = (employee) => {
  return (dispatch) => {
    return axios
      .delete(API_CONSTANTS.EMPLOYEE, { data: employee })
      .then((res) => {
        Promise.resolve(dispatch(deleteEmployee(res.data.employee))).then(() =>
          dispatch(formMessage(res))
        );
      })
      .catch((error) => {
        dispatch(formMessage(error.response));
      });
  };
};

export const addEmployee = (employee) => ({
  type: ADD_EMPLOYEE,
  employee,
});

export const updateEmployee = (employee) => ({
  type: UPDATE_EMPLOYEE,
  employee,
});

export const deleteEmployee = (employee) => ({
  type: DELETE_EMPLOYEE,
  employee,
});

export const setEmployees = (employees) => ({
  type: SET_EMPLOYEES,
  employees,
});
