import { createReducer, PayloadAction } from 'redux-starter-kit';
import { Song } from '../../../types';
import shared from '../../shared';
import * as actions from '../actions';

const initialState = 1;

export default createReducer(initialState, {
  [actions.measureCountSet.type]: (state, action: PayloadAction<number>) =>
    action.payload,
  [actions.songLoaded.type]: (state, action: PayloadAction<Song>) =>
    action.payload.measureCount,
  [shared.actions.routeDashboardLoaded.type]: () => initialState,
});
