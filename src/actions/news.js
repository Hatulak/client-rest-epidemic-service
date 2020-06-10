import axios from "axios";
import { tokenConfig, logout } from "./auth";
import {
  GET_NEWS,
  GET_NEWS_BY_ID,
  CREATE_NEWS_ERROR,
  CREATED_NEWS,
  CREATED_NEWS_REDIRECTED,
  DELETE_NEWS,
  DELETE_NEWS_ERROR,
  EDITED_NEWS,
  EDIT_NEWS_ERROR,
} from "./news_types";
import { AUTH_ERROR } from "./auth_types";
import { GET_ERRORS } from "./message_types";
import store from "../store";
import { returnErrors } from "./message";

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
      if (file !== "") {
        const token = getState().auth.token;

        // Headers
        const config = {
          headers: {},
        };

        // If token, add to headers config
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        const formData = new FormData();
        formData.append(`file`, file);
        formData.append(`newsId`, res.data._id);
        axios
          .post(`${baseURL}/news/fileUpload`, formData, config) //TODO - poprawnie uploadowac pliki
          .then((res) => {
            dispatch({
              type: CREATED_NEWS,
            });
          })
          .catch((err) => {
            console.log(err);
            dispatch({
              type: CREATE_NEWS_ERROR,
            });
            dispatch({
              type: GET_ERRORS,
              payload: { msg: { requestFailed: err.response.data.message } },
            });
          });
      } else {
        dispatch({
          type: CREATED_NEWS,
        });
      }
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: CREATE_NEWS_ERROR,
      });
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: { requestFailed: err.response.data.message.join(", ") },
        },
      });
    });
};

export const editNews = (state) => (dispatch, getState) => {
  const { id, title, description, cconst, file } = state;
  const body = JSON.stringify({ id, title, description, cconst });
  axios
    .put(`${baseURL}/news`, body, tokenConfig(getState))
    .then((res) => {
      console.log(file);
      if (file !== "") {
        const token = getState().auth.token;

        // Headers
        const config = {
          headers: {},
        };

        // If token, add to headers config
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        const formData = new FormData();
        formData.append(`file`, file);
        formData.append(`newsId`, res.data._id);
        axios
          .post(`${baseURL}/news/fileUpload`, formData, config) //TODO - poprawnie uploadowac pliki
          .then((res) => {
            dispatch({
              type: EDITED_NEWS,
            });
          })
          .catch((err) => {
            console.log(err);
            dispatch({
              type: EDIT_NEWS_ERROR,
            });
            dispatch({
              type: GET_ERRORS,
              payload: { msg: { requestFailed: err.response.data.message } },
            });
          });
      } else {
        dispatch({
          type: EDITED_NEWS,
        });
      }
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: EDIT_NEWS_ERROR,
      });
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: { requestFailed: err.response.data.message.join(", ") },
        },
      });
    });
};

export const deleteNewsById = (newsId) => (dispatch, getState) => {
  axios
    .delete(`${baseURL}/news/${newsId}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_NEWS,
        payload: newsId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: DELETE_NEWS_ERROR,
      });
    });
};

export const setRedirectAfterCreationToFalse = () => (dispatch) => {
  dispatch({
    type: CREATED_NEWS_REDIRECTED,
  });
};
