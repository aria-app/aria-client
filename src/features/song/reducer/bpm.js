import { createReducer } from '@reduxjs/toolkit';

import shared from '../../shared';
import * as actions from '../actions';

const initialState = 120;

export default createReducer(initialState, {
  [actions.bpmSet.type]: (state, action) => action.payload,
  [actions.songLoaded.type]: (state, action) => action.payload.bpm,
  [shared.actions.routeDashboardLoaded.type]: () => initialState,
});
