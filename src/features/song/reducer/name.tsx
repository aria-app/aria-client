import { createReducer, PayloadAction } from 'redux-starter-kit';
import shared from '../../shared';
import { Song } from '../../shared/types';
import * as actions from '../actions';

const initialState = '';

export default createReducer<string, {}>(initialState, {
  [actions.songLoaded.type]: (state, action: PayloadAction<Song>) =>
    action.payload.name,
  [shared.actions.routeDashboardLoaded.type]: () => initialState,
});
