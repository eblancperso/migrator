import React from "react";

import {
  MigrationSlackAuthHeader,
  MigrationO365AuthHeader,
  useMigrationStep
} from "./";

export const MigrationHeader = ({ history }) => {
  switch (useMigrationStep(history.location)) {
    case 0:
      return <MigrationSlackAuthHeader />;
    case 1:
      return <MigrationO365AuthHeader />;
    default:
      return <React.Fragment />;
  }
};
