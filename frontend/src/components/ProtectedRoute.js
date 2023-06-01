import React from 'react';
import {Navigate} from "react-router-dom";

function ProtectedRoute({ element: Component, ...props }) {
  return (
    props.loggedIn ? <Navigate to="/sign-in" replace/> : <Component {...props} />
  );
}

export default ProtectedRoute;