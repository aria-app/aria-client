import { connect } from 'react-redux';
import auth from '../../../auth';
import { SignOut } from './SignOut';

export const SignOutContainer = connect(state => ({
  isAuthenticated: auth.selectors.getIsAuthenticated(state),
}))(SignOut);
