import {
  SET_USER_ROLE,
  SET_USER_ROLE_ERROR,
  GET_USERS,
  GET_USERS_ERROR,
  DELETE_USER,
  DELETE_USER_ERROR,
  SET_ROLE_REDIRECTED,
} from "../actions/users_types";

const initialState = {
  users: [],
  redirectAfterSetRole: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        redirectAfterSetRole: false,
      };
    case SET_USER_ROLE:
      return {
        ...state,
        redirectAfterSetRole: true,
      };
    case SET_ROLE_REDIRECTED:
      return {
        ...state,
        redirectAfterSetRole: false,
      };
    case SET_USER_ROLE_ERROR:
      return {
        ...state,
        // todo finish it
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        // todo finish it
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        // todo finish it
      };
    default:
      return state;
  }
}
