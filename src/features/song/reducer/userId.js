import { createReducer } from '@reduxjs/toolkit';

import shared from '../../shared';
import * as actions from '../actions';

const initialState = '';

export default createReducer(initialState, {
  [actions.songLoaded.type]: (state, action) => action.payload.userId,
  [shared.actions.routeDashboardLoaded.type]: () => initialState,
});
