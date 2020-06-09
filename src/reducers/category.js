import {
  CATEGORY_CREATED,
  CATEGORY_CREATION_FAIL,
  GET_CATEGORIES,
  GET_CATEGORIES_FAIL,
  CATEGORY_CREATED_REDIRECTED,
} from "../actions/category_types";

const initialState = {
  categories: [],
  category: {},
  redirectAfterCreation: false,
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
    default:
      return state;
  }
}
