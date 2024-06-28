import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from 'scenes/layout'; // Import Layout component here

const PrivateRoute = ({ element, ...rest }) => {
  const user = useSelector((state) => state.global.user);
  return user ? <Route {...rest} element={<Layout>{element}</Layout>} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
