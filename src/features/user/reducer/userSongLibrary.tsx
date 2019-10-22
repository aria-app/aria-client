import omit from 'lodash/fp/omit';
import { createReducer, PayloadAction } from 'redux-starter-kit';
import Dawww from '../../../dawww';
import { Song } from '../../../types';
import shared from '../../shared';
import * as actions from '../actions';

export default createReducer<{ [key: string]: Song }, {}>(
  {},
  {
    [actions.songAddRequestSucceeded.type]: (
      state,
      action: PayloadAction<Song>,
    ) => Dawww.setAtIds([action.payload], state),
    [actions.songDeleteRequestSucceeded.type]: (
      state,
      action: PayloadAction<Song>,
    ) => omit(action.payload.id, state),
    [actions.userSongLibraryFetchRequestSucceeded.type]: (
      state,
      action: PayloadAction<Array<Song>>,
    ) => Dawww.setAtIds(action.payload, state),
    [shared.actions.routeDashboardLoaded.type]: () => ({}),
  },
);
