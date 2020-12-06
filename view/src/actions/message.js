import { CLEAR_MESSAGE, SET_MESSAGE } from "../utils/actionTypes";
import Message from "../models/message";
import { GET_ERROR_CODES_DESC } from "../utils/app-constants";

export const formMessage = (res) => {
  return (dispatch) => {
    let message = { ...Message };
    if (res) {
      let messageMetaData = GET_ERROR_CODES_DESC(res.status);
      message = { ...messageMetaData };
      message.detail = decodeMessage(res, message);
    }
    dispatch(setMessage(message));
  };
};

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

const decodeMessage = (res, message) => {
  if (res.data) {
    if (res.data.error) {
      return res.data.error.message;
    } else if (res.data.success) {
      return res.data.success.message;
    } else if (res.data.message) {
      return res.data.message;
    }
  }
  return message.summary;
};
