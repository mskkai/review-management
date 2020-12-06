import Message from "../models/message";
import { CLEAR_MESSAGE, SET_MESSAGE } from "../utils/actionTypes";

const message = { ...Message };

const messageReducer = (state = message, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...action.message };
    case CLEAR_MESSAGE:
      return { ...Message };
    default:
      return state;
  }
};

export default messageReducer;
