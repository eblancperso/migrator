import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { MigrationSlackAuth, MigrationO365Auth, MigrationSelection } from "./";

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
    <Route path="/migration/selection" component={MigrationSelection} />
    <Redirect to="/migration/slack-authentication" />
  </Switch>
);
