import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          <Component />
        ) : (
          <Navigate to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
