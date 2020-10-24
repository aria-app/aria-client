import withStyles from '@material-ui/styles/withStyles';
import { Redirect } from '@reach/router';
import * as firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React from 'react';
import { Translation } from 'react-i18next';

const styles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
    textTransform: 'uppercase',
  },
};

SignOut.propTypes = {
  isAuthenticated: PropTypes.bool,
};

function SignOut(props) {
  const { classes, isAuthenticated } = props;

  React.useEffect(() => {
    window.document.title = 'Sign Out - Aria';

    setTimeout(() => {
      // TODO: Convert to auth helper
      firebase.auth().signOut();
    }, 1000);
  }, []);

  if (!isAuthenticated) {
    return <Redirect noThrow to="/sign-in" />;
  }

  return (
    <Translation>
      {(t) => <div className={classes.root}>{t('Signing Out')}</div>}
    </Translation>
  );
}

export default React.memo(withStyles(styles)(SignOut));
