import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import { Redirect } from '@reach/router';
import * as firebase from 'firebase/app';
import React from 'react';
import { Translation } from 'react-i18next';

const styles = createStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
    textTransform: 'uppercase',
  },
});

// export interface SignOutProps extends WithStyles<typeof styles> {
//   isAuthenticated?: boolean;
// }

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
    return <Redirect noThrow to="sign-in" />;
  }

  return (
    <Translation>
      {(t) => <div className={classes.root}>{t('Signing Out')}</div>}
    </Translation>
  );
}

export default React.memo(withStyles(styles)(SignOut));
