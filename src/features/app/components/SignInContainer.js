import { connect } from 'react-redux';
import user from '../../user';
import SignIn from './SignIn';

export default connect((state) => ({
  isAuthenticated: user.selectors.getIsAuthenticated(state),
}))(SignIn);
