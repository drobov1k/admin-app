/* eslint-disable import/prefer-default-export */
import axios from '../../helpers/axios';
import { categoryConstants } from './constants';

export const getAllCategory = () => async (dispatch) => {
  dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST });
  const resp = await axios.get('category/all');
  if (resp.status === 200) {
    const { categories } = resp.data;

    dispatch({
      type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
      payload: { categories },
    });
  } else {
    dispatch({
      type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
      payload: { error: resp.data.error },
    });
  }
};

export const addCategory = (form) => async (dispatch) => {
  dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
  const resp = await axios.post(
    '/category/create', form,
  );
  if (resp.status === 201) {
    dispatch({
      type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
      payload: resp.data.category,
    });
  } else {
    dispatch({
      type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
      payload: resp.data.error,
    });
  }
};
