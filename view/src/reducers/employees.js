import Employee from "../models/employee";
import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  SET_EMPLOYEES,
  UPDATE_EMPLOYEE,
} from "../utils/actionTypes";

const employees = [Employee];

const employeesReducer = (state = employees, action) => {
  switch (action.type) {
    case SET_EMPLOYEES:
      return [...action.employees];
    case ADD_EMPLOYEE:
      return [...state, action.employee];
    case UPDATE_EMPLOYEE:
      const tempEmployees = [...state];
      const empIndex = tempEmployees.findIndex(
        (emp) => emp.employeeId === action.employee.employeeId
      );
      if (empIndex > -1) {
        tempEmployees.splice(empIndex, 1, action.employee);
      }
      return [...tempEmployees];
    case DELETE_EMPLOYEE:
      const tempEmps = state.filter(
        (emp) => emp.employeeId !== action.employee.employeeId
      );
      return [...tempEmps];
    default:
      return state;
  }
};

export default employeesReducer;
