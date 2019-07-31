import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const withAuthentication = WrappedComponent => props => {
  const auth = useSelector(state => state.firebase.auth);

  if (!auth.uid) {
    return <Redirect to="/authentication/sign-in" />;
  }

  return <WrappedComponent {...props} />;
};
