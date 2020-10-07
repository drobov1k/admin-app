/* eslint-disable no-shadow */
import axios from '../../helpers/axios';
/* eslint-disable import/prefer-default-export */
import { authConstants } from './constants';

export const login = (user) => async (dispatch) => {
  dispatch({ type: authConstants.LOGIN_REQUEST });

  const res = await axios.post('/admin/signin', { ...user });

  if (res.status === 200) {
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: authConstants.LOGIN_SUCCESS,
      payload: { user, token },
    });
  } else if (res.status === 400) {
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      payload: { error: res.data.error },
    });
  }

  dispatch({
    type: authConstants.LOGIN_REQUEST,
    payload: {
      ...user,
    },
  });
};

// export const signup = (user) => async (dispatch) => {
//   dispatch({ type: authConstants.LOGIN_REQUEST });

//   const res = await axios.post('/admin/signup', { ...user });

//   if (res.status === 201) {
//     const { message } = res.data;
//     dispatch({
//       type: authConstants.LOGIN_SUCCESS,
//       payload: { user, token },
//     });
//   } else if (res.status === 400) {
//     dispatch({
//       type: authConstants.LOGIN_FAILURE,
//       payload: { error: res.data.error },
//     });
//   }

//   dispatch({
//     type: authConstants.LOGIN_REQUEST,
//     payload: {
//       ...user,
//     },
//   });
// };

export const isUserLoggedIn = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    const user = JSON.parse(localStorage.getItem('user'));
    dispatch({
      type: authConstants.LOGIN_SUCCESS,
      payload: { user, token },
    });
  } else {
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      payload: { error: 'Failed to login' },
    });
  }
};

export const signout = () => async (dispatch) => {
  dispatch({ type: authConstants.LOGOUT_REQUEST });
  const resp = await axios.post('/admin/signout');

  if (resp.status === 200) {
    localStorage.clear();
    dispatch({ type: authConstants.LOGOUT_SUCCESS });
  } else {
    dispatch({
      type: authConstants.LOGOUT_FAILURE,
      payload: { error: resp.data.error },
    });
  }
};
