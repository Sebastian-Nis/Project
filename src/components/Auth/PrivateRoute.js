import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../Auth/Auth.context';

export function PrivateRoute({ children, component, ...rest }) {
  const { auth } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (auth) {
          return children || React.createElement(component);
        }

        return (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        );
      }}
    />
  );
}