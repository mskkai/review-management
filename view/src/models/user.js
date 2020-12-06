import Employee from "./employee";

/**
 * Model to manage the authenticated user
 */
const user = {
  authenticated: false,
  ...Employee,
};

export default user;
