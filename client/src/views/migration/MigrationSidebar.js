import React from "react";
import { Steps } from "antd";

const { Step } = Steps;

export const MigrationSidebar = () => (
  <Steps direction="vertical" size="small" current={0}>
    <Step title="Slack Connection" description="Connect your Slack account." />
    <Step
      title="Microsoft Connection"
      description="Connect your Microsoft account."
    />
    <Step title="Migration Selection" description="Choose what to migrate." />
    <Step title="Options" description="Select how we should handle data." />
    <Step title="Confirmation" description="Confirm & migrate your things" />
  </Steps>
);
