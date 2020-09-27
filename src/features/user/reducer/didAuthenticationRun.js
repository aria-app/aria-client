import { createReducer } from 'redux-starter-kit';
import * as actions from '../actions';

export default createReducer(false, {
  [actions.userSignInSucceeded.type]: () => true,
  [actions.userSignOutSucceeded.type]: () => true,
});
