import * as firebase from 'firebase/app';
import getOr from 'lodash/fp/getOr';
import Button from '@material-ui/core/Button';
import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React from 'react';
import { Translation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
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

export interface SignInProps extends WithStyles<typeof styles> {
  isAuthenticated?: boolean;
  location?: { [key: string]: any };
}

function SignIn(props: SignInProps) {
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

export default React.memo(withStyles(styles)(SignIn));
