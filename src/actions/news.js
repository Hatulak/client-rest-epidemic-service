import axios from "axios";
import { tokenConfig, logout } from "./auth";
import { GET_NEWS, GET_NEWS_BY_ID } from "./news_types";
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

export const getNewsById = (newsId) => (dispatch, getState) => {
  axios
    .get(`${baseURL}/news/${newsId}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_NEWS_BY_ID,
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

export const createNews = (state) => (dispatch, getState) => {
  const { title, description, categoryId, file } = state;
  const body = JSON.stringify({ title, description, categoryId });
  axios
    .post(`${baseURL}/news`, body, tokenConfig(getState))
    .then((res) => {
      if (file.trim() != "") {
        console.log(res.data._id);
        var formData = new FormData();
        formData.append(`file`, file);
        formData.append(`newsId`, res.data._id);
        axios
          .post(`${baseURL}/news/fileUpload`, formData, tokenConfig(getState)) //TODO - poprawnie uploadowac pliki
          .then((res) => {
            dispatch({
              type: GET_NEWS_BY_ID,
            });
          })
          .catch((err) => {
            console.log(err);
            dispatch({
              type: AUTH_ERROR,
            });
          });
      }
      dispatch({
        type: GET_NEWS_BY_ID,
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
