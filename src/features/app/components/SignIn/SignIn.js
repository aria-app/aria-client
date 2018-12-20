import * as firebase from 'firebase/app';
import getOr from 'lodash/fp/getOr';
import PropTypes from 'prop-types';
import React from 'react';
import { NamespacesConsumer } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components/macro';
import auth from '../../../auth';
import shared from '../../../shared';

const { authProvider } = auth.constants;
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
    isAuthenticated: PropTypes.bool.isRequired,
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={this.getRedirectFrom()} />;
    }

    return (
      <NamespacesConsumer>
        {t => (
          <StyledSignIn>
            <SignInButton
              onClick={() => firebase.auth().signInWithRedirect(authProvider)}>
              {t('Sign in with Google')}
            </SignInButton>
          </StyledSignIn>
        )}
      </NamespacesConsumer>
    );
  }

  getRedirectFrom = () =>
    getOr({ pathname: "/" }, 'props.location.state.from', this);
}
