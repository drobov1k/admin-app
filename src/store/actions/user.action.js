/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
import axios from '../../helpers/axios';
import { userConstants } from './constants';

export const signup = (user) => async (dispatch) => {
  dispatch({ type: userConstants.USER_REGISTER_REQUEST });

  const res = await axios.post('/admin/signup', { ...user });

  if (res.status === 201) {
    const { message } = res.data;
    dispatch({
      type: userConstants.USER_REGISTER_SUCCESS,
      payload: { message },
    });
  } else if (res.status === 400) {
    dispatch({
      type: userConstants.USER_REGISTER_FAILURE,
      payload: { error: res.data.error },
    });
  }
};
