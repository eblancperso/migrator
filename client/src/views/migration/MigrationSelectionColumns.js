import React from "react";
import styled from "styled-components";

export const nameColumn = {
  dataIndex: "name",
  title: "Name",
  render: (text, record, index) => (
    <StyledMigrationElement title={record.name} maxWidth="100px">
      {record.name}
    </StyledMigrationElement>
  )
};

export const descriptionColumn = {
  dataIndex: "description",
  title: "Description",
  render: (text, record, index) => (
    <StyledMigrationElement title={record.description} maxWidth="200px">
      {record.description}
    </StyledMigrationElement>
  )
};

const StyledMigrationElement = styled.div`
  max-width: ${props => props.maxWidth || "100px"};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
