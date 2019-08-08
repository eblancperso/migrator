import React from "react";
import { PageHeader, Icon } from "antd";
import styled from "styled-components";

import { useMigrationStep } from "./";

export const MigrationHeader = ({ history }) => {
  const props = {};
  switch (useMigrationStep(history.location)) {
    case 0:
      props.title = "Slack Authentication";
      props.subTitle = "Slack Authentication";
      props.backIcon = "slack";
      break;
    case 1:
      props.title = "O365 Authentication";
      props.subTitle = "Let's connect your Microsoft account!";
      props.backIcon = "windows";
      break;
    case 2:
      props.title = "Migration Selection";
      props.subTitle = "Let's choose what you want to migrate!";
      props.backIcon = "pic-right";
      break;
    default:
      return <React.Fragment />;
  }

  return (
    <StyledPageHeader
      title={props.title}
      subTitle={props.subTitle}
      onBack={() => null}
      backIcon={<Icon type={props.backIcon} />}
    />
  );
};

const StyledPageHeader = styled(PageHeader)`
  padding-left: 0;
  margin-bottom: 60px;
`;
