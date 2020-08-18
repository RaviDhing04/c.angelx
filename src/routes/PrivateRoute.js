import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

function PrivateRoute(props) {
  const { component: Component, ...rest } = props;
  const isAuthenticated = useAuth();
  const prevPath = localStorage.getItem("prevPath");
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={prevPath + "?login=true"} />
        )
      }
    />
  );
}

export default PrivateRoute;
