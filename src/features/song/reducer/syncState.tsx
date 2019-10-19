import { createSlice } from 'redux-starter-kit';
import shared from '../../shared';
import user from '../../user';

const { SYNC_STATES } = shared.constants;

export default createSlice({
  name: 'syncState',
  initialState: SYNC_STATES.SYNCED,
  extraReducers: {
    [shared.actions.SYNC_STARTED]: () => SYNC_STATES.SYNCING,
    [shared.actions.SYNC_SUCCEEDED]: () => SYNC_STATES.SYNCED,
    [user.actions.songAddRequestStarted.type]: () => SYNC_STATES.SYNCING,
    [user.actions.songAddRequestSucceeded.type]: () => SYNC_STATES.SYNCED,
  },
  reducers: {},
});
