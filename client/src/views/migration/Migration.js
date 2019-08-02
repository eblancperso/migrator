import React from "react";
import { Row, Col, Steps } from "antd";
import styled from "styled-components";

import {
  MigrationSidebar,
  MigrationSlackAuthHeader,
  MigrationContent
} from "./";

export const Migration = () => (
  <StyledMigration>
    <MigrationSlackAuthHeader />

    <StyledContent>
      <Row>
        <Col span={8}>
          <Steps direction="vertical" size="small" current={0}>
            <MigrationSidebar />
          </Steps>
        </Col>
        <Col span={16}>
          <MigrationContent />
        </Col>
      </Row>
    </StyledContent>
  </StyledMigration>
);

const StyledMigration = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const StyledContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
