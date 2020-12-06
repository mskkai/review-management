export const EMAIL_CONSTANTS = {
  EMAIL_REQUIRED: "Email Id is required",
  EMAIL_INVALID: "Email Id is invalid",
  EMAIL_VALIDATOR: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
};

export const PAGE_TITLES = {
  EMPLOYEE_REGISTRATION: "Employee Registration",
  EMPLOYEES_REPORTING: "Employees Report",
};

export const LOGIN_CONSTANTS = {
  ...EMAIL_CONSTANTS,
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_INVALID: "Password should be more than 3 characters",
  LOGIN_HEADER: "Review Management System",
  LOGIN_SUB_HEAER: "An Employee Feedback",
};

export const REGISTRATION_CONSTANTS = {
  ...EMAIL_CONSTANTS,
  EMPLOYEEID_REQUIRED: "Employee Id is required",
  NAME_REQUIRED: "Name is required",
  GENDER_REQUIRED: "Gender is required",
  AGE_REQUIRED: "Age is required",
  AGE_INVALID: "Enter valid age",
  ADDRESS_REQUIRED: "Address is required",
  CITY_REQUIRED: "City is required",
  STATE_REQUIRED: "State is required",
  COUNTRY_REQUIRED: "Country is required",
  ZIPCODE_REQUIRED: "Zipcode is required",
  DESIGNATION_REQUIRED: "Designation is required",
  DEPARTMENT_REQUIRED: "Department is required",
};

export const AUTH_CONSTANTS = {
  AUTH_TOKEN: "Authorization",
  BEARER_TEXT: "Bearer ",
};

export const API_CONSTANTS = {
  USER_LOGIN: "/employee/login",
  USER_LOGOUT: "/employee/logout",
  GET_EMPLOYEES: "/employees",
  EMPLOYEE: "/employee",
};

export const ROUTE_CONSTANTS = {
  LOGIN: "/",
  HOME: "/home",
  REGISTER_EMPLOYEE: "/register-employee",
  VIEW_EMPLOYEES: "/view-employees",
};

export const GET_ERROR_CODES_DESC = (code) => {
  let errorCodesDetails = {
    401: { severity: "error", summary: "Unauthorized" },
    201: { severity: "success", summary: "Process Success" },
    200: { severity: "success", summary: "Process Success" },
    400: { severity: "error", summary: "Errornous Data" },
    500: { severity: "error", summary: "Internal Server Error" },
    404: { severity: "error", summary: "Request Not Found" },
  };
  return errorCodesDetails[code];
};
