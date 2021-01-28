import { createReducer } from '@reduxjs/toolkit';

import auth from '../../auth';
import shared from '../../shared';
import * as actions from '../actions';

const { SYNC_STATES } = shared.constants;

export default createReducer(SYNC_STATES.SYNCED, {
  [actions.syncStarted.type]: () => SYNC_STATES.SYNCING,
  [actions.syncSucceeded.type]: () => SYNC_STATES.SYNCED,
  [auth.actions.songAddRequestStarted.type]: () => SYNC_STATES.SYNCING,
  [auth.actions.songAddRequestSucceeded.type]: () => SYNC_STATES.SYNCED,
});
