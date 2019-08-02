import React from "react";
import { PageHeader, Icon } from "antd";
import styled from "styled-components";

export const MigrationO365AuthHeader = () => (
  <StyledPageHeader
    title="O365 Authentication"
    subTitle="Let's connect your Microsoft account!"
    onBack={() => null}
    backIcon={<Icon type="windows" />}
  />
);

const StyledPageHeader = styled(PageHeader)`
  padding-left: 0;
  margin-bottom: 100px;
`;
