import User from "../models/user";
import { SUCCESS_LOGIN, SUCCESS_LOGOUT } from "../utils/actionTypes";

const user = {
  ...User,
};

const authReducer = (state = user, action) => {
  switch (action.type) {
    case SUCCESS_LOGIN:
      return {
        ...action.employee,
        authenticated: true,
      };
    case SUCCESS_LOGOUT:
      return {
        ...User,
      };
    default:
      return state;
  }
};

export default authReducer;
