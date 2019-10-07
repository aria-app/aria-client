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

function SignIn(props) {
  const { classes, isAuthenticated, location } = props;
  const redirectFrom = React.useMemo(
    () => getOr({ pathname: '/' }, 'state.from', location),
    [location],
  );

  React.useEffect(() => {
    window.document.title = 'Sign In - Aria';
  }, []);

  if (isAuthenticated) {
    return <Redirect to={redirectFrom} />;
  }

  return (
    <Translation>
      {t => (
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

SignIn.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default React.memo(withStyles(styles)(SignIn));
