import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ condition, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (condition) return <Component {...props} />;
        if (!condition) return <Redirect to={{ pathname: "/" }} />;
      }}
    />
  );
};

export default ProtectedRoute;
