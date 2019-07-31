import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Icon, Input, Button } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { signUp } from "./";

const SignUpComponent = ({
  form: { getFieldDecorator, validateFields, getFieldValue }
}) => {
  const authError = useSelector(state => state.authentication.authError);
  const auth = useSelector(state => state.firebase.auth);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });
  const dispatch = useDispatch();
  const [isPasswordConfirmDirty, setIsPasswordConfirmDirty] = useState(false);

  const onFormChanged = e =>
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });

  const onFormSubmit = e => {
    e.preventDefault();
    validateFields(err => {
      if (!err) {
        dispatch(signUp(credentials));
      }
    });
  };

  const onPasswordConfirmBlur = e =>
    setIsPasswordConfirmDirty(isPasswordConfirmDirty || !!e.target.value);

  const compareToPreviousPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const compareToNextPassword = (rule, value, callback) => {
    if (value && isPasswordConfirmDirty) {
      validateFields(["password-confirm"], { force: true });
    }

    callback();
  };

  if (auth.uid) {
    return <Redirect to="/" />;
  }

  return (
    <StyledSignUp>
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
            rules: [
              { required: true, message: "Enter your password!" },
              { validator: compareToNextPassword }
            ]
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
          {getFieldDecorator("password-confirm", {
            rules: [
              { required: true, message: "Enter your password!" },
              { validator: compareToPreviousPassword }
            ]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              name="password-confirm"
              placeholder="Password confirm"
              onChange={onFormChanged}
              onBlur={onPasswordConfirmBlur}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("firstName", {
            rules: [{ required: true, message: "Enter your first name!" }]
          })(
            <Input
              type="text"
              name="firstName"
              placeholder="FirstName"
              onChange={onFormChanged}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("lastName", {
            rules: [{ required: true, message: "Enter your last name!" }]
          })(
            <Input
              type="text"
              name="lastName"
              placeholder="LastName"
              onChange={onFormChanged}
            />
          )}
        </Form.Item>
        <Form.Item>
          <StyledButton type="primary" htmlType="submit">
            Sign Up
          </StyledButton>
          Already have an account?{" "}
          <Link to="/authentication/sign-in">Sign In</Link>
        </Form.Item>
        {authError ? (
          <StyledError>{authError}</StyledError>
        ) : (
          <React.Fragment />
        )}
      </StyledForm>
    </StyledSignUp>
  );
};

export const SignUp = Form.create({ name: "sign_up" })(SignUpComponent);

const StyledSignUp = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
