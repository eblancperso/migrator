import React, { useEffect, useState } from "react";
import { Transfer } from "antd";

import { get } from "helpers/apiHelper";

export const MigrationSelection = () => {
  const [channels, setChannels] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    const getSlackChannels = async () => {
      const response = await get(
        `/conversations.list?token=${localStorage.getItem(
          "slack_bot_access_token"
        )}&types=public_channel%2Cprivate_channel`,
        "https://slack.com/api"
      );

      if (response && response.channels) {
        setChannels(response.channels);
      }
    };

    getSlackChannels();
  }, []);

  const onChange = nextTargetKeys => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <React.Fragment>
      <Transfer
        dataSource={channels}
        titles={["Source", "Target"]}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        render={channel => channel.name}
        rowKey={channel => channel.id}
      />

      {/* {channels.map(channel => (
        <div key={channel.id}>{channel.name}</div>
      ))} */}
    </React.Fragment>
  );
};
