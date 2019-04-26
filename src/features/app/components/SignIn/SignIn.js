import * as firebase from "firebase/app";
import getOr from "lodash/fp/getOr";
import PropTypes from "prop-types";
import React from "react";
import { Translation } from "react-i18next";
import { Redirect } from "react-router-dom";
import styled from "styled-components/macro";
import shared from "../../../shared";

const { authProvider } = shared.constants;
const { Button } = shared.components;

const SignInButton = styled(Button)`
  background-color: white;
`;

const StyledSignIn = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
`;

export class SignIn extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  componentDidMount() {
    window.document.title = "Sign In - Zen Sequencer";
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={this.getRedirectFrom()} />;
    }

    return (
      <Translation>
        {t => (
          <StyledSignIn>
            <SignInButton
              onClick={() => firebase.auth().signInWithRedirect(authProvider)}
            >
              {t("Sign in with Google")}
            </SignInButton>
          </StyledSignIn>
        )}
      </Translation>
    );
  }

  getRedirectFrom = () =>
    getOr({ pathname: "/" }, "props.location.state.from", this);
}
