import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Icon, Input, Button } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { signIn } from "./";

const SignInComponent = ({ form: { getFieldDecorator, validateFields } }) => {
  const authError = useSelector(state => state.authentication.authError);
  const auth = useSelector(state => state.firebase.auth);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const dispatch = useDispatch();

  const onFormChanged = e =>
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });

  const onFormSubmit = e => {
    e.preventDefault();
    validateFields(err => {
      if (!err) {
        dispatch(signIn(credentials));
      }
    });
  };

  if (auth.uid) {
    return <Redirect to="/" />;
  }

  return (
    <StyledSignIn>
      <StyledForm onSubmit={onFormSubmit}>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Enter your email!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="email"
              name="email"
              placeholder="Email"
              onChange={onFormChanged}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Enter your password!" }]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              name="password"
              placeholder="Password"
              onChange={onFormChanged}
            />
          )}
        </Form.Item>
        <Form.Item>
          <StyledButton type="primary" htmlType="submit">
            Sign In
          </StyledButton>
          Don't have an account?{" "}
          <Link to="/authentication/sign-up">Sign Up</Link>
        </Form.Item>
        {authError ? (
          <StyledError>{authError}</StyledError>
        ) : (
          <React.Fragment />
        )}
      </StyledForm>
    </StyledSignIn>
  );
};

export const SignIn = Form.create({ name: "sign_in" })(SignInComponent);

const StyledSignIn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const StyledForm = styled(Form)`
  flex-grow: 1;
  max-width: 20%;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const StyledError = styled.span`
  color: #f5222d;
  text-style: italic;
`;
