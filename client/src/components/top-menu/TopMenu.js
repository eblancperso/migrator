import React from "react";
import { Menu, Icon } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signOut } from "views/authentication";

const { SubMenu } = Menu;

export const TopMenu = ({ match }) => {
  const dispatch = useDispatch();
  const { email } = useSelector(state => state.firebase.auth);
  const onSignOutClicked = () => dispatch(signOut());

  let selectedMenuItemKey = "";
  switch (match.path) {
    case "/report":
      selectedMenuItemKey = "report";
      break;
    default:
      selectedMenuItemKey = "migration";
      break;
  }

  return (
    <StyledMenu mode="horizontal" selectedKeys={[selectedMenuItemKey]}>
      <Menu.Item key="migration">
        <Link to="/migration">
          <Icon type="import" />
          Migration
        </Link>
      </Menu.Item>
      <Menu.Item key="report">
        <Link to="/report">
          <Icon type="exception" />
          Report
        </Link>
      </Menu.Item>
      <Menu.Item key="users">
        <Icon type="team" />
        Users
      </Menu.Item>
      <StyledRightSubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="user" />
            {email}
          </span>
        }
      >
        <Menu.Item key="profile" onClick={onSignOutClicked}>
          <StyledSignOutIcon type="poweroff" />
          Sign Out
        </Menu.Item>
      </StyledRightSubMenu>
    </StyledMenu>
  );
};

const StyledMenu = styled(Menu)`
  margin: 30px 80px;
  border: none;
`;

const StyledRightSubMenu = styled(SubMenu)`
  float: right;
`;

const StyledSignOutIcon = styled(Icon)`
  color: #eb2f96;
`;
