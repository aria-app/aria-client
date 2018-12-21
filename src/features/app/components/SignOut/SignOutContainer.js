import { connect } from 'react-redux';
import user from '../../../user';
import { SignOut } from './SignOut';

export const SignOutContainer = connect(state => ({
  isAuthenticated: user.selectors.getIsAuthenticated(state),
}))(SignOut);
