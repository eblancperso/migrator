import React from "react";
import { PageHeader, Icon } from "antd";
import styled from "styled-components";

export const MigrationSlackAuthHeader = () => (
  <StyledPageHeader
    title="Slack Authentication"
    subTitle="Let's connect your Slack account!"
    onBack={() => null}
    backIcon={<Icon type="slack" />}
  />
);

const StyledPageHeader = styled(PageHeader)`
  padding-left: 0;
  margin-bottom: 100px;
`;
