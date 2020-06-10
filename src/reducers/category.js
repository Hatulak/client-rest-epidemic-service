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
  DELETE_CATEGORY,
  DELETE_CATEGORY_ERROR,
} from "../actions/category_types";

const initialState = {
  categories: [],
  category: {},
  redirectAfterCreation: false,
  redirectAfterEdition: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CATEGORY_CREATED:
      return {
        ...state,
        category: action.payload,
        redirectAfterCreation: true,
      };
    case CATEGORY_CREATED_REDIRECTED:
      return {
        ...state,
        redirectAfterCreation: false,
      };
    case CATEGORY_CREATION_FAIL:
      return {
        ...state,
        category: {},
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        categories: [],
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case GET_CATEGORY_FAIL:
      return {
        ...state,
        category: {},
      };
    case CATEGORY_EDITED:
      return {
        ...state,
        category: {},
        redirectAfterEdition: true,
      };
    case CATEGORY_EDITED_REDIRECTED:
      return {
        ...state,
        redirectAfterEdition: false,
      };
    case CATEGORY_EDITED_FAIL:
      return {
        ...state,
        category: {},
      };
      case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(_category => _category._id !== action.payload)
      };
      case DELETE_CATEGORY_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
}
