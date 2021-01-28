import { createReducer } from '@reduxjs/toolkit';

import shared from '../../shared';
import * as actions from '../actions';

const { SYNC_STATES } = shared.constants;

export default createReducer(SYNC_STATES.SYNCED, {
  [actions.syncStarted.type]: () => SYNC_STATES.SYNCING,
  [actions.syncSucceeded.type]: () => SYNC_STATES.SYNCED,
});
