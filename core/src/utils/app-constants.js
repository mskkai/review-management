const APP_MESSAGES = {
  LOGIN_FAILURE: "Invalid credentials. Please try again",
  LOGOUT_FAILURE:
    "Error occured during logout. Please try again after sometime.",
  UNAUTHORIZED: "Unauthorized request. Perform valid action",
  ADD_EMPLOYEE_SUCCESS: "Employee added successfully",
  UPDATE_EMPLOYEE_SUCCESS: "Employee updated successfully",
  DELETE_EMPLOYEE_SUCCESS: "Employee deleted successfully",
  INVALID_PROPS: "Invalid property updates",
  INVALID_EMPLOYEEID: "Employee id is invalid",
  INVALID_EMAILID: "EmailId is invalid",
  INVALID_PASSWORD: "Password cannot contain 'password'",
  INVALID_AGE: "Age must be a positive number",
  INVALID_ZIPCODE: "Zipcode must be a positive number",
  EMPLOYEE_NOT_FOUND: "Unable to find employee",
  INCORRECT_PASSWORD: "Password incorrect",
  INVALID_RATING: "Rating can't be greater than 5",
};

const AUTHORIZATION = {
  AUTH_TOKEN: "Authorization",
  BEARER_TEXT: "Bearer ",
};

module.exports = {
  APP_MESSAGES,
  AUTHORIZATION,
};
