import axios from "axios";
import { tokenConfig, logout } from "./auth";
import { GET_NEWS } from "./news_types";
import { AUTH_ERROR } from "./auth_types";
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
export const getNews = () => (dispatch, getState) => {
  axios
    .get(`${baseURL}/news`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_NEWS,
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

export const getNewsById = () => (dispatch, getState) => {
  axios
    .get(`${baseURL}/news`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_NEWS,
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