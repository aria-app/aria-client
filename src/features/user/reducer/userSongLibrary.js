import omit from 'lodash/fp/omit';
import { createReducer } from 'redux-starter-kit';
import shared from '../../shared';
import * as actions from '../actions';

export default createReducer(
  {},
  {
    [actions.songAddRequestSucceeded.type]: (state, action) =>
      shared.helpers.setAtIds([action.payload], state),
    [actions.songDeleteRequestSucceeded.type]: (state, action) =>
      omit(action.payload.id, state),
    [actions.userSongLibraryFetchRequestSucceeded.type]: (state, action) =>
      shared.helpers.setAtIds(action.payload, state),
    [shared.actions.routeDashboardLoaded.type]: () => ({}),
  },
);
