import React, { useEffect } from "react";
import { Result, Icon } from "antd";
import styled from "styled-components";
import queryString from "query-string";

import { slackConfig } from "config";
import { get } from "helpers";

export const MigrationSlackAuth = ({ history, location }) => {
  useEffect(() => {
    // Parse query string to get all params.
    const params = queryString.parse(location.search);

    // If we got a code from Slack.
    if (params && params.code) {
      // Call the API to get Slack access' token.
      const getSlackAccessToken = async () => {
        const response = await get(`/oauth/slack/token?code=${params.code}`);

        // If we got an access token from Slack, set it in the local storage.
        if (response.access_token) {
          localStorage.setItem("slack_access_token", response.access_token);
          localStorage.setItem(
            "slack_bot_access_token",
            response.bot_access_token
          );
          history.push("/migration/o365-authentication");
        }
      };

      getSlackAccessToken();
    }
  }, [history, location.search]);

  return (
    <React.Fragment>
      {" "}
      <StyledResult
        icon={<Icon type="slack" />}
        title="Slack Login"
        subTitle="Sign In to your Slack account to allow channel reading."
        extra={[
          <a
            href={`https://slack.com/oauth/authorize?scope=channels:read+groups:read+bot+files:read&client_id=${
              slackConfig.clientId
            }`}
            key={0}
          >
            <img
              src="https://api.slack.com/img/sign_in_with_slack.png"
              alt="slack-img"
            />
          </a>
        ]}
      />
    </React.Fragment>
  );
};

const StyledResult = styled(Result)`
  padding: 0;
  max-width: 60%;
`;
