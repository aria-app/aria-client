import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/styles/withStyles';
import { Redirect } from '@reach/router';
import * as firebase from 'firebase/app';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Translation } from 'react-i18next';

import shared from '../../shared';

const { authProvider } = shared.constants;

const styles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
  },
};

SignIn.propTypes = {
  isAuthenticated: PropTypes.bool,
};

function SignIn(props) {
  const { classes, isAuthenticated } = props;

  React.useEffect(() => {
    window.document.title = 'Sign In - Aria';
  }, []);

  if (isAuthenticated) {
    return <Redirect noThrow to="/" />;
  }

  return (
    <Translation>
      {(t) => (
        <div className={classes.root}>
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

export default React.memo(withStyles(styles)(SignIn));
