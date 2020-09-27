import { createReducer } from 'redux-starter-kit';
import * as actions from '../actions';

export default createReducer(null, {
  [actions.userSignInSucceeded.type]: (state, action) => action.payload,
  [actions.userSignOutSucceeded.type]: () => null,
});
