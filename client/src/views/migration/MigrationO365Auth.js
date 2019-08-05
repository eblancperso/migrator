import React, { useEffect } from "react";
import { Result, Icon } from "antd";
import styled from "styled-components";
import queryString from "query-string";

import { o365Config } from "config";
import { get } from "helpers";

export const MigrationO365Auth = ({ history, location }) => {
  useEffect(() => {
    // Parse query string to get all params.
    const params = queryString.parse(location.search);

    // If we got a code from O365.
    if (params && params.code) {
      // Call the API to get O365 access' token.
      const getO365AccessToken = async () => {
        const response = await get(`/oauth/o365/token?code=${params.code}`);

        // If we got an access token from Slack, set it in the local storage.
        if (response.access_token) {
          localStorage.setItem("o365_access_token", response.access_token);
          history.push("/migration/selection");
        }
      };

      getO365AccessToken();
    }
  }, [history, location.search]);

  return (
    <React.Fragment>
      {" "}
      <StyledResult
        icon={<Icon type="windows" />}
        title="O365 Login"
        subTitle="Sign In to your O365 account to allow teams writing."
        extra={[
          <a
            href={`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${
              o365Config.clientId
            }&response_type=code&redirect_uri=${
              o365Config.redirectUri
            }&response_mode=query&scope=offline_access%20user.read%20mail.read`}
            key={0}
          >
            <img
              src="https://docs.microsoft.com/en-us/azure/active-directory/develop/media/howto-add-branding-in-azure-ad-apps/ms-symbollockup_signin_light.png"
              alt="o365-img"
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
