import React, { useEffect, useState } from "react";
import { PageHeader } from "antd";

import { get } from "helpers/apiHelper";
import { TableTransfer } from "components";
import { nameColumn, descriptionColumn } from "./";

export const MigrationSelection = () => {
  const [channels, setChannels] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);

  useEffect(() => {
    const getSlackChannels = async () => {
      const response = await get(
        `/conversations.list?token=${localStorage.getItem(
          "slack_bot_access_token"
        )}&types=public_channel%2Cprivate_channel`,
        "https://slack.com/api"
      );

      if (response && response.channels) {
        setChannels(
          response.channels.map(c => ({
            ...c,
            description: c.purpose ? c.purpose.value : ""
          }))
        );
      }
    };

    getSlackChannels();
  }, []);

  const onChange = nextTargetKeys => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <React.Fragment>
      <PageHeader title="Hey" />
      <TableTransfer
        dataSource={channels}
        targetKeys={targetKeys}
        onChange={onChange}
        leftColumns={[nameColumn, descriptionColumn]}
        rightColumns={[nameColumn]}
        rowKey={channel => channel.id}
      />
    </React.Fragment>
  );
};
