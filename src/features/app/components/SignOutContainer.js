import { connect } from 'react-redux';

import user from '../../user';
import SignOut from './SignOut';

export default connect((state) => ({
  isAuthenticated: user.selectors.getIsAuthenticated(state),
}))(SignOut);
