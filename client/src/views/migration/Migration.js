import React from "react";
import { Row, Col } from "antd";
import styled from "styled-components";

import { MigrationSteps, MigrationHeader, MigrationContent } from "./";

export const Migration = ({ history }) => {
  return (
    <StyledMigration>
      <MigrationHeader history={history} />
      <StyledContent>
        <Row>
          <Col span={8}>
            <MigrationSteps history={history} />
          </Col>
          <Col span={16}>
            <MigrationContent />
          </Col>
        </Row>
      </StyledContent>
    </StyledMigration>
  );
};

const StyledMigration = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const StyledContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 35px;
`;
