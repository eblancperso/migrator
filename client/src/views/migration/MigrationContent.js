import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { MigrationSlackAuth, MigrationO365Auth } from "./";

export const MigrationContent = () => (
  <Switch>
    <Route
      path="/migration/slack-authentication"
      component={MigrationSlackAuth}
    />
    <Route
      path="/migration/o365-authentication"
      component={MigrationO365Auth}
    />
    <Redirect to="/migration/slack-authentication" />
  </Switch>
);
