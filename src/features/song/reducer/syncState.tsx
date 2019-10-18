import { createReducer } from 'redux-starter-kit';
import shared from '../../shared';

const { SYNC_STATES } = shared.constants;

export const syncState = createReducer(SYNC_STATES.SYNCED, {
  [shared.actions.SONG_ADD_REQUEST_STARTED]: (state, action) =>
    SYNC_STATES.SYNCING,

  [shared.actions.SONG_ADD_REQUEST_SUCCEEDED]: (state, action) =>
    SYNC_STATES.SYNCED,

  [shared.actions.SYNC_STARTED]: (state, action) => SYNC_STATES.SYNCING,

  [shared.actions.SYNC_SUCCEEDED]: (state, action) => SYNC_STATES.SYNCED,
});
