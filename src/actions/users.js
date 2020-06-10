import axios from "axios";
import { tokenConfig, logout } from "./auth";
import {
  SET_USER_ROLE,
  SET_USER_ROLE_ERROR,
  GET_USERS,
  GET_USERS_ERROR,
  DELETE_USER,
  DELETE_USER_ERROR,
  SET_ROLE_REDIRECTED,
} from "./users_types";
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
export const getUsers = () => (dispatch, getState) => {
  axios
    .get(`${baseURL}/users`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_USERS_ERROR,
      });
    });
};

export const deleteUserById = (userId) => (dispatch, getState) => {
  axios
    .delete(`${baseURL}/users/deleteUser/${userId}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_USER,
        payload: userId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: DELETE_USER_ERROR,
      });
    });
};

// CHECK TOKEN & LOAD USER
export const setUserRole = (user) => (dispatch, getState) => {
  axios
    .post(`${baseURL}/users/setRole`, user, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: SET_USER_ROLE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_USER_ROLE_ERROR,
      });
    });
};

export const setRedirectAfterSetUserRole = () => (dispatch) => {
  dispatch({
    type: SET_ROLE_REDIRECTED,
  });
};