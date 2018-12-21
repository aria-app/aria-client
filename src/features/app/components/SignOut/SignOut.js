import * as firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React from 'react';
import { NamespacesConsumer } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components/macro';

const StyledSignOut = styled.div`
  align-items: center;
  color: white;
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  text-transform: uppercase;
`;

export class SignOut extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    window.document.title = 'Sign Out - Zen Sequencer';

    setTimeout(() => {
      // TODO: Convert to auth helper
      firebase.auth().signOut();
    }, 1000);
  }

  render() {
    if (!this.props.isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: '/sign-in',
          }}
        />
      );
    }

    return (
      <NamespacesConsumer>
        {t => (
          <StyledSignOut>
            {t('Signing Out')}
          </StyledSignOut>
        )}
      </NamespacesConsumer>
    );
  }
}
