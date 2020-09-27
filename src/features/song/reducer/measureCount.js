import { createReducer } from 'redux-starter-kit';
import shared from '../../shared';
import * as actions from '../actions';

const initialState = 1;

export default createReducer(initialState, {
  [actions.measureCountSet.type]: (state, action) => action.payload,
  [actions.songLoaded.type]: (state, action) => action.payload.measureCount,
  [shared.actions.routeDashboardLoaded.type]: () => initialState,
});
