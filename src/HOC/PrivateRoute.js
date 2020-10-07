/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) => {
      const token = window.localStorage.getItem('token');
      if (token) {
        return <Component {...props} />;
      }
      return <Redirect to="/signin" />;
    }}
  />
);

export default PrivateRoute;
