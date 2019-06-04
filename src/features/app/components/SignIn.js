import * as firebase from 'firebase/app';
import getOr from 'lodash/fp/getOr';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { Translation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import shared from '../../shared';

const { authProvider } = shared.constants;

const styles = () => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
  },
});

class SignIn extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  componentDidMount() {
    window.document.title = 'Sign In - Aria';
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={this.getRedirectFrom()} />;
    }

    return (
      <Translation>
        {t => (
          <div className={this.props.classes.root}>
            <Button
              onClick={() => firebase.auth().signInWithRedirect(authProvider)}
              variant="contained"
            >
              {t('Sign in with Google')}
            </Button>
          </div>
        )}
      </Translation>
    );
  }

  getRedirectFrom = () =>
    getOr({ pathname: '/' }, 'props.location.state.from', this);
}

export default withStyles(styles)(SignIn);
