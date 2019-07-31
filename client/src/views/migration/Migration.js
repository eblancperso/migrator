import React from "react";
import { Row, Col, Steps } from "antd";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";

import {
  MigrationSlackAuthHeader,
  MigrationSlackAuth,
  MigrationO365Auth
} from "./";

const { Step } = Steps;

export const Migration = () => (
  <StyledMigration>
    <MigrationSlackAuthHeader />

    <StyledContent>
      <Row>
        <Col span={8}>
          <Steps direction="vertical" size="small" current={0}>
            <Step
              title="Slack Connection"
              description="Connect your Slack account."
            />
            <Step
              title="Microsoft Connection"
              description="Connect your Microsoft account."
            />
            <Step
              title="Migration Selection"
              description="Choose what to migrate."
            />
            <Step
              title="Options"
              description="Select how we should handle data."
            />
            <Step
              title="Confirmation"
              description="Confirm & migrate your things"
            />
          </Steps>
        </Col>
        <Col span={16}>
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
