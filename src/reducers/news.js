import {
  GET_NEWS_BY_ID,
  GET_NEWS,
  CREATED_NEWS,
  CREATED_NEWS_REDIRECTED,
  CREATE_NEWS_ERROR,
  EDITED_NEWS,
  EDITED_NEWS_REDIRECTED,
  EDIT_NEWS_ERROR,
  DELETE_NEWS,
  DELETE_NEWS_ERROR,
  ADD_COMMENT,
  ADD_COMMENT_ERROR,
  GET_COMMENTS,
  GET_COMMENTS_ERROR,
  DELETE_COMMENT,
  DELETE_COMMENT_ERROR,
} from "../actions/news_types";

const initialState = {
  news: [],
  newsById: {},
  redirectAfterCreation: false,
  redirectAfterEdition: false,
  comments: [],
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
    case CREATED_NEWS:
      return {
        ...state,
        redirectAfterCreation: true,
      };
    case CREATED_NEWS_REDIRECTED:
      return {
        ...state,
        redirectAfterCreation: false,
      };
    case CREATE_NEWS_ERROR:
      return {
        ...state,
        redirectAfterCreation: false,
        // todo finish it
      };
    case EDITED_NEWS:
      return {
        ...state,
        newsById: {},
        redirectAfterEdition: true,
      };
    case EDITED_NEWS_REDIRECTED:
      return {
        ...state,
        redirectAfterEdition: false,
      };
    case EDIT_NEWS_ERROR:
      return {
        ...state,
        // todo finish it
      };
    case DELETE_NEWS:
      return {
        ...state,
        news: state.news.filter((_news) => _news._id !== action.payload),
        // todo finish it
      };
    case DELETE_NEWS_ERROR:
      return {
        ...state,
        // todo finish it
      };
    case ADD_COMMENT_ERROR:
      return {
        ...state,
        // todo finish it
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [],
        comment: {},
      };
    case GET_COMMENTS:
      return{
        ...state,
        comments: action.payload,
      };
      case GET_COMMENTS_ERROR:
        return{
          ...state,
          comments: [],
        };
      case DELETE_COMMENT:
        return{
          ...state,
          comments: [],
        };
      case DELETE_COMMENT_ERROR:
        return{
          ...state,
        }
    default:
      return state;
  }
}
