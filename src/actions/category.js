import axios from "axios";
import { tokenConfig, logout } from "./auth";
import store from "../store";
import {
  CATEGORY_CREATED,
  CATEGORY_CREATION_FAIL,
  GET_CATEGORIES,
  GET_CATEGORIES_FAIL,
  CATEGORY_CREATED_REDIRECTED,
  CATEGORY_EDITED,
  CATEGORY_EDITED_FAIL,
  CATEGORY_EDITED_REDIRECTED,
  GET_CATEGORY,
  GET_CATEGORY_FAIL,
} from "./category_types";

const baseURL = "http://localhost:3000";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.request.status === 401) {
      store.dispatch(logout()); // logout żeby w przypadku 401 wylogowało automatycznie
    }
    return Promise.reject(error);
  }
);

export const createCategory = (name) => (dispatch, getState) => {
  const body = JSON.stringify({ name });
  axios
    .post(`${baseURL}/categories`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CATEGORY_CREATED,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: CATEGORY_CREATION_FAIL,
      });
    });
};

export const editCategory = (state) => (dispatch, getState) => {
  const { name, _id } = state;
  const body = JSON.stringify({ name, id : _id });
  axios
    .put(`${baseURL}/categories`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CATEGORY_EDITED,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: CATEGORY_EDITED_FAIL,
      });
    });
};

export const getCategories = () => (dispatch, getState) => {
  axios
    .get(`${baseURL}/categories`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_CATEGORIES_FAIL,
      });
    });
};

export const getCategoryById = (categoryId) => (dispatch, getState) => {
  axios
    .get(`${baseURL}/categories/${categoryId}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_CATEGORY,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_CATEGORY_FAIL,
      });
    });
};



export const setRedirectToFalse = () =>  (dispatch) => {
  dispatch({
    type: CATEGORY_CREATED_REDIRECTED,
  });
};
export const setRedirectAterEditionToFalse = () =>  (dispatch) => {
  dispatch({
    type: CATEGORY_EDITED_REDIRECTED,
  });
};