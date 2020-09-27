import { createReducer } from '@reduxjs/toolkit';

import * as actions from '../actions';

export default createReducer(null, {
  [actions.userSignInSucceeded.type]: (state, action) => action.payload,
  [actions.userSignOutSucceeded.type]: () => null,
});
