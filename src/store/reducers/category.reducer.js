/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
import { categoryConstants } from '../actions/constants';

const initialState = {
  categories: [],
  loading: true,
  error: null,
};

const buildNewCategories = (categories, category, id) => {
  const newCategories = [];

  for (const cat of categories) {
    if (cat._id === id) {
      newCategories.push({
        ...cat,
        children: cat.children && cat.children.length
          ? buildNewCategories([...cat.children, {
            _id: category._id,
            name: category.name,
            slug: category.slug,
            parentId: category.parentId,
            children: category.children,
          }], category, id) : null,
      });
    } else {
      newCategories.push({
        ...cat,
        children: cat.children && cat.children.length
          ? buildNewCategories(cat.children, category, id)
          : null,
      });
    }
  }

  return newCategories;
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
    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS: {
      const { category } = action.payload;
      const categories = buildNewCategories(state.categories, category, category.parentId);

      return {
        ...state,
        categories,
        loading: false,
      };
    }
    case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
