import React from "react";
import styled from "styled-components";

import { TopMenu } from "components/top-menu";

export const withLayout = WrappedComponent => props => {
  return (
    <StyledLayout>
      <TopMenu {...props} />
      <StyledContent>
        <WrappedComponent {...props} />
      </StyledContent>
    </StyledLayout>
  );
};

const StyledLayout = styled.div`
  overflow: hidden;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const StyledContent = styled.div`
  overflow: auto;
  padding: 10px 80px;
  display: flex;
  flex-grow: 1;
`;
