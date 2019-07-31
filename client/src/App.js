import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { compose } from "redux";

import { SignUp, SignIn } from "views/authentication";
import { Migration } from "views/migration";
import { Report } from "views/report";
import { withAuthentication, withLayout } from "hoc";

export const App = () => (
  <Switch>
    <Route
      path="/migration"
      component={compose(
        withAuthentication,
        withLayout
      )(Migration)}
    />
    <Route
      path="/report"
      exact
      component={compose(
        withAuthentication,
        withLayout
      )(Report)}
    />
    <Route path="/authentication/sign-in" component={SignIn} />
    <Route path="/authentication/sign-up" component={SignUp} />
    <Redirect to="/migration" />
  </Switch>
);
