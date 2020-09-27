import { createReducer } from '@reduxjs/toolkit';

import * as actions from '../actions';

export default createReducer(0, {
  [actions.positionRequestSucceeded.type]: (state, action) => action.payload,
});
