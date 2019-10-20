import { createReducer, PayloadAction } from 'redux-starter-kit';
import shared from '../../shared';
import { Song } from '../../shared/types';
import * as actions from '../actions';

const initialState = 1;

export default createReducer(initialState, {
  [actions.measureCountSet.type]: (state, action: PayloadAction<number>) =>
    action.payload,
  [actions.songLoaded.type]: (state, action: PayloadAction<Song>) =>
    action.payload.measureCount,
  [shared.actions.ROUTE_DASHBOARD_LOADED]: () => initialState,
});
