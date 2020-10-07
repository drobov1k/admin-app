/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import axios from '../../helpers/axios';

export const addProduct = (form) => async (dispatch) => {
  const resp = await axios.post('product/create', form);
  console.log(resp);
};
