import { createSlice } from 'redux-starter-kit';
import shared from '../../shared';
import user from '../../user';
import * as actions from '../actions';

const { SYNC_STATES } = shared.constants;

export default createSlice<string, {}>({
  name: 'syncState',
  initialState: SYNC_STATES.SYNCED,
  extraReducers: {
    [actions.syncStarted.type]: () => SYNC_STATES.SYNCING,
    [actions.syncSucceeded.type]: () => SYNC_STATES.SYNCED,
    [user.actions.songAddRequestStarted.type]: () => SYNC_STATES.SYNCING,
    [user.actions.songAddRequestSucceeded.type]: () => SYNC_STATES.SYNCED,
  },
  reducers: {},
});
