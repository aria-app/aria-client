import * as firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React from 'react';
import { Translation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';

const styles = () => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
    textTransform: 'uppercase',
  },
});

class SignOut extends React.PureComponent {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  componentDidMount() {
    window.document.title = 'Sign Out - Aria';

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
      <Translation>
        {t => <div className={this.props.classes.root}>{t('Signing Out')}</div>}
      </Translation>
    );
  }
}

export default withStyles(styles)(SignOut);
