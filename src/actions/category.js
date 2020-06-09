import axios from "axios";
import { tokenConfig, logout } from "./auth";
import store from "../store";
import { CATEGORY_CREATED, CATEGORY_CREATION_FAIL } from "../actions/category_types";

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