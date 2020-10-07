import { categoryConstants } from '../actions/constants';

const initialState = {
  categories: [],
  loading: true,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.categories,
      };
    case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
