import { createReducer, PayloadAction } from 'redux-starter-kit';
import { Song } from '../../../types';
import shared from '../../shared';
import * as actions from '../actions';

const initialState = 120;

export default createReducer<number, {}>(initialState, {
  [actions.bpmSet.type]: (state, action: PayloadAction<number>) =>
    action.payload,
  [actions.songLoaded.type]: (state, action: PayloadAction<Song>) =>
    action.payload.bpm,
  [shared.actions.routeDashboardLoaded.type]: () => initialState,
});
