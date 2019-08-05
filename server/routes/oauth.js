import { Router } from "express";
import axios from "axios";
import queryString from "query-string";

import { slackConfig, o365Config } from "../config";

const router = Router();

router.get("/slack/token", async (req, res) => {
  try {
    const response = await axios.get(
      `https://slack.com/api/oauth.access?client_id=${
        slackConfig.clientId
      }&client_secret=${slackConfig.clientSecret}&code=${req.query.code}`
    );

    if (!response) {
      res.status(400).send("Slack API response is undefined.");
    }

    if (response.status !== 200) {
      return res
        .status(response.status)
        .send("Error while getting Slack token.");
    }

    if (
      !response.data ||
      (response.data && !response.data.access_token) ||
      (response.data &&
        !response.data.bot &&
        !response.data.bot.bot_access_token)
    ) {
      return res.status(400).send("No access token provided by Slack API.");
    }

    return res
      .status(200)
      .send({
        access_token: response.data.access_token,
        bot_access_token: response.data.bot.bot_access_token
      });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/o365/token", async (req, res) => {
  const requestBody = {
    client_id: o365Config.clientId,
    scope: "user.read mail.read",
    code: req.query.code,
    redirect_uri: o365Config.redirectUri,
    grant_type: "authorization_code",
    client_secret: o365Config.clientSecret
  };
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  try {
    const response = await axios.post(
      "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      queryString.stringify(requestBody),
      config
    );

    if (!response) {
      res.status(400).send("O365 API response is undefined.");
    }

    if (response.status !== 200) {
      return res
        .status(response.status)
        .send("Error while getting O365 token.");
    }

    if (!response.data || (response.data && !response.data.access_token)) {
      return res.status(400).send("No access token provided by O365 API.");
    }
    return res.status(200).send({ access_token: response.data.access_token });
  } catch (error) {
    return res.status(500).send(error);
  }
});

export const oauthRouter = router;
