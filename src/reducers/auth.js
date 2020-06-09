
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AFTER_REGISTRATION,
} from "../actions/auth_types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  redirect: false,
};



export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
        return{
            ...state,
            redirect:true
        }
    case LOGIN_SUCCESS:
        console.log(action.payload)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        user: action.payload,
        token: localStorage.getItem("token"),
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };
    case AFTER_REGISTRATION:
      return{
        ...state,
        redirect: false,
      };
    default:
      return state;
    
  }
}