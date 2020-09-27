import * as firebase from 'firebase/app';
import Button from '@material-ui/core/Button';
import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import { Redirect } from '@reach/router';
import React from 'react';
import { Translation } from 'react-i18next';
import shared from '../../shared';

const { authProvider } = shared.constants;

const styles = createStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
  },
});

// export interface SignInProps extends WithStyles<typeof styles> {
//   isAuthenticated?: boolean;
// }

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
