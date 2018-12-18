import { combineReducers } from 'redux';
import didAuthenticationRun from './didAuthenticationRun';
import user from './user';

export default combineReducers({
  didAuthenticationRun,
  user,
});
