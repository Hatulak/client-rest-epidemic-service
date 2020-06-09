import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  AFTER_REGISTRATION,
} from "./auth_types";
import jwt from "jwt-decode";
import store from "../store";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.request.status === 401) {
      store.dispatch(logout()); // logout żeby w przypadku 401 wylogowało automatycznie
    }
    return Promise.reject(error);
  }
);

const baseURL = "http://localhost:3000";

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });
  axios
    .get(`${baseURL}/auth/getUser`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// LOGIN USER
export const login = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // Request Body

  const body = JSON.stringify({ username, password });
  axios
    .post(`${baseURL}/auth/signin`, body, config)
    .then((res) => {
      const token = res.data.token;
      const user = jwt(token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
      localStorage.setItem("token", res.data.token);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// REGISTER USER
export const register = ({ username, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  axios
    .post(`${baseURL}/users/signup`, body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

export const checkAuthority = () => {
  // console.log(localStorage.getItem('token'));
  return localStorage.getItem("token") ? true : false;
};

export const setRedirectToFalse = () =>  (dispatch) => {
  console.log("asdads")
  dispatch({
    type: AFTER_REGISTRATION,
  });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  localStorage.removeItem("token");
};

//Setup config with token
export const tokenConfig = (getState) => {
  //Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};
