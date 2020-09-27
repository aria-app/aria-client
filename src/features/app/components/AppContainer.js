import { connect } from 'react-redux';
import user from '../../user';
import App from './App';

export default connect((state) => ({
  isAuthenticated: user.selectors.getIsAuthenticated(state),
  didAuthenticationRun: user.selectors.getDidAuthenticationRun(state),
}))(App);
