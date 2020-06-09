import {
  GET_NEWS_BY_ID,
  CREATE_NEWS_ERROR,
  GET_NEWS,
} from "../actions/news_types";

const initialState = {
  news: [],
  newsById: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NEWS:
      return {
        ...state,
        news: action.payload,
      };
    case GET_NEWS_BY_ID:
      return {
        ...state,
        newsById: action.payload,
      };
    case CREATE_NEWS_ERROR:
      return {
        ...state,
        // todo finish it 
      };
    default:
      return state;
  }
}
