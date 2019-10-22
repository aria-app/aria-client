import { createReducer, PayloadAction } from 'redux-starter-kit';
import { User } from '../../../types';
import * as actions from '../actions';

export default createReducer<User, {}>(null, {
  [actions.userSignInSucceeded.type]: (state, action: PayloadAction<User>) =>
    action.payload,
  [actions.userSignOutSucceeded.type]: () => null,
});
