import { CREATE_MESSAGES, GET_ERRORS } from "../actions/message_types";

const initialState = {
  msg: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGES:
      return (state = action.payload);
    case GET_ERRORS:
        console.log(action.payload);
      return {
        msg: action.payload.msg
      };
    default:
      return state;
  }
}
