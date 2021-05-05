import React, { ReactElement } from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }: any): ReactElement {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('accessToken') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    ></Route>
  );
}

export default PrivateRoute;
