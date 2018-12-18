import { connect } from 'react-redux';
import auth from '../../../auth';
import { SignIn } from './SignIn';

export const SignInContainer = connect(state => ({
  isAuthenticated: auth.selectors.getIsAuthenticated(state),
}))(SignIn);
