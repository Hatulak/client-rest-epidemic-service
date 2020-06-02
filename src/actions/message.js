import { CREATE_MESSAGES, GET_ERRORS } from "./message_types";

// CREATE MESSAGE

export const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGES,
    payload: msg,
  };
};

// CREATE ERROR MESSAGE
export const returnErrors = (msg) => {
  return {
    type: GET_ERRORS,
    payload: { msg },
  };
};
